import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui'

type CabecalhoListaProps = {
  titulo: string
  quantidade: number
}

export const CabecalhoLista = ({ titulo, quantidade }: CabecalhoListaProps) => (
  <div className="flex items-center gap-2">
    <Link
      to={{ search: '' }}
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      aria-label="Voltar para as categorias"
    >
      <ArrowLeft size={18} />
    </Link>
    <h2 className="min-w-0 flex-1 truncate text-base font-semibold text-foreground">{titulo}</h2>
    <span className="text-sm text-muted-foreground">
      {quantidade === 1 ? '1 contato' : `${quantidade} contatos`}
    </span>
  </div>
)
