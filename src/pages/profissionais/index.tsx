import { Contact } from 'lucide-react'
import { PaginaCatalogo, useCatalogo, type TextosCatalogo } from '@/pages/shared'
import { ProfissionalCard, ProfissionalForm } from './components'
import { lerProfissionais } from './importacao'
import { servicoProfissionais } from './servico'
import { buscarProfissionais, chaveProfissional } from './utils'

const TEXTOS: TextosCatalogo = {
  busca: 'Buscar nome, serviço ou telefone',
  unidade: ['contato', 'contatos'],
  novo: 'Novo profissional',
  editar: 'Editar profissional',
  descricaoForm: 'Contato, serviço e quem indicou.',
  vazioTitulo: 'Nenhum profissional cadastrado',
  vazioDescricao:
    'Adicione um contato ou importe uma lista pronta em JSON, como a do arquivo dados/indicacoes-palmares.json.',
}

export const ProfissionaisPage = () => {
  const catalogo = useCatalogo({ servico: servicoProfissionais, chave: chaveProfissional })

  return (
    <PaginaCatalogo
      catalogo={catalogo}
      icone={Contact}
      textos={TEXTOS}
      buscar={buscarProfissionais}
      ler={lerProfissionais}
      Card={ProfissionalCard}
      Form={ProfissionalForm}
    />
  )
}
