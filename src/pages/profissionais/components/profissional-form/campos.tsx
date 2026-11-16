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
    <Campo id="profissional-nome" rotulo="Nome">
      <Input
        id="profissional-nome"
        value={rascunho.nome}
        onChange={(event) => onChange({ nome: event.target.value })}
        placeholder="Ex.: Serginho"
      />
    </Campo>

    <CampoCategoria
      id="profissional-categoria"
      valor={rascunho.categoria}
      categorias={categorias}
      placeholder="Ex.: Eletricista"
      onChange={(categoria) => onChange({ categoria })}
    />

    <Campo id="profissional-telefones" rotulo="Telefones (separe por vírgula)">
      <Input
        id="profissional-telefones"
        inputMode="tel"
        value={rascunho.telefones}
        onChange={(event) => onChange({ telefones: event.target.value })}
        placeholder="31 99999-9999, 3333-3333"
      />
    </Campo>

    <div className="grid gap-4 sm:grid-cols-2">
      <Campo id="profissional-indicado-nome" rotulo="Quem indicou">
        <Input
          id="profissional-indicado-nome"
          value={rascunho.indicadoPorNome}
          onChange={(event) => onChange({ indicadoPorNome: event.target.value })}
        />
      </Campo>
      <Campo id="profissional-indicado-telefone" rotulo="Telefone de quem indicou">
        <Input
          id="profissional-indicado-telefone"
          inputMode="tel"
          value={rascunho.indicadoPorTelefone}
          onChange={(event) => onChange({ indicadoPorTelefone: event.target.value })}
        />
      </Campo>
    </div>

    <Campo id="profissional-observacao" rotulo="Observação">
      <Textarea
        id="profissional-observacao"
        value={rascunho.observacao}
        onChange={(event) => onChange({ observacao: event.target.value })}
        placeholder="Preço, qualidade do serviço, quando usei…"
      />
    </Campo>
  </div>
)
