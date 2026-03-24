import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, register as apiRegister, logout as apiLogout, getProfile } from '../api/endpoints'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('tracy-shop:token')
    if (token) {
      getProfile()
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem('tracy-shop:token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (credentials) => {
    const res = await apiLogin(credentials)
    localStorage.setItem('tracy-shop:token', res.data.token)
    setUser(res.data.user)
    return res.data.user
  }

  const register = async (data) => {
    const res = await apiRegister(data)
    localStorage.setItem('tracy-shop:token', res.data.token)
    setUser(res.data.user)
    return res.data.user
  }

  const logout = async () => {
    await apiLogout().catch(() => {})
    localStorage.removeItem('tracy-shop:token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
