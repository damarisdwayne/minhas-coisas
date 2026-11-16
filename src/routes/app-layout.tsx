import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ErrorBoundary } from '@/components/error-boundary'
import { Header, MobileNav, Sidebar } from '@/components/layout'
import { PageLoader } from '@/components/ui'
import { tituloDaRota } from './secoes'

export const AppLayout = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header title={tituloDaRota(pathname)} />
        <main className="main-scroll-area flex-1 overflow-y-auto">
          <ErrorBoundary key={pathname}>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
