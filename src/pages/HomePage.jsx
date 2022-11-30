import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth } from '../hooks/use-auth'
import { removeUser } from '../store/slices/userSlice'
import TodoList from '../components/TodoList'

const HomePage = () => {
  const dispatch = useDispatch()

  const { isAuth, email } = useAuth()

  return isAuth ? (
    <div>
      <header className="text-right header">
        <button
          className="button button_red"
          onClick={() => dispatch(removeUser())}
        >
          Log out from {email}
        </button>
      </header>
      <TodoList />
    </div>
  ) : (
    <Navigate to="/login" />
  )
}

export default HomePage
