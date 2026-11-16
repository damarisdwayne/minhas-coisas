import { ehRegistro, lerLista, textoOpcional } from '@/pages/shared'
import type { LinkLoja, LojaDados } from './types'
import { ehEnderecoWeb } from './utils'

const ROTULO_PADRAO = 'Abrir'

const enderecoOpcional = (valor: unknown) => {
  const texto = textoOpcional(valor)
  return texto && ehEnderecoWeb(texto) ? texto : undefined
}

const linkDe = (valor: unknown): LinkLoja | undefined => {
  if (!ehRegistro(valor)) return undefined
  const url = enderecoOpcional(valor.url)
  return url ? { rotulo: textoOpcional(valor.rotulo) ?? ROTULO_PADRAO, url } : undefined
}

const dadosDe = (item: unknown): LojaDados | undefined => {
  if (!ehRegistro(item)) return undefined
  const nome = textoOpcional(item.nome)
  const categoria = textoOpcional(item.categoria)
  if (!nome || !categoria) return undefined
  return {
    nome,
    categoria,
    tipo: textoOpcional(item.tipo),
    local: textoOpcional(item.local),
    descricao: textoOpcional(item.descricao),
    imagem: enderecoOpcional(item.imagem),
    links: Array.isArray(item.links) ? item.links.flatMap((link) => linkDe(link) ?? []) : [],
  }
}

export const lerLojas = (conteudo: string) => lerLista(conteudo, 'lojas', dadosDe)
