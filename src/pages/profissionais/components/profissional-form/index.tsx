import { useState } from 'react'
import { FormularioItem, type FormCatalogoProps } from '@/pages/shared'
import type { Profissional } from '../../types'
import { Campos } from './campos'
import { dadosDe, podeSalvar, rascunhoDe, type Rascunho } from './rascunho'

export const ProfissionalForm = ({
  item,
  categoriaPadrao,
  categorias,
  onSalvar,
  onRemover,
}: FormCatalogoProps<Profissional>) => {
  const [rascunho, setRascunho] = useState(() => rascunhoDe(item, categoriaPadrao))

  const alterar = (alteracao: Partial<Rascunho>) =>
    setRascunho((atual) => ({ ...atual, ...alteracao }))

  return (
    <FormularioItem
      nome={rascunho.nome}
      podeSalvar={podeSalvar(rascunho)}
      onSalvar={() => onSalvar(dadosDe(rascunho))}
      onRemover={onRemover}
    >
      <Campos rascunho={rascunho} categorias={categorias} onChange={alterar} />
    </FormularioItem>
  )
}
