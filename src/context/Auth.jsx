import React, { useEffect, useState, createContext } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setPending(false)
    })
  }, [])

  if (pending) {
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        uid: currentUser?.uid,
        email: currentUser?.email,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
