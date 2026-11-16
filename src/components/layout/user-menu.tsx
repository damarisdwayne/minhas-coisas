import { LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui'
import { useAuth } from '@/store/auth'

const CLASSE_AVATAR = 'h-8 w-8 rounded-full ring-2 ring-border'

export const UserMenu = () => {
  const { user, logout } = useAuth()
  const nome = user?.displayName ?? 'Usuário'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        aria-label="Abrir menu da conta"
      >
        {user?.photoURL ? (
          <img src={user.photoURL} alt={nome} className={`${CLASSE_AVATAR} object-cover`} />
        ) : (
          <span
            className={`${CLASSE_AVATAR} flex items-center justify-center bg-primary/20 text-sm font-semibold text-primary`}
          >
            {nome[0].toUpperCase()}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p className="truncate font-medium text-foreground">{nome}</p>
          <p className="mt-0.5 truncate">{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut size={15} />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
