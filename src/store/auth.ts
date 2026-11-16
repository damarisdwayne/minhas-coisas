import { useEffect } from 'react'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

const userAtom = atom<User | null>(null)
const authLoadingAtom = atom(true)

export const useAuthInit = () => {
  const setUser = useSetAtom(userAtom)
  const setLoading = useSetAtom(authLoadingAtom)

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        setUser(user)
        setLoading(false)
      }),
    [setUser, setLoading],
  )
}

const loginWithGoogle = () => signInWithPopup(auth, googleProvider)
const logout = () => signOut(auth)

export const useAuth = () => {
  const user = useAtomValue(userAtom)
  const loading = useAtomValue(authLoadingAtom)

  return { user, loading, loginWithGoogle, logout }
}
