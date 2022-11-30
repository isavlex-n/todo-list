import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { setUser } from '../../store/slices/userSlice'

import AuthForm from '../AuthForm'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginHandler = ({ email, password }) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      console.log(user)
      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        }),
      )
      navigate('/')
    })
  }

  return <AuthForm title="Sign in" submit={loginHandler} />
}
