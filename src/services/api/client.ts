import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import Cookies from 'js-cookie'

import { API_ENDPOINTS, BASE_URL } from '@/constants/apiEndpoints'
import type { TokenDto } from '@/types/api/auth.types'
import { getTokenDtoPayload, setAuthTokens } from '@/utils/authTokens'
import { isUserLoggingOut, logoutUser } from '@/utils/logoutUser'

type ApiWrapper<T> = {
  data: T
  success: boolean
  status: number
  message: string | null
}

type TokenDtoResponse = TokenDto & {
  Token?: string
  RefreshToken?: string
}

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

const env = import.meta.env
const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent)

const defaultHeaders = {
  'Content-Type': 'application/json',
  version: env.VITE_APP_VERSION,
  versionName: env.VITE_APP_VERSION_NAME,
  platform: isAndroid ? '1' : '2',
  appid: env.VITE_APP_ID,
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: defaultHeaders,
  validateStatus: (status) => status === 402 || (status >= 200 && status < 300),
})

const refreshClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: defaultHeaders,
})

let isRefreshing = false
let refreshQueue: Array<(token: string | null) => void> = []

function parseTokenDto(payload: TokenDtoResponse | null | undefined): TokenDto | null {
  if (!payload) return null

  const token = payload.token ?? payload.Token
  const refreshToken = payload.refreshToken ?? payload.RefreshToken

  if (!token || !refreshToken) return null
  return { token, refreshToken }
}

function enqueueRefresh(): Promise<string | null> {
  return new Promise((resolve) => {
    refreshQueue.push(resolve)
  })
}

function resolveRefreshQueue(token: string | null) {
  refreshQueue.forEach((resolve) => resolve(token))
  refreshQueue = []
}

function abortPendingRefresh() {
  isRefreshing = false
  resolveRefreshQueue(null)
}

function forceLogout() {
  abortPendingRefresh()
  logoutUser()
}

async function refreshAccessToken(): Promise<string | null> {
  const payload = getTokenDtoPayload()
  if (!payload) {
    forceLogout()
    return null
  }

  try {
    const { data, status } = await refreshClient.post<
      ApiWrapper<TokenDtoResponse> | TokenDtoResponse
    >(API_ENDPOINTS.AUTH.USER_LOGIN_REFRESH, payload)

    if (status === 401) {
      forceLogout()
      return null
    }

    const body = data as ApiWrapper<TokenDtoResponse> | TokenDtoResponse
    const tokenDto = parseTokenDto('data' in body ? body.data : body)

    if (!tokenDto) {
      forceLogout()
      return null
    }

    setAuthTokens(tokenDto.token, tokenDto.refreshToken)
    return tokenDto.token
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      forceLogout()
    }
    return null
  }
}

function shouldAttemptTokenRefresh(config?: RetryableRequestConfig) {
  if (!config || config._retry) return false
  if (!Cookies.get('token') || !Cookies.get('refreshToken')) return false
  if (config.url?.includes(API_ENDPOINTS.AUTH.USER_LOGIN_REFRESH)) return false
  return true
}

function isTokenExpiredStatus(httpStatus?: number, body?: ApiWrapper<unknown>) {
  return httpStatus === 402 || body?.status === 402
}

function isUnauthorizedStatus(httpStatus?: number, body?: ApiWrapper<unknown>) {
  return httpStatus === 401 || body?.status === 401
}

function isPublicAuthEndpoint(url?: string) {
  if (!url) return false

  return (
    url.includes(API_ENDPOINTS.AUTH.LOGIN) ||
    url.includes(API_ENDPOINTS.AUTH.BOOK_FAIR_SIGNUP) ||
    url.includes(API_ENDPOINTS.AUTH.BOOK_FAIR_MEMBER_VERIFY)
  )
}

function handleUnauthorized(config?: RetryableRequestConfig, message?: string) {
  if (isPublicAuthEndpoint(config?.url)) {
    return Promise.reject(new Error(message ?? 'دسترسی غیرمجاز'))
  }
  forceLogout()
  return Promise.reject(
    new Error(message ?? 'نشست شما منقضی شده است. لطفاً دوباره وارد شوید'),
  )
}

async function handleExpiredToken(
  config: RetryableRequestConfig,
  message: string,
): Promise<AxiosResponse> {
  if (!shouldAttemptTokenRefresh(config)) {
    forceLogout()
    return Promise.reject(new Error(message))
  }

  return handleTokenRefresh(config, new Error(message))
}

async function handleTokenRefresh(
  config: RetryableRequestConfig,
  fallbackError: unknown,
): Promise<AxiosResponse> {
  if (isRefreshing) {
    const newToken = await enqueueRefresh()
    if (!newToken) {
      return Promise.reject(fallbackError)
    }

    config.headers.Authorization = `Bearer ${newToken}`
    return apiClient(config)
  }

  config._retry = true
  isRefreshing = true

  try {
    const newToken = await refreshAccessToken()
    resolveRefreshQueue(newToken)

    if (!newToken) {
      return Promise.reject(fallbackError)
    }

    config.headers.Authorization = `Bearer ${newToken}`
    return apiClient(config)
  } catch (refreshError) {
    resolveRefreshQueue(null)
    return Promise.reject(refreshError)
  } finally {
    isRefreshing = false
  }
}

function shouldAttemptRefresh(error: AxiosError, config?: RetryableRequestConfig) {
  if (!shouldAttemptTokenRefresh(config)) return false

  const body = error.response?.data as ApiWrapper<unknown> | undefined
  return isTokenExpiredStatus(error.response?.status, body)
}

apiClient.interceptors.request.use((config) => {
  if (isUserLoggingOut()) {
    return Promise.reject(new axios.Cancel('logout'))
  }

  const token = Cookies.get('token') || Cookies.get('bookFairToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => {
    const body = response.data as ApiWrapper<unknown> | undefined
    const config = response.config as RetryableRequestConfig

    if (isUnauthorizedStatus(response.status, body)) {
      const message =
        (typeof body?.message === 'string' && body.message) || 'نشست شما منقضی شده است'
      return handleUnauthorized(config, message)
    }

    if (isTokenExpiredStatus(response.status, body)) {
      const message =
        (typeof body?.message === 'string' && body.message) || 'توکن منقضی شده است'
      return handleExpiredToken(config, message)
    }

    if (body && typeof body.success === 'boolean' && !body.success) {
      const message = body.message ?? 'درخواست با خطا مواجه شد'
      return Promise.reject(new Error(message))
    }

    if (body != null && 'data' in body) {
      response.data = body.data
    }

    return response
  },
  async (error: AxiosError) => {
    const config = error.config as RetryableRequestConfig | undefined
    const body = error.response?.data as ApiWrapper<unknown> | undefined

    if (isUnauthorizedStatus(error.response?.status, body)) {
      const message =
        (typeof body?.message === 'string' && body.message) ||
        error.message ||
        'نشست شما منقضی شده است'
      return handleUnauthorized(config, message)
    }

    if (shouldAttemptRefresh(error, config)) {
      const body = error.response?.data as ApiWrapper<unknown> | undefined
      const message =
        (typeof body?.message === 'string' && body.message) ||
        error.message ||
        'توکن منقضی شده است'
      return handleExpiredToken(config!, message)
    }

    const message =
      (error.response?.data as { message?: string; title?: string } | undefined)
        ?.message ??
      (error.response?.data as { title?: string } | undefined)?.title ??
      error.message ??
      'خطا در ارتباط با سرور'

    error.message = message
    return Promise.reject(error)
  },
)
