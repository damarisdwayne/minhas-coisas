import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  writeBatch,
  type DocumentData,
  type WriteBatch,
} from 'firebase/firestore'
import { db } from '@/lib/firestore'
import type { ItemCatalogo } from './types'

const LIMITE_LOTE = 400

const semIndefinidos = (valor: object): DocumentData => JSON.parse(JSON.stringify(valor))

const emLotes = async <T>(itens: T[], aplicar: (lote: WriteBatch, item: T) => void) => {
  for (let inicio = 0; inicio < itens.length; inicio += LIMITE_LOTE) {
    const lote = writeBatch(db)
    itens.slice(inicio, inicio + LIMITE_LOTE).forEach((item) => aplicar(lote, item))
    await lote.commit()
  }
}

export const criarServico = <T extends ItemCatalogo>(
  nomeColecao: string,
  deDocumento: (id: string, dados: DocumentData) => T,
) => {
  const colecao = (uid: string) => collection(db, 'users', uid, nomeColecao)
  const referencia = (uid: string, id: string) => doc(colecao(uid), id)

  return {
    assinar: (uid: string, aoMudar: (itens: T[]) => void, aoFalhar: () => void) =>
      onSnapshot(
        colecao(uid),
        (snapshot) => aoMudar(snapshot.docs.map((item) => deDocumento(item.id, item.data()))),
        aoFalhar,
      ),
    salvar: (uid: string, item: T) => setDoc(referencia(uid, item.id), semIndefinidos(item)),
    remover: (uid: string, id: string) => deleteDoc(referencia(uid, id)),
    salvarVarios: (uid: string, itens: T[]) =>
      emLotes(itens, (lote, item) => lote.set(referencia(uid, item.id), semIndefinidos(item))),
    removerVarios: (uid: string, ids: string[]) =>
      emLotes(ids, (lote, id) => lote.delete(referencia(uid, id))),
  }
}

export type Servico<T extends ItemCatalogo> = ReturnType<typeof criarServico<T>>
