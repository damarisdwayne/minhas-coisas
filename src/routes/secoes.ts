import { Contact, type LucideIcon } from 'lucide-react'

export type Secao = {
  to: string
  label: string
  icon: LucideIcon
}

export const SECOES: Secao[] = [{ to: '/profissionais', label: 'Profissionais', icon: Contact }]

export const SECAO_INICIAL = SECOES[0].to

export const tituloDaRota = (pathname: string) =>
  SECOES.find(({ to }) => pathname.startsWith(to))?.label ?? 'Minhas Coisas'
