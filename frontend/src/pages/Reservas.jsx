import { useState } from 'react'
import { Plus, Search, Calendar as CalendarIcon } from 'lucide-react'

const Reservas = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const reservas = [
    {
      id: 1,
      codigo: 'RES-001',
      cliente: 'Juan Pérez',
      habitacion: '201',
      fechaEntrada: '2024-12-05',
      fechaSalida: '2024-12-08',
      estado: 'CONFIRMADA',
      monto: 750
    },
    {
      id: 2,
      codigo: 'RES-002',
      cliente: 'María García',
      habitacion: '105',
      fechaEntrada: '2024-12-06',
      fechaSalida: '2024-12-10',
      estado: 'PENDIENTE',
      monto: 600
    },
    {
      id: 3,
      codigo: 'RES-003',
      cliente: 'Carlos López',
      habitacion: '303',
      fechaEntrada: '2024-12-03',
      fechaSalida: '2024-12-07',
      estado: 'COMPLETADA',
      monto: 1800
    },
  ]

  const getEstadoBadge = (estado) => {
    const colors = {
      PENDIENTE: 'bg-yellow-100 text-yellow-800',
      CONFIRMADA: 'bg-green-100 text-green-800',
      COMPLETADA: 'bg-blue-100 text-blue-800',
      CANCELADA: 'bg-red-100 text-red-800'
    }
    return colors[estado] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reservas</h2>
          <p className="text-gray-600 mt-1">Gestión de reservas del hotel</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nueva Reserva
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por código, cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <CalendarIcon size={20} />
            Ver Calendario
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Pendientes</div>
          <div className="text-2xl font-bold text-yellow-600">1</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Confirmadas</div>
          <div className="text-2xl font-bold text-green-600">1</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Completadas</div>
          <div className="text-2xl font-bold text-blue-600">1</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Ingresos Estimados</div>
          <div className="text-2xl font-bold text-gold-600">S/ 3,150</div>
        </div>
      </div>

      {/* Reservas Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Habitación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entrada
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salida
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
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
              {reservas.map((reserva) => (
                <tr key={reserva.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reserva.codigo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reserva.cliente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reserva.habitacion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reserva.fechaEntrada}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reserva.fechaSalida}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    S/ {reserva.monto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoBadge(reserva.estado)}`}>
                      {reserva.estado}
                    </span>
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

export default Reservas
