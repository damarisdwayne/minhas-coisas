import type { ReactNode } from 'react'
import { Check, Trash } from 'lucide-react'
import { Button, DialogFooter } from '@/components/ui'

type FormularioItemProps = {
  nome: string
  podeSalvar: boolean
  onSalvar: () => void
  onRemover?: () => void
  children: ReactNode
}

export const FormularioItem = ({
  nome,
  podeSalvar,
  onSalvar,
  onRemover,
  children,
}: FormularioItemProps) => {
  const remover = () => {
    if (window.confirm(`Excluir ${nome || 'este item'}?`)) onRemover?.()
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (podeSalvar) onSalvar()
      }}
    >
      {children}
      <DialogFooter>
        {onRemover && (
          <Button variant="destructive" onClick={remover} aria-label="Excluir">
            <Trash size={16} />
          </Button>
        )}
        <Button type="submit" className="flex-1" disabled={!podeSalvar}>
          <Check size={16} />
          Salvar
        </Button>
      </DialogFooter>
    </form>
  )
}
