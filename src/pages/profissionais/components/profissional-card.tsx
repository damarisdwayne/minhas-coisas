import { Badge } from '@/components/ui'
import { CartaoItem, type CardCatalogoProps } from '@/pages/shared'
import type { Profissional } from '../types'
import { textoProfissional } from '../utils'
import { TelefoneLinha } from './telefone-linha'

export const ProfissionalCard = ({
  item,
  mostrarCategoria,
  onEditar,
  onDestacar,
}: CardCatalogoProps<Profissional>) => {
  const { nome, categoria, telefones, indicadoPor, observacao, destacado } = item

  return (
    <CartaoItem
      nome={nome}
      destacado={destacado}
      texto={textoProfissional(item)}
      selos={mostrarCategoria && <Badge variant="secondary">{categoria}</Badge>}
      onDestacar={() => onDestacar(item)}
      onEditar={() => onEditar(item)}
    >
      {telefones.length ? (
        telefones.map((telefone) => <TelefoneLinha key={telefone} telefone={telefone} />)
      ) : (
        <p className="text-sm text-muted-foreground">Sem telefone cadastrado</p>
      )}

      {indicadoPor && (
        <div className="mt-auto space-y-2 border-t border-border pt-3">
          <p className="text-xs text-muted-foreground">
            Indicado por <span className="font-medium text-foreground">{indicadoPor.nome}</span>
          </p>
          {indicadoPor.telefone && <TelefoneLinha telefone={indicadoPor.telefone} />}
        </div>
      )}

      {observacao && <p className="text-sm italic text-muted-foreground">{observacao}</p>}
    </CartaoItem>
  )
}
