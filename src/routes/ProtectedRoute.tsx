import { Navigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

import { PATHS } from './paths'

type ProtectedRouteProps = {
  children: React.ReactNode
  isBookFair?: boolean
}

export const ProtectedRoute = ({ children, isBookFair }: ProtectedRouteProps) => {
  const token = Cookies.get('token')
  const bookFairToken = Cookies.get('bookFairToken')

  const location = useLocation()

  if (!token && !isBookFair) {
    // Save the current path for redirect after login
    return <Navigate to={PATHS.LOGIN_NATIONAL_CODE} state={{ from: location }} replace />
  }

  if (!bookFairToken && isBookFair) {
    // Save the current path for redirect after login
    return <Navigate to={PATHS.SIGNUP_BOOK_FAIR} state={{ from: location }} replace />
  }

  return <>{children}</>
}
