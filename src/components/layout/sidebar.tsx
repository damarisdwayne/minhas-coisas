import { Bookmark } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { SECOES } from '@/routes/secoes'

export const Sidebar = () => (
  <aside className="hidden h-full w-56 shrink-0 flex-col border-r border-border bg-card md:flex">
    <div className="flex h-14 items-center gap-3 border-b border-border px-4">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
        <Bookmark size={15} className="text-primary-foreground" />
      </span>
      <span className="text-sm font-semibold tracking-wide text-foreground">Minhas Coisas</span>
    </div>

    <nav className="flex-1 space-y-1 p-2">
      {SECOES.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
              isActive
                ? 'bg-primary/10 font-medium text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            )
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
)
