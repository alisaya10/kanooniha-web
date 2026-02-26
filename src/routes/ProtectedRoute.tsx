import { Navigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

import { PATHS } from './paths'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = Cookies.get('token')
  const location = useLocation()

  if (!token) {
    // Save the current path for redirect after login
    return <Navigate to={PATHS.LOGIN_NATIONAL_CODE} state={{ from: location }} replace />
  }

  return <>{children}</>
}
