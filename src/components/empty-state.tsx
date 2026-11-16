import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}

export const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-10 text-center">
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Icon size={20} />
    </span>
    <div className="space-y-1">
      <p className="font-medium text-foreground">{title}</p>
      <p className="mx-auto max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
    {action && <div className="flex flex-wrap justify-center gap-2">{action}</div>}
  </div>
)
