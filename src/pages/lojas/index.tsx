import { Store } from 'lucide-react'
import { PaginaCatalogo, useCatalogo, type TextosCatalogo } from '@/pages/shared'
import { LojaCard, LojaForm } from './components'
import { lerLojas } from './importacao'
import { servicoLojas } from './servico'
import { buscarLojas, chaveLoja } from './utils'

const TEXTOS: TextosCatalogo = {
  busca: 'Buscar loja, tipo ou lugar',
  unidade: ['loja', 'lojas'],
  novo: 'Nova loja',
  editar: 'Editar loja',
  descricaoForm: 'Nome, categoria, links e por que vale a pena.',
  vazioTitulo: 'Nenhuma loja cadastrada',
  vazioDescricao:
    'Adicione uma loja ou importe uma lista pronta em JSON, como a do arquivo dados/lojas.json.',
}

export const LojasPage = () => {
  const catalogo = useCatalogo({ servico: servicoLojas, chave: chaveLoja })

  return (
    <PaginaCatalogo
      catalogo={catalogo}
      icone={Store}
      textos={TEXTOS}
      buscar={buscarLojas}
      ler={lerLojas}
      Card={LojaCard}
      Form={LojaForm}
    />
  )
}
