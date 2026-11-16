import { opcional } from '@/lib/utils'

export type Registro = Record<string, unknown>

export const ehRegistro = (valor: unknown): valor is Registro =>
  typeof valor === 'object' && valor !== null

export const ehTexto = (valor: unknown): valor is string => typeof valor === 'string'

export const textoOpcional = (valor: unknown) => (ehTexto(valor) ? opcional(valor) : undefined)

export const lerLista = <T>(
  conteudo: string,
  campo: string,
  dadosDe: (item: unknown) => T | undefined,
): T[] | undefined => {
  try {
    const json: unknown = JSON.parse(conteudo)
    const itens = ehRegistro(json) ? json[campo] : json
    if (!Array.isArray(itens)) return undefined
    const lista = itens.flatMap((item) => dadosDe(item) ?? [])
    return lista.length ? lista : undefined
  } catch {
    return undefined
  }
}
