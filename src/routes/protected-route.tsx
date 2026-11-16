import { Navigate, Outlet } from 'react-router-dom'
import { PageLoader } from '@/components/ui/page-loader'
import { useAuth } from '@/store/auth'

export const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <PageLoader />
      </div>
    )
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
