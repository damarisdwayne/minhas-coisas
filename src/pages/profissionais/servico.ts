import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  writeBatch,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '@/lib/firestore'
import type { Profissional } from './types'

const LIMITE_LOTE = 400

const colecao = (uid: string) => collection(db, 'users', uid, 'profissionais')

const semIndefinidos = <T extends object>(valor: T): T => JSON.parse(JSON.stringify(valor))

const deDocumento = (id: string, dados: DocumentData): Profissional => ({
  ...(dados as Omit<Profissional, 'id'>),
  id,
  telefones: Array.isArray(dados.telefones) ? dados.telefones : [],
})

export const assinarProfissionais = (
  uid: string,
  aoMudar: (profissionais: Profissional[]) => void,
  aoFalhar: () => void,
) =>
  onSnapshot(
    colecao(uid),
    (snapshot) => aoMudar(snapshot.docs.map((item) => deDocumento(item.id, item.data()))),
    aoFalhar,
  )

export const salvarProfissional = (uid: string, profissional: Profissional) =>
  setDoc(doc(colecao(uid), profissional.id), semIndefinidos(profissional))

export const removerProfissional = (uid: string, id: string) => deleteDoc(doc(colecao(uid), id))

export const salvarProfissionais = async (uid: string, profissionais: Profissional[]) => {
  for (let inicio = 0; inicio < profissionais.length; inicio += LIMITE_LOTE) {
    const lote = writeBatch(db)
    profissionais
      .slice(inicio, inicio + LIMITE_LOTE)
      .forEach((profissional) =>
        lote.set(doc(colecao(uid), profissional.id), semIndefinidos(profissional)),
      )
    await lote.commit()
  }
}
