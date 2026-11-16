import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui'
import { useTheme } from '@/store/theme'

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { resolved, setTheme } = useTheme()
  const escuro = resolved === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => setTheme(escuro ? 'light' : 'dark')}
      aria-label={escuro ? 'Usar tema claro' : 'Usar tema escuro'}
    >
      {escuro ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}
