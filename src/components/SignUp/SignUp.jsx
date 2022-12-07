import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

import AuthForm from '../AuthForm'

export default function SignUp() {
  const navigate = useNavigate()

  const signInHandler = ({ email, password }) => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      navigate('/')
    })
  }

  return <AuthForm title="Sign in" submit={signInHandler} />
}
