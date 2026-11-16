import { slug } from '@/lib/utils'
import type { Categoria, ItemCatalogo, Unidade } from './types'

const porNome = (a: { nome: string }, b: { nome: string }) => a.nome.localeCompare(b.nome, 'pt-BR')

export const porDestaque = (a: ItemCatalogo, b: ItemCatalogo) =>
  Number(Boolean(b.destacado)) - Number(Boolean(a.destacado)) || porNome(a, b)

export const agruparPorCategoria = <T extends ItemCatalogo>(itens: T[]): Categoria<T>[] => {
  const grupos = new Map<string, Categoria<T>>()
  itens.forEach((item) => {
    const chave = slug(item.categoria)
    const grupo = grupos.get(chave) ?? { slug: chave, nome: item.categoria, itens: [] }
    grupo.itens.push(item)
    grupos.set(chave, grupo)
  })
  return [...grupos.values()]
    .map((grupo) => ({ ...grupo, itens: [...grupo.itens].sort(porDestaque) }))
    .sort(porNome)
}

export const contar = (quantidade: number, [singular, plural]: Unidade) =>
  quantidade === 1 ? `1 ${singular}` : `${quantidade} ${plural}`
