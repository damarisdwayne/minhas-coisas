import type { Profissional } from '../types'
import { ProfissionalCard } from './profissional-card'

type ListaProfissionaisProps = {
  profissionais: Profissional[]
  mostrarCategoria?: boolean
  onEditar: (profissional: Profissional) => void
}

export const ListaProfissionais = ({
  profissionais,
  mostrarCategoria = false,
  onEditar,
}: ListaProfissionaisProps) => (
  <ul className="grid gap-3 lg:grid-cols-2">
    {profissionais.map((profissional) => (
      <li key={profissional.id}>
        <ProfissionalCard
          profissional={profissional}
          mostrarCategoria={mostrarCategoria}
          onEditar={onEditar}
        />
      </li>
    ))}
  </ul>
)
