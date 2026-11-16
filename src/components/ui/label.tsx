import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const Label = ({ className, ...props }: ComponentProps<'label'>) => (
  <label
    className={cn('text-xs font-medium uppercase tracking-wide text-muted-foreground', className)}
    {...props}
  />
)
