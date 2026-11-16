import { useState } from 'react'

type ImagemLojaProps = {
  url: string
  descricao: string
}

export const ImagemLoja = ({ url, descricao }: ImagemLojaProps) => {
  const [falhou, setFalhou] = useState(false)

  if (falhou) return null

  return (
    <img
      src={url}
      alt={descricao}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFalhou(true)}
      className="h-44 w-full rounded-md bg-muted object-cover"
    />
  )
}
