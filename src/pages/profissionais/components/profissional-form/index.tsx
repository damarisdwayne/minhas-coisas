import { useState } from 'react'
import { Check, Trash } from 'lucide-react'
import { Button, DialogFooter } from '@/components/ui'
import type { Profissional, ProfissionalDados } from '../../types'
import { Campos } from './campos'
import { dadosDe, podeSalvar, rascunhoDe, type Rascunho } from './rascunho'

type ProfissionalFormProps = {
  profissional?: Profissional
  categoriaPadrao?: string
  categorias: string[]
  onSalvar: (dados: ProfissionalDados) => void
  onRemover?: () => void
}

export const ProfissionalForm = ({
  profissional,
  categoriaPadrao,
  categorias,
  onSalvar,
  onRemover,
}: ProfissionalFormProps) => {
  const [rascunho, setRascunho] = useState(() => rascunhoDe(profissional, categoriaPadrao))

  const alterar = (alteracao: Partial<Rascunho>) =>
    setRascunho((atual) => ({ ...atual, ...alteracao }))

  const remover = () => {
    if (window.confirm(`Excluir ${rascunho.nome || 'este profissional'}?`)) onRemover?.()
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (podeSalvar(rascunho)) onSalvar(dadosDe(rascunho))
      }}
    >
      <Campos rascunho={rascunho} categorias={categorias} onChange={alterar} />
      <DialogFooter>
        {onRemover && (
          <Button variant="destructive" onClick={remover} aria-label="Excluir profissional">
            <Trash size={16} />
          </Button>
        )}
        <Button type="submit" className="flex-1" disabled={!podeSalvar(rascunho)}>
          <Check size={16} />
          Salvar
        </Button>
      </DialogFooter>
    </form>
  )
}
