import { ExternalLink, MapPin } from 'lucide-react'
import { Badge, buttonVariants } from '@/components/ui'
import { CartaoItem, type CardCatalogoProps } from '@/pages/shared'
import type { Loja } from '../types'
import { textoLoja } from '../utils'
import { ImagemLoja } from './imagem-loja'

const CLASSE_PRINCIPAL = buttonVariants({ size: 'sm' })
const CLASSE_SECUNDARIA = buttonVariants({ variant: 'outline', size: 'sm' })

export const LojaCard = ({
  item,
  mostrarCategoria,
  onEditar,
  onDestacar,
}: CardCatalogoProps<Loja>) => {
  const { nome, categoria, tipo, local, descricao, imagem, links, destacado } = item
  const temSelos = Boolean(tipo) || mostrarCategoria

  return (
    <CartaoItem
      nome={nome}
      destacado={destacado}
      texto={textoLoja(item)}
      selos={
        temSelos && (
          <div className="flex flex-wrap gap-1">
            {mostrarCategoria && <Badge variant="secondary">{categoria}</Badge>}
            {tipo && <Badge>{tipo}</Badge>}
          </div>
        )
      }
      onDestacar={() => onDestacar(item)}
      onEditar={() => onEditar(item)}
    >
      {imagem && <ImagemLoja url={imagem} descricao={nome} />}

      {local && (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin size={12} className="shrink-0" />
          {local}
        </p>
      )}

      {descricao && <p className="text-sm text-foreground">{descricao}</p>}

      {links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {links.map(({ rotulo, url }, indice) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noreferrer"
              className={indice === 0 ? CLASSE_PRINCIPAL : CLASSE_SECUNDARIA}
            >
              <ExternalLink size={14} />
              {rotulo}
            </a>
          ))}
        </div>
      )}
    </CartaoItem>
  )
}
