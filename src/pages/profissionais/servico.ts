import { criarServico } from '@/pages/shared'
import type { Profissional } from './types'

export const servicoProfissionais = criarServico<Profissional>('profissionais', (id, dados) => ({
  ...(dados as Omit<Profissional, 'id'>),
  id,
  telefones: Array.isArray(dados.telefones) ? dados.telefones : [],
}))
