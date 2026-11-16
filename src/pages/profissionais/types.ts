export type Indicacao = {
  nome: string
  telefone?: string
}

export type Profissional = {
  id: string
  nome: string
  categoria: string
  telefones: string[]
  observacao?: string
  indicadoPor?: Indicacao
  criadoEm: string
}

export type ProfissionalDados = Omit<Profissional, 'id' | 'criadoEm'>

export type Categoria = {
  slug: string
  nome: string
  profissionais: Profissional[]
}
