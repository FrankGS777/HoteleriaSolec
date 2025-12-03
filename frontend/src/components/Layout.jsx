import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Home, 
  Hotel, 
  Calendar, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Habitaciones', href: '/habitaciones', icon: Hotel },
    { name: 'Reservas', href: '/reservas', icon: Calendar },
    { name: 'Clientes', href: '/clientes', icon: Users },
    { name: 'Facturación', href: '/facturacion', icon: FileText },
    { name: 'Configuración', href: '/configuracion', icon: Settings },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-primary-800 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold">Hotel Solec</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-primary-700 rounded-lg"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-primary-700 text-white'
                  : 'text-primary-100 hover:bg-primary-700'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && (
                <span className="ml-3">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-primary-700">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-primary-100 hover:bg-primary-700 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="ml-3">Cerrar Sesión</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              {navigation.find(item => isActive(item.href))?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.nombreCompleto}
                </p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.nombreCompleto?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
