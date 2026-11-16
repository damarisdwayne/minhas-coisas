import { useState } from 'react'
import { Bookmark } from 'lucide-react'
import { GoogleIcon } from '@/components/google-icon'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui'
import { useAuth } from '@/store/auth'

export const LoginPage = () => {
  const { loginWithGoogle } = useAuth()
  const [entrando, setEntrando] = useState(false)
  const [erro, setErro] = useState('')

  const entrar = async () => {
    setErro('')
    setEntrando(true)
    try {
      await loginWithGoogle()
    } catch (motivo: unknown) {
      setErro(motivo instanceof Error ? motivo.message : 'Erro ao fazer login')
    } finally {
      setEntrando(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <ThemeToggle className="fixed right-4 top-4" />
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Bookmark size={24} className="text-primary-foreground" />
          </span>
          <h1 className="text-2xl font-bold text-foreground">Minhas Coisas</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Indicações, lojas e listas num lugar só
          </p>
        </div>

        <Button variant="outline" className="w-full bg-card" onClick={entrar} disabled={entrando}>
          <GoogleIcon />
          {entrando ? 'Entrando...' : 'Continuar com Google'}
        </Button>

        {erro && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-center text-xs text-destructive">
            {erro}
          </p>
        )}
      </div>
    </div>
  )
}
