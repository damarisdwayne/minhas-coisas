import { ArrowLeft, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, buttonVariants } from '@/components/ui'

type CabecalhoListaProps = {
  titulo: string
  contagem: string
  onExcluir?: () => void
}

export const CabecalhoLista = ({ titulo, contagem, onExcluir }: CabecalhoListaProps) => (
  <div className="flex items-center gap-2">
    <Link
      to={{ search: '' }}
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      aria-label="Voltar para as categorias"
    >
      <ArrowLeft size={18} />
    </Link>
    <h2 className="min-w-0 flex-1 truncate text-base font-semibold text-foreground">{titulo}</h2>
    <span className="text-sm text-muted-foreground">{contagem}</span>
    {onExcluir && (
      <Button
        variant="ghost"
        size="icon"
        onClick={onExcluir}
        aria-label={`Excluir a categoria ${titulo}`}
      >
        <Trash size={16} className="text-destructive" />
      </Button>
    )}
  </div>
)
