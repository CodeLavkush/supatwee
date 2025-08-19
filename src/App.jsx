import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { login, logout } from './store/userSlice'
import { client } from './api/client'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // restore session on app start
    const initSession = async () => {
      const { data: { session } } = await client.auth.getSession()
      if (session?.user) {
        dispatch(login(session.user))
      }
    }
    initSession()

    // keep Redux in sync with auth state changes
    const { data: { subscription } } = client.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          dispatch(login(session.user))
        } else {
          dispatch(logout())
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [dispatch])

  return (
    <Outlet/>
  )
}

export default App
