import { useRef, type ChangeEvent } from 'react'
import { Upload } from 'lucide-react'
import { toast } from 'sonner'
import { Button, Input } from '@/components/ui'

type ImportarListaProps<D> = {
  variant?: 'outline' | 'ghost'
  ler: (conteudo: string) => D[] | undefined
  onImportar: (lista: D[]) => void
}

export const ImportarLista = <D,>({
  variant = 'outline',
  ler,
  onImportar,
}: ImportarListaProps<D>) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const aoEscolher = async (event: ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0]
    event.target.value = ''
    if (!arquivo) return
    const lista = ler(await arquivo.text())
    if (!lista) return void toast.error('Arquivo inválido: não encontrei uma lista para importar')
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
