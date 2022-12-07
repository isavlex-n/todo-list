import React, { useContext } from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'

import { AuthContext } from '../../context/Auth'

export default function PrivateRoute() {
  const { currentUser } = useContext(AuthContext)
  const { pathname } = useLocation()

  return !!currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: pathname }} replace />
  )
}
