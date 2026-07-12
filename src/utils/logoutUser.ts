import Cookies from 'js-cookie'

import { queryCachePersister, queryClient } from '@/queries/queryClient'
import { PATHS } from '@/routes/paths'
import { clearAuthTokens } from './authTokens'

let isLoggingOut = false

export function isUserLoggingOut() {
  return isLoggingOut
}

export function logoutUser() {
  if (isLoggingOut || typeof window === 'undefined') return
  isLoggingOut = true

  localStorage.clear()
  sessionStorage.clear()
  clearAuthTokens()
  Cookies.set('logout', 'true')
  queryClient.clear()

  window.location.replace(`#${PATHS.LOGIN_NATIONAL_CODE}`)

  void queryCachePersister.removeClient()
}
