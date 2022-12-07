import SignUp from '../components/SignUp'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div  className="max-80">
      <h1>Register</h1>
      <SignUp />
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  )
}

export default RegisterPage
