import axios from 'axios'
import Cookies from 'js-cookie'

import { BASE_URL } from '@/constants/apiEndpoints'

type ApiWrapper<T> = {
  data: T
  success: boolean
  status: number
  message: string | null
}

const env = import.meta.env
const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent)

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    version: env.VITE_APP_VERSION,
    versionName: env.VITE_APP_VERSION_NAME,
    platform: isAndroid ? '1' : '2',
    appid: env.VITE_APP_ID,
  },
})

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => {
    const body = response.data as ApiWrapper<unknown> | undefined

    if (body && typeof body.success === 'boolean' && !body.success) {
      const message = body.message ?? 'درخواست با خطا مواجه شد'
      return Promise.reject(new Error(message))
    }

    if (body != null && 'data' in body) {
      response.data = body.data
    }

    return response
  },
  (error) => {
    const message =
      error.response?.data?.message ?? error.message ?? 'خطا در ارتباط با سرور'
    return Promise.reject(new Error(message))
  },
)
