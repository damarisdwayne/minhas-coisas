import { useRef, type ChangeEvent } from 'react'
import { Upload } from 'lucide-react'
import { toast } from 'sonner'
import { Button, Input } from '@/components/ui'
import { lerListaImportada } from '../importacao'
import type { ProfissionalDados } from '../types'

type ImportarListaProps = {
  variant?: 'outline' | 'ghost'
  onImportar: (lista: ProfissionalDados[]) => void
}

export const ImportarLista = ({ variant = 'outline', onImportar }: ImportarListaProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const aoEscolher = async (event: ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0]
    event.target.value = ''
    if (!arquivo) return
    const lista = lerListaImportada(await arquivo.text())
    if (!lista) return void toast.error('Arquivo inválido: esperava uma lista de profissionais')
    onImportar(lista)
  }

  return (
    <>
      <Button variant={variant} size="sm" onClick={() => inputRef.current?.click()}>
        <Upload size={14} />
        Importar lista
      </Button>
      <Input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={aoEscolher}
      />
    </>
  )
}
