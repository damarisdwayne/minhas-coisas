import { Input, Textarea } from '@/components/ui'
import { Campo, CampoCategoria } from '@/pages/shared'
import type { Rascunho } from './rascunho'

type CamposProps = {
  rascunho: Rascunho
  categorias: string[]
  onChange: (alteracao: Partial<Rascunho>) => void
}

export const Campos = ({ rascunho, categorias, onChange }: CamposProps) => (
  <div className="flex flex-col gap-4">
    <Campo id="loja-nome" rotulo="Nome">
      <Input
        id="loja-nome"
        value={rascunho.nome}
        onChange={(event) => onChange({ nome: event.target.value })}
        placeholder="Ex.: Lilo Beachwear"
      />
    </Campo>

    <div className="grid gap-4 sm:grid-cols-2">
      <CampoCategoria
        id="loja-categoria"
        valor={rascunho.categoria}
        categorias={categorias}
        placeholder="Ex.: Moda praia"
        onChange={(categoria) => onChange({ categoria })}
      />
      <Campo id="loja-tipo" rotulo="Tipo">
        <Input
          id="loja-tipo"
          value={rascunho.tipo}
          onChange={(event) => onChange({ tipo: event.target.value })}
          placeholder="Ex.: Beachwear · Crochê"
        />
      </Campo>
    </div>

    <Campo id="loja-local" rotulo="Onde fica">
      <Input
        id="loja-local"
        value={rascunho.local}
        onChange={(event) => onChange({ local: event.target.value })}
        placeholder="Ex.: Belo Horizonte · MG ou Online"
      />
    </Campo>

    <Campo id="loja-links" rotulo="Links (um por linha: nome | endereço)">
      <Textarea
        id="loja-links"
        value={rascunho.links}
        onChange={(event) => onChange({ links: event.target.value })}
        placeholder={'Loja online | https://…\nInstagram | https://instagram.com/…'}
      />
    </Campo>

    <Campo id="loja-imagem" rotulo="Foto (endereço da imagem)">
      <Input
        id="loja-imagem"
        inputMode="url"
        value={rascunho.imagem}
        onChange={(event) => onChange({ imagem: event.target.value })}
        placeholder="https://…"
      />
    </Campo>

    <Campo id="loja-descricao" rotulo="Descrição">
      <Textarea
        id="loja-descricao"
        value={rascunho.descricao}
        onChange={(event) => onChange({ descricao: event.target.value })}
        placeholder="O que vende, por que vale a pena, cupom…"
      />
    </Campo>
  </div>
)
