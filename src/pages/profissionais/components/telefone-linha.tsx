import { MessageCircle, Phone } from 'lucide-react'
import { Badge, buttonVariants } from '@/components/ui'
import { analisarTelefone } from '../telefone'

const CLASSE_ACAO = buttonVariants({ variant: 'outline', size: 'sm' })

export const TelefoneLinha = ({ telefone }: { telefone: string }) => {
  const { texto, ligar, whatsapp, conferir } = analisarTelefone(telefone)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="min-w-0 flex-1 text-sm tabular-nums text-foreground">{texto}</span>
      {conferir && <Badge variant="warning">Conferir número</Badge>}
      {whatsapp && (
        <a href={whatsapp} target="_blank" rel="noreferrer" className={CLASSE_ACAO}>
          <MessageCircle size={14} />
          WhatsApp
        </a>
      )}
      {ligar && (
        <a href={ligar} className={CLASSE_ACAO} aria-label={`Ligar para ${texto}`}>
          <Phone size={14} />
          Ligar
        </a>
      )}
    </div>
  )
}
