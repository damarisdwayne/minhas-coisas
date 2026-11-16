import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui'
import type { Categoria } from '../types'

export const ListaCategorias = ({ categorias }: { categorias: Categoria[] }) => (
  <ul className="grid gap-2 sm:grid-cols-2">
    {categorias.map(({ slug, nome, profissionais }) => (
      <li key={slug}>
        <Link
          to={{ search: `?categoria=${slug}` }}
          className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
            {nome}
          </span>
          <Badge variant="secondary">{profissionais.length}</Badge>
          <ChevronRight size={16} className="shrink-0 text-muted-foreground" />
        </Link>
      </li>
    ))}
  </ul>
)
