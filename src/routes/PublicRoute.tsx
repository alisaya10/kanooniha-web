import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { PATHS } from './paths'

type PublicRouteProps = {
  children: React.ReactNode
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = Cookies.get('token')
  // If logged in, should not redirect to login page
  if (token) {
    return <Navigate to={PATHS.Dashboard} replace />
  }

  return <>{children}</>
}
