import { useState } from 'react'
import { Plus, Search, Shield } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const usuarios = [
    {
      id: 1,
      username: 'admin',
      nombreCompleto: 'Administrador Sistema',
      email: 'admin@hotelsolec.com',
      role: 'ADMIN',
      activo: true,
      ultimoAcceso: '2024-12-03 14:30'
    },
    {
      id: 2,
      username: 'gerente01',
      nombreCompleto: 'Juan Carlos Pérez',
      email: 'gerente@hotelsolec.com',
      role: 'GERENTE',
      activo: true,
      ultimoAcceso: '2024-12-03 12:15'
    },
    {
      id: 3,
      username: 'recepcion01',
      nombreCompleto: 'María García López',
      email: 'recepcion@hotelsolec.com',
      role: 'RECEPCIONISTA',
      activo: true,
      ultimoAcceso: '2024-12-03 08:45'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Usuarios</h2>
          <p className="text-gray-600 mt-1">Gestión de usuarios del sistema (Solo Administradores)</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nuevo Usuario
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre, username o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Total Usuarios</div>
          <div className="text-2xl font-bold text-gray-900">3</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Activos</div>
          <div className="text-2xl font-bold text-green-600">3</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <Shield className="text-primary-600" size={20} />
            <div className="text-sm text-gray-600">Administradores</div>
          </div>
          <div className="text-2xl font-bold text-primary-600">1</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Conectados Hoy</div>
          <div className="text-2xl font-bold text-blue-600">3</div>
        </div>
      </div>

      {/* Usuarios Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Acceso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {usuario.nombreCompleto.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {usuario.nombreCompleto}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {usuario.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {usuario.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      {usuario.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {usuario.ultimoAcceso}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={usuario.activo ? 'ACTIVO' : 'INACTIVO'} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Usuarios
