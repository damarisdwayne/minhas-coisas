import { criarServico } from '@/pages/shared'
import type { Loja } from './types'

export const servicoLojas = criarServico<Loja>('lojas', (id, dados) => ({
  ...(dados as Omit<Loja, 'id'>),
  id,
  links: Array.isArray(dados.links) ? dados.links : [],
}))
