import { opcional } from '@/lib/utils'
import type { LinkLoja, Loja, LojaDados } from '../../types'
import { ehEnderecoWeb } from '../../utils'

const SEPARADOR = '|'
const ROTULO_PADRAO = 'Abrir'

export type Rascunho = {
  nome: string
  categoria: string
  tipo: string
  local: string
  descricao: string
  imagem: string
  links: string
}

export const rascunhoDe = (loja?: Loja, categoriaPadrao = ''): Rascunho => ({
  nome: loja?.nome ?? '',
  categoria: loja?.categoria ?? categoriaPadrao,
  tipo: loja?.tipo ?? '',
  local: loja?.local ?? '',
  descricao: loja?.descricao ?? '',
  imagem: loja?.imagem ?? '',
  links: loja?.links.map(({ rotulo, url }) => `${rotulo} ${SEPARADOR} ${url}`).join('\n') ?? '',
})

export const podeSalvar = ({ nome, categoria }: Rascunho) =>
  Boolean(nome.trim() && categoria.trim())

const linkDe = (linha: string): LinkLoja | undefined => {
  const partes = linha.split(SEPARADOR).map((parte) => parte.trim())
  const url = partes.at(-1) ?? ''
  if (!ehEnderecoWeb(url)) return undefined
  return { rotulo: partes.slice(0, -1).join(' ') || ROTULO_PADRAO, url }
}

const enderecoOpcional = (texto: string) => {
  const valor = opcional(texto)
  return valor && ehEnderecoWeb(valor) ? valor : undefined
}

export const dadosDe = (rascunho: Rascunho): LojaDados => ({
  nome: rascunho.nome.trim(),
  categoria: rascunho.categoria.trim(),
  tipo: opcional(rascunho.tipo),
  local: opcional(rascunho.local),
  descricao: opcional(rascunho.descricao),
  imagem: enderecoOpcional(rascunho.imagem),
  links: rascunho.links.split('\n').flatMap((linha) => linkDe(linha) ?? []),
})
