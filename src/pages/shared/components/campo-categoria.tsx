import { Input } from '@/components/ui'
import { Campo } from './campo'

type CampoCategoriaProps = {
  id: string
  valor: string
  categorias: string[]
  placeholder: string
  onChange: (categoria: string) => void
}

export const CampoCategoria = ({
  id,
  valor,
  categorias,
  placeholder,
  onChange,
}: CampoCategoriaProps) => (
  <Campo id={id} rotulo="Categoria">
    <Input
      id={id}
      list={`${id}-opcoes`}
      value={valor}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
    <datalist id={`${id}-opcoes`}>
      {categorias.map((categoria) => (
        <option key={categoria} value={categoria} />
      ))}
    </datalist>
  </Campo>
)
