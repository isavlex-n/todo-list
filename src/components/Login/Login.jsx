import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import AuthForm from '../AuthForm'

export default function Login() {
  const navigate = useNavigate()

  const loginHandler = ({ email, password }) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate('/')
    })
  }

  return <AuthForm title="Sign in" submit={loginHandler} />
}
