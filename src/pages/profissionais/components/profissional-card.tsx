import { Check, Pencil, Share2 } from 'lucide-react'
import { Badge, Button, Card } from '@/components/ui'
import { useCompartilhar } from '@/hooks/use-compartilhar'
import type { Profissional } from '../types'
import { textoProfissional } from '../utils'
import { TelefoneLinha } from './telefone-linha'

type ProfissionalCardProps = {
  profissional: Profissional
  mostrarCategoria: boolean
  onEditar: (profissional: Profissional) => void
}

export const ProfissionalCard = ({
  profissional,
  mostrarCategoria,
  onEditar,
}: ProfissionalCardProps) => {
  const { copiado, enviar } = useCompartilhar()
  const { nome, categoria, telefones, indicadoPor, observacao } = profissional

  return (
    <Card className="space-y-3 p-4">
      <div className="flex items-start gap-1">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="font-medium leading-snug text-foreground">{nome}</p>
          {mostrarCategoria && <Badge variant="secondary">{categoria}</Badge>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => enviar(nome, textoProfissional(profissional))}
          aria-label={copiado ? 'Contato copiado' : `Compartilhar ${nome}`}
        >
          {copiado ? <Check size={16} className="text-primary" /> : <Share2 size={16} />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEditar(profissional)}
          aria-label={`Editar ${nome}`}
        >
          <Pencil size={16} />
        </Button>
      </div>

      {telefones.length ? (
        telefones.map((telefone) => <TelefoneLinha key={telefone} telefone={telefone} />)
      ) : (
        <p className="text-sm text-muted-foreground">Sem telefone cadastrado</p>
      )}

      {indicadoPor && (
        <div className="space-y-2 border-t border-border pt-3">
          <p className="text-xs text-muted-foreground">
            Indicado por <span className="font-medium text-foreground">{indicadoPor.nome}</span>
          </p>
          {indicadoPor.telefone && <TelefoneLinha telefone={indicadoPor.telefone} />}
        </div>
      )}

      {observacao && <p className="text-sm italic text-muted-foreground">{observacao}</p>}
    </Card>
  )
}
