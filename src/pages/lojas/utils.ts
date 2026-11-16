import { normalizar, slug } from '@/lib/utils'
import { porDestaque } from '@/pages/shared'
import type { Loja, LojaDados } from './types'

const ENDERECO_WEB = /^https?:\/\//i

export const ehEnderecoWeb = (texto: string) => ENDERECO_WEB.test(texto)

export const buscarLojas = (lojas: Loja[], busca: string) => {
  const termo = normalizar(busca)
  return lojas
    .filter(({ nome, categoria, tipo, local, descricao }) =>
      normalizar([nome, categoria, tipo, local, descricao].join(' ')).includes(termo),
    )
    .sort(porDestaque)
}

export const chaveLoja = ({ nome, categoria }: LojaDados) => [slug(categoria), slug(nome)].join('|')

export const textoLoja = ({ nome, categoria, local, descricao, links }: Loja) =>
  [
    `*${nome}* — ${categoria}`,
    local && `📍 ${local}`,
    descricao,
    ...links.map(({ rotulo, url }) => `${rotulo}: ${url}`),
  ]
    .filter(Boolean)
    .join('\n')
