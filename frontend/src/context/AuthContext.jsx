import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      try {
        const userData = JSON.parse(localStorage.getItem('user') || '{}')
        setUser(userData)
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setToken(null)
      }
    }
    setLoading(false)
  }, [token])

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password
      })
      
      if (response.data.success) {
        const { token, username, nombreCompleto, role, email } = response.data.data
        const userData = { username, nombreCompleto, role, email }
        
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        setToken(token)
        setUser(userData)
        
        return { success: true }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Error al iniciar sesión'
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
