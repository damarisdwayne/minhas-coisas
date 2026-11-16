export type ItemCatalogo = {
  id: string
  nome: string
  categoria: string
  destacado?: boolean
  criadoEm: string
}

export type DadosDe<T extends ItemCatalogo> = Omit<T, 'id' | 'criadoEm'>

export type Categoria<T extends ItemCatalogo> = {
  slug: string
  nome: string
  itens: T[]
}

export type Unidade = [singular: string, plural: string]
