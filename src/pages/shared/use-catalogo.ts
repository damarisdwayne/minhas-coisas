import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { toast } from 'sonner'
import { useAuth } from '@/store/auth'
import type { Servico } from './servico'
import type { Categoria, DadosDe, ItemCatalogo } from './types'

type OpcoesCatalogo<T extends ItemCatalogo> = {
  servico: Servico<T>
  chave: (dados: DadosDe<T>) => string
}

export const useCatalogo = <T extends ItemCatalogo>({ servico, chave }: OpcoesCatalogo<T>) => {
  const uid = useAuth().user?.uid
  const [itens, setItens] = useState<T[]>([])
  const [carregado, setCarregado] = useState(false)

  useEffect(() => {
    if (!uid) return
    return servico.assinar(
      uid,
      (lista) => {
        setItens(lista)
        setCarregado(true)
      },
      () => {
        setCarregado(true)
        toast.error('Não foi possível carregar a lista')
      },
    )
  }, [uid, servico])

  const novo = (dados: DadosDe<T>) =>
    ({ ...dados, id: nanoid(), criadoEm: new Date().toISOString() }) as T

  const gravar = (item: T) => {
    if (!uid) return
    servico.salvar(uid, item).catch(() => toast.error('Erro ao salvar'))
  }

  const salvar = (dados: DadosDe<T>, existente?: T) =>
    gravar(existente ? { ...existente, ...dados } : novo(dados))

  const alternarDestaque = (item: T) => gravar({ ...item, destacado: !item.destacado })

  const remover = (id: string) => {
    if (!uid) return
    servico.remover(uid, id).catch(() => toast.error('Erro ao excluir'))
  }

  const removerCategoria = async ({ nome, itens: daCategoria }: Categoria<T>) => {
    if (!uid) return
    try {
      await servico.removerVarios(
        uid,
        daCategoria.map(({ id }) => id),
      )
      toast.success(`Categoria "${nome}" excluída`)
    } catch {
      toast.error('Erro ao excluir a categoria')
    }
  }

  const importar = async (lista: DadosDe<T>[]) => {
    if (!uid) return
    const existentes = new Set(itens.map(chave))
    const novos = lista.filter((dados) => !existentes.has(chave(dados))).map(novo)
    if (!novos.length) return void toast.info('Tudo que está no arquivo já está na lista')
    try {
      await servico.salvarVarios(uid, novos)
      toast.success(novos.length === 1 ? '1 item importado' : `${novos.length} itens importados`)
    } catch {
      toast.error('Erro ao importar a lista')
    }
  }

  return { itens, carregado, salvar, remover, removerCategoria, importar, alternarDestaque }
}

export type Catalogo<T extends ItemCatalogo> = ReturnType<typeof useCatalogo<T>>
