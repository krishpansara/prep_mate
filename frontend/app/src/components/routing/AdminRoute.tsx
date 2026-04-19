import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '@contexts/AuthContext'

interface AdminRouteProps {
  children: ReactNode
}

/**
 * Guards admin-only routes.
 * - No user → /login (with redirect param)
 * - Non-admin user → /dashboard
 */
export default function AdminRoute({ children }: AdminRouteProps) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    )
  }

  if (user.role !== 'ADMIN') {
    return <Navigate to="/app/dashboard" replace />
  }

  return <>{children}</>
}
