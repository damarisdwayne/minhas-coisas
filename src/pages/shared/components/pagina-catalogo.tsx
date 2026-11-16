import { useMemo, useState, type ComponentType } from 'react'
import { Plus, type LucideIcon } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { EmptyState } from '@/components/empty-state'
import { SearchField } from '@/components/search-field'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  PageLoader,
} from '@/components/ui'
import type { DadosDe, ItemCatalogo, Unidade } from '../types'
import type { Catalogo } from '../use-catalogo'
import { agruparPorCategoria, contar } from '../utils'
import { CabecalhoLista } from './cabecalho-lista'
import { ImportarLista } from './importar-lista'
import { ListaCategorias } from './lista-categorias'

export type CardCatalogoProps<T extends ItemCatalogo> = {
  item: T
  mostrarCategoria: boolean
  onEditar: (item: T) => void
  onDestacar: (item: T) => void
}

export type FormCatalogoProps<T extends ItemCatalogo> = {
  item?: T
  categoriaPadrao?: string
  categorias: string[]
  onSalvar: (dados: DadosDe<T>) => void
  onRemover?: () => void
}

export type TextosCatalogo = {
  busca: string
  unidade: Unidade
  novo: string
  editar: string
  descricaoForm: string
  vazioTitulo: string
  vazioDescricao: string
}

type PaginaCatalogoProps<T extends ItemCatalogo> = {
  catalogo: Catalogo<T>
  icone: LucideIcon
  textos: TextosCatalogo
  buscar: (itens: T[], busca: string) => T[]
  ler: (conteudo: string) => DadosDe<T>[] | undefined
  Card: ComponentType<CardCatalogoProps<T>>
  Form: ComponentType<FormCatalogoProps<T>>
}

export const PaginaCatalogo = <T extends ItemCatalogo>({
  catalogo,
  icone,
  textos,
  buscar,
  ler,
  Card,
  Form,
}: PaginaCatalogoProps<T>) => {
  const [parametros, setParametros] = useSearchParams()
  const { itens, carregado, salvar, remover, removerCategoria, importar, alternarDestaque } =
    catalogo
  const [edicao, setEdicao] = useState<{ item?: T }>()

  const busca = parametros.get('q') ?? ''
  const categorias = useMemo(() => agruparPorCategoria(itens), [itens])
  const nomesCategorias = useMemo(() => categorias.map(({ nome }) => nome), [categorias])
  const categoria = categorias.find(({ slug }) => slug === parametros.get('categoria'))
  const encontrados = useMemo(
    () => (busca.trim() ? buscar(itens, busca) : undefined),
    [itens, busca, buscar],
  )
  const listados = encontrados ?? categoria?.itens
  const emEdicao = edicao?.item
  const fechar = () => setEdicao(undefined)

  const aoBuscar = (texto: string) =>
    setParametros(
      (atuais) => {
        const proximos = new URLSearchParams(atuais)
        if (texto) proximos.set('q', texto)
        else proximos.delete('q')
        return proximos
      },
      { replace: true },
    )

  const excluirCategoria = () => {
    if (!categoria) return
    const quantidade = contar(categoria.itens.length, textos.unidade)
    if (!window.confirm(`Excluir a categoria "${categoria.nome}" com ${quantidade}?`)) return
    void removerCategoria(categoria)
    setParametros({}, { replace: true })
  }

  if (!carregado) return <PageLoader />

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center gap-2">
        <SearchField value={busca} onChange={aoBuscar} placeholder={textos.busca} />
        <Button onClick={() => setEdicao({})}>
          <Plus size={16} />
          Novo
        </Button>
      </div>

      {!itens.length && (
        <EmptyState
          icon={icone}
          title={textos.vazioTitulo}
          description={textos.vazioDescricao}
          action={<ImportarLista ler={ler} onImportar={importar} />}
        />
      )}

      {listados && (
        <>
          <CabecalhoLista
            titulo={encontrados ? `Resultados para "${busca.trim()}"` : (categoria?.nome ?? '')}
            contagem={contar(listados.length, textos.unidade)}
            onExcluir={encontrados ? undefined : excluirCategoria}
          />
          <ul className="grid gap-3 lg:grid-cols-2">
            {listados.map((item) => (
              <li key={item.id}>
                <Card
                  item={item}
                  mostrarCategoria={Boolean(encontrados)}
                  onEditar={(escolhido) => setEdicao({ item: escolhido })}
                  onDestacar={alternarDestaque}
                />
              </li>
            ))}
          </ul>
        </>
      )}

      {!listados && itens.length > 0 && (
        <>
          <ListaCategorias categorias={categorias} />
          <div className="flex justify-center">
            <ImportarLista variant="ghost" ler={ler} onImportar={importar} />
          </div>
        </>
      )}

      <Dialog open={Boolean(edicao)} onOpenChange={(aberto) => !aberto && fechar()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{emEdicao ? textos.editar : textos.novo}</DialogTitle>
            <DialogDescription>{textos.descricaoForm}</DialogDescription>
          </DialogHeader>
          {edicao && (
            <Form
              item={emEdicao}
              categoriaPadrao={categoria?.nome}
              categorias={nomesCategorias}
              onSalvar={(dados) => {
                salvar(dados, emEdicao)
                fechar()
              }}
              onRemover={
                emEdicao &&
                (() => {
                  remover(emEdicao.id)
                  fechar()
                })
              }
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
