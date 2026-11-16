const DDD_PADRAO = '31'
const CODIGO_PAIS = '55'

export type TelefoneAnalisado = {
  texto: string
  ligar?: string
  whatsapp?: string
  conferir: boolean
}

type Partes = { ddd: string; numero: string }

export const somenteDigitos = (texto: string) => texto.replace(/\D/g, '')

const semPrefixos = (texto: string) => {
  const digitos = somenteDigitos(texto).replace(/^0+/, '')
  const comPais = digitos.startsWith(CODIGO_PAIS) && digitos.length >= 12
  return comPais ? digitos.slice(CODIGO_PAIS.length) : digitos
}

const ehFixo = (numero: string) => numero.length === 8 && /^[2-5]/.test(numero)

const ehCelular = (numero: string) => numero.length === 9 && numero.startsWith('9')

const comNonoDigito = (numero: string) =>
  numero.length === 8 && !ehFixo(numero) ? `9${numero}` : numero

const separar = (digitos: string): Partes | undefined => {
  if (digitos.length === 8 || digitos.length === 9) return { ddd: DDD_PADRAO, numero: digitos }
  if (digitos.length === 11) return { ddd: digitos.slice(0, 2), numero: digitos.slice(2) }
  if (digitos.length === 10 && !digitos.startsWith('9'))
    return { ddd: digitos.slice(0, 2), numero: digitos.slice(2) }
  return undefined
}

const finalIncompleto = (texto: string) => {
  const final = texto.trim().match(/-(\d*)$/)
  return Boolean(final) && final?.[1].length !== 4
}

export const analisarTelefone = (texto: string): TelefoneAnalisado => {
  const partes = finalIncompleto(texto) ? undefined : separar(semPrefixos(texto))
  const numero = partes && comNonoDigito(partes.numero)
  if (!partes || !numero || !(ehFixo(numero) || ehCelular(numero)))
    return { texto: texto.trim(), conferir: true }

  const completo = `${CODIGO_PAIS}${partes.ddd}${numero}`
  return {
    texto: `(${partes.ddd}) ${numero.slice(0, -4)}-${numero.slice(-4)}`,
    ligar: `tel:+${completo}`,
    whatsapp: ehCelular(numero) ? `https://wa.me/${completo}` : undefined,
    conferir: false,
  }
}
