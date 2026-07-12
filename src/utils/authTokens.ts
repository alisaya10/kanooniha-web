import Cookies from 'js-cookie'

import type { TokenDto } from '@/types/api/auth.types'

const TOKEN_COOKIE_OPTIONS = { expires: 360, secure: true } as const

export function setAuthTokens(tokenJwt: string, tokenRefresh?: string | null) {
  Cookies.set('token', tokenJwt, TOKEN_COOKIE_OPTIONS)
  if (tokenRefresh) {
    Cookies.set('refreshToken', tokenRefresh, TOKEN_COOKIE_OPTIONS)
  }
  Cookies.set('logout', 'false')
}

export function getTokenDtoPayload(): TokenDto | null {
  const token = Cookies.get('token')
  const refreshToken = Cookies.get('refreshToken')
  if (!token || !refreshToken) return null
  return { token, refreshToken }
}

export function clearAuthTokens() {
  Cookies.remove('token')
  Cookies.remove('refreshToken')
  Cookies.remove('bookFairToken')
}
