import { useMemo, useState } from 'react'
import { Contact, Plus } from 'lucide-react'
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
import {
  CabecalhoLista,
  ImportarLista,
  ListaCategorias,
  ListaProfissionais,
  ProfissionalForm,
} from './components'
import type { Profissional } from './types'
import { useProfissionais } from './use-profissionais'
import { agruparPorCategoria, buscarProfissionais } from './utils'

type Edicao = { profissional?: Profissional }

export const ProfissionaisPage = () => {
  const [parametros, setParametros] = useSearchParams()
  const { profissionais, carregado, salvar, remover, importar } = useProfissionais()
  const [edicao, setEdicao] = useState<Edicao>()

  const busca = parametros.get('q') ?? ''
  const categorias = useMemo(() => agruparPorCategoria(profissionais), [profissionais])
  const nomesCategorias = useMemo(() => categorias.map(({ nome }) => nome), [categorias])
  const categoria = categorias.find(({ slug }) => slug === parametros.get('categoria'))
  const encontrados = useMemo(
    () => (busca.trim() ? buscarProfissionais(profissionais, busca) : undefined),
    [profissionais, busca],
  )
  const listados = encontrados ?? categoria?.profissionais
  const emEdicao = edicao?.profissional
  const fechar = () => setEdicao(undefined)

  const buscar = (texto: string) =>
    setParametros(
      (atuais) => {
        const proximos = new URLSearchParams(atuais)
        if (texto) proximos.set('q', texto)
        else proximos.delete('q')
        return proximos
      },
      { replace: true },
    )

  if (!carregado) return <PageLoader />

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center gap-2">
        <SearchField
          value={busca}
          onChange={buscar}
          placeholder="Buscar nome, serviço ou telefone"
        />
        <Button onClick={() => setEdicao({})}>
          <Plus size={16} />
          Novo
        </Button>
      </div>

      {!profissionais.length && (
        <EmptyState
          icon={Contact}
          title="Nenhum profissional cadastrado"
          description="Adicione um contato ou importe uma lista pronta em JSON, como a do arquivo dados/indicacoes-palmares.json."
          action={<ImportarLista onImportar={importar} />}
        />
      )}

      {listados && (
        <>
          <CabecalhoLista
            titulo={encontrados ? `Resultados para "${busca.trim()}"` : (categoria?.nome ?? '')}
            quantidade={listados.length}
          />
          <ListaProfissionais
            profissionais={listados}
            mostrarCategoria={Boolean(encontrados)}
            onEditar={(profissional) => setEdicao({ profissional })}
          />
        </>
      )}

      {!listados && profissionais.length > 0 && (
        <>
          <ListaCategorias categorias={categorias} />
          <div className="flex justify-center">
            <ImportarLista variant="ghost" onImportar={importar} />
          </div>
        </>
      )}

      <Dialog open={Boolean(edicao)} onOpenChange={(aberto) => !aberto && fechar()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{emEdicao ? 'Editar profissional' : 'Novo profissional'}</DialogTitle>
            <DialogDescription>Contato, serviço e quem indicou.</DialogDescription>
          </DialogHeader>
          {edicao && (
            <ProfissionalForm
              profissional={emEdicao}
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
