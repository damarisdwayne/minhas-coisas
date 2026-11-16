import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { toast } from 'sonner'
import { useAuth } from '@/store/auth'
import {
  assinarProfissionais,
  removerProfissional,
  salvarProfissionais,
  salvarProfissional,
} from './servico'
import type { Profissional, ProfissionalDados } from './types'
import { chaveProfissional } from './utils'

const novo = (dados: ProfissionalDados): Profissional => ({
  ...dados,
  id: nanoid(),
  criadoEm: new Date().toISOString(),
})

const plural = (quantidade: number) =>
  quantidade === 1 ? '1 profissional' : `${quantidade} profissionais`

export const useProfissionais = () => {
  const uid = useAuth().user?.uid
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [carregado, setCarregado] = useState(false)

  useEffect(() => {
    if (!uid) return
    return assinarProfissionais(
      uid,
      (lista) => {
        setProfissionais(lista)
        setCarregado(true)
      },
      () => {
        setCarregado(true)
        toast.error('Não foi possível carregar os profissionais')
      },
    )
  }, [uid])

  const salvar = (dados: ProfissionalDados, existente?: Profissional) => {
    if (!uid) return
    const profissional = existente ? { ...existente, ...dados } : novo(dados)
    salvarProfissional(uid, profissional).catch(() => toast.error('Erro ao salvar o profissional'))
  }

  const remover = (id: string) => {
    if (!uid) return
    removerProfissional(uid, id).catch(() => toast.error('Erro ao excluir o profissional'))
  }

  const importar = async (lista: ProfissionalDados[]) => {
    if (!uid) return
    const existentes = new Set(profissionais.map(chaveProfissional))
    const novos = lista.filter((dados) => !existentes.has(chaveProfissional(dados))).map(novo)
    if (!novos.length) return void toast.info('Todos os profissionais do arquivo já estão na lista')
    try {
      await salvarProfissionais(uid, novos)
      toast.success(`${plural(novos.length)} importados`)
    } catch {
      toast.error('Erro ao importar a lista')
    }
  }

  return { profissionais, carregado, salvar, remover, importar }
}

export type ProfissionaisEstado = ReturnType<typeof useProfissionais>
