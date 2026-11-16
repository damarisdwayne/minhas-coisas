import { normalizar, slug } from '@/lib/utils'
import { analisarTelefone, somenteDigitos } from './telefone'
import type { Categoria, Profissional, ProfissionalDados } from './types'

const MINIMO_DIGITOS_BUSCA = 4

const porNome = (a: { nome: string }, b: { nome: string }) => a.nome.localeCompare(b.nome, 'pt-BR')

export const agruparPorCategoria = (profissionais: Profissional[]): Categoria[] => {
  const grupos = new Map<string, Categoria>()
  profissionais.forEach((profissional) => {
    const chave = slug(profissional.categoria)
    const grupo = grupos.get(chave) ?? {
      slug: chave,
      nome: profissional.categoria,
      profissionais: [],
    }
    grupo.profissionais.push(profissional)
    grupos.set(chave, grupo)
  })
  return [...grupos.values()]
    .map((grupo) => ({ ...grupo, profissionais: [...grupo.profissionais].sort(porNome) }))
    .sort(porNome)
}

export const buscarProfissionais = (profissionais: Profissional[], busca: string) => {
  const termo = normalizar(busca)
  const digitos = somenteDigitos(busca)
  return profissionais
    .filter(({ nome, categoria, observacao, indicadoPor, telefones }) => {
      const texto = normalizar([nome, categoria, observacao, indicadoPor?.nome].join(' '))
      const porTelefone =
        digitos.length >= MINIMO_DIGITOS_BUSCA &&
        telefones.some((telefone) => somenteDigitos(telefone).includes(digitos))
      return texto.includes(termo) || porTelefone
    })
    .sort(porNome)
}

export const chaveProfissional = ({ nome, categoria, telefones }: ProfissionalDados) =>
  [slug(categoria), slug(nome), somenteDigitos(telefones[0] ?? '')].join('|')

export const textoProfissional = ({
  nome,
  categoria,
  telefones,
  indicadoPor,
  observacao,
}: Profissional) =>
  [
    `*${nome}* — ${categoria}`,
    ...telefones.map((telefone) => `📞 ${analisarTelefone(telefone).texto}`),
    indicadoPor &&
      `Indicado por ${[indicadoPor.nome, indicadoPor.telefone && analisarTelefone(indicadoPor.telefone).texto].filter(Boolean).join(' · ')}`,
    observacao && `_${observacao}_`,
  ]
    .filter(Boolean)
    .join('\n')
