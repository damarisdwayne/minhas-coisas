import { ThemeToggle } from './theme-toggle'
import { UserMenu } from './user-menu'

export const Header = ({ title }: { title: string }) => (
  <header
    className="flex items-center justify-between border-b border-border bg-card px-4 md:px-6"
    style={{
      paddingTop: 'env(safe-area-inset-top)',
      minHeight: 'calc(3.5rem + env(safe-area-inset-top))',
    }}
  >
    <h1 className="text-lg font-semibold text-foreground">{title}</h1>
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <UserMenu />
    </div>
  </header>
)
