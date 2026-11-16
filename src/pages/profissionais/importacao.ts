import { ehRegistro, ehTexto, lerLista, textoOpcional } from '@/pages/shared'
import type { Indicacao, ProfissionalDados } from './types'

const indicacaoDe = (valor: unknown): Indicacao | undefined => {
  if (!ehRegistro(valor)) return undefined
  const nome = textoOpcional(valor.nome)
  return nome ? { nome, telefone: textoOpcional(valor.telefone) } : undefined
}

const dadosDe = (item: unknown): ProfissionalDados | undefined => {
  if (!ehRegistro(item)) return undefined
  const nome = textoOpcional(item.nome)
  const categoria = textoOpcional(item.categoria)
  if (!nome || !categoria) return undefined
  const telefones = Array.isArray(item.telefones) ? item.telefones.filter(ehTexto) : []
  return {
    nome,
    categoria,
    telefones,
    observacao: textoOpcional(item.observacao),
    indicadoPor: indicacaoDe(item.indicadoPor),
  }
}

export const lerProfissionais = (conteudo: string) => lerLista(conteudo, 'profissionais', dadosDe)
