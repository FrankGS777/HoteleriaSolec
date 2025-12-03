import { useState } from 'react'
import { Plus, Search, UserCheck } from 'lucide-react'

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const clientes = [
    {
      id: 1,
      nombre: 'Juan Pérez García',
      tipoDocumento: 'DNI',
      numeroDocumento: '12345678',
      email: 'juan.perez@example.com',
      telefono: '987654321',
      esVip: true,
      totalReservas: 5
    },
    {
      id: 2,
      nombre: 'María García López',
      tipoDocumento: 'DNI',
      numeroDocumento: '87654321',
      email: 'maria.garcia@example.com',
      telefono: '987654322',
      esVip: false,
      totalReservas: 2
    },
    {
      id: 3,
      nombre: 'Carlos López Martínez',
      tipoDocumento: 'PASAPORTE',
      numeroDocumento: 'P1234567',
      email: 'carlos.lopez@example.com',
      telefono: '987654323',
      esVip: true,
      totalReservas: 8
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clientes</h2>
          <p className="text-gray-600 mt-1">Gestión de clientes del hotel</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nuevo Cliente
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre, documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Total Clientes</div>
          <div className="text-2xl font-bold text-gray-900">3</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <UserCheck className="text-gold-600" size={20} />
            <div className="text-sm text-gray-600">Clientes VIP</div>
          </div>
          <div className="text-2xl font-bold text-gold-600">2</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Nuevos este mes</div>
          <div className="text-2xl font-bold text-green-600">1</div>
        </div>
      </div>

      {/* Clientes Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reservas
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
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {cliente.nombre.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {cliente.nombre}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{cliente.tipoDocumento}</div>
                    <div className="text-sm text-gray-500">{cliente.numeroDocumento}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{cliente.email}</div>
                    <div className="text-sm text-gray-500">{cliente.telefono}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cliente.totalReservas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.esVip ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gold-100 text-gold-800">
                        VIP
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Regular
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      Ver
                    </button>
                    <button className="text-primary-600 hover:text-primary-900">
                      Editar
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

export default Clientes
