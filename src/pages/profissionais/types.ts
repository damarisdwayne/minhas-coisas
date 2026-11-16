import type { DadosDe, ItemCatalogo } from '@/pages/shared'

export type Indicacao = {
  nome: string
  telefone?: string
}

export type Profissional = ItemCatalogo & {
  telefones: string[]
  observacao?: string
  indicadoPor?: Indicacao
}

export type ProfissionalDados = DadosDe<Profissional>
