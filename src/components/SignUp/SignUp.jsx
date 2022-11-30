import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { setUser } from '../../store/slices/userSlice'

import AuthForm from '../AuthForm'

export default function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signInHandler = ({ email, password }) => {
    console.log(email, password)
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
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

  return <AuthForm title="Sign in" submit={signInHandler} />
}
