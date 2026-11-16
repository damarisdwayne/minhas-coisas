import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/pages/login'
import { useAuth } from '@/store/auth'
import { AppLayout } from './app-layout'
import { ProtectedRoute } from './protected-route'
import { SECAO_INICIAL } from './secoes'

const ProfissionaisPage = lazy(() =>
  import('@/pages/profissionais').then((m) => ({ default: m.ProfissionaisPage })),
)

export const Router = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/profissionais" element={<ProfissionaisPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={SECAO_INICIAL} replace />} />
    </Routes>
  )
}
