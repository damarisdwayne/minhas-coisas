import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { SECOES } from '@/routes/secoes'

export const MobileNav = () => (
  <nav
    className="fixed bottom-0 left-0 right-0 z-40 flex items-center border-t border-border bg-card md:hidden"
    style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
  >
    {SECOES.map(({ to, label, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          cn(
            'flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs transition-colors',
            isActive ? 'text-primary' : 'text-muted-foreground',
          )
        }
      >
        <Icon size={20} />
        <span className="leading-none">{label}</span>
      </NavLink>
    ))}
  </nav>
)
