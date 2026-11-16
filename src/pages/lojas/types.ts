import type { DadosDe, ItemCatalogo } from '@/pages/shared'

export type LinkLoja = {
  rotulo: string
  url: string
}

export type Loja = ItemCatalogo & {
  tipo?: string
  local?: string
  descricao?: string
  imagem?: string
  links: LinkLoja[]
}

export type LojaDados = DadosDe<Loja>
