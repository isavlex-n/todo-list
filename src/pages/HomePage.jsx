import { Navigate } from 'react-router-dom'
import TodoList from '../components/TodoList'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { signOut, getAuth } from 'firebase/auth'

const HomePage = () => {
  const { email } = useContext(AuthContext)

  const logOut = () => {
    const auth = getAuth()
    signOut(auth)
  }

  return (
    <div>
      <header className="text-right header">
        <button className="button button_red" onClick={() => logOut()}>
          Log out from {email}
        </button>
      </header>
      <TodoList />
    </div>
  )
}

export default HomePage
