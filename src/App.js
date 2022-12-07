import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './App.css'
import { AuthProvider } from './context/Auth'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
