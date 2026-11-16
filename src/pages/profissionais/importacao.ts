import { opcional } from '@/lib/utils'
import type { Indicacao, ProfissionalDados } from './types'

type Registro = Record<string, unknown>

const ehRegistro = (valor: unknown): valor is Registro =>
  typeof valor === 'object' && valor !== null

const ehTexto = (valor: unknown): valor is string => typeof valor === 'string'

const textoOpcional = (valor: unknown) => (ehTexto(valor) ? opcional(valor) : undefined)

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

export const lerListaImportada = (conteudo: string): ProfissionalDados[] | undefined => {
  try {
    const json: unknown = JSON.parse(conteudo)
    const itens = ehRegistro(json) ? json.profissionais : json
    if (!Array.isArray(itens)) return undefined
    const lista = itens.flatMap((item) => dadosDe(item) ?? [])
    return lista.length ? lista : undefined
  } catch {
    return undefined
  }
}
