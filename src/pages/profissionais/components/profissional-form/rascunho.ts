import { opcional } from '@/lib/utils'
import type { Profissional, ProfissionalDados } from '../../types'

export type Rascunho = {
  nome: string
  categoria: string
  telefones: string
  indicadoPorNome: string
  indicadoPorTelefone: string
  observacao: string
}

export const rascunhoDe = (profissional?: Profissional, categoriaPadrao = ''): Rascunho => ({
  nome: profissional?.nome ?? '',
  categoria: profissional?.categoria ?? categoriaPadrao,
  telefones: profissional?.telefones.join(', ') ?? '',
  indicadoPorNome: profissional?.indicadoPor?.nome ?? '',
  indicadoPorTelefone: profissional?.indicadoPor?.telefone ?? '',
  observacao: profissional?.observacao ?? '',
})

export const podeSalvar = ({ nome, categoria }: Rascunho) =>
  Boolean(nome.trim() && categoria.trim())

export const dadosDe = (rascunho: Rascunho): ProfissionalDados => {
  const indicadoPorNome = opcional(rascunho.indicadoPorNome)
  return {
    nome: rascunho.nome.trim(),
    categoria: rascunho.categoria.trim(),
    telefones: rascunho.telefones
      .split(/[,;\n]/)
      .map((telefone) => telefone.trim())
      .filter(Boolean),
    observacao: opcional(rascunho.observacao),
    indicadoPor: indicadoPorNome
      ? { nome: indicadoPorNome, telefone: opcional(rascunho.indicadoPorTelefone) }
      : undefined,
  }
}
