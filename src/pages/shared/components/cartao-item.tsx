import type { ReactNode } from 'react'
import { Check, Pencil, Share2, Star } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import { useCompartilhar } from '@/hooks/use-compartilhar'
import { cn } from '@/lib/utils'

type CartaoItemProps = {
  nome: string
  destacado?: boolean
  texto: string
  selos?: ReactNode
  onDestacar: () => void
  onEditar: () => void
  children: ReactNode
}

export const CartaoItem = ({
  nome,
  destacado,
  texto,
  selos,
  onDestacar,
  onEditar,
  children,
}: CartaoItemProps) => {
  const { copiado, enviar } = useCompartilhar()

  return (
    <Card
      className={cn(
        'flex h-full flex-col gap-3 p-4',
        destacado && 'border-warning/70 bg-warning/5 ring-1 ring-warning/40',
      )}
    >
      <div className="flex items-start gap-1">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="font-medium leading-snug text-foreground">{nome}</p>
          {selos}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDestacar}
          aria-pressed={Boolean(destacado)}
          aria-label={destacado ? `Remover destaque de ${nome}` : `Destacar ${nome}`}
        >
          <Star size={16} className={cn(destacado && 'fill-warning text-warning')} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => enviar(nome, texto)}
          aria-label={copiado ? 'Copiado' : `Compartilhar ${nome}`}
        >
          {copiado ? <Check size={16} className="text-primary" /> : <Share2 size={16} />}
        </Button>
        <Button variant="ghost" size="icon" onClick={onEditar} aria-label={`Editar ${nome}`}>
          <Pencil size={16} />
        </Button>
      </div>
      {children}
    </Card>
  )
}
