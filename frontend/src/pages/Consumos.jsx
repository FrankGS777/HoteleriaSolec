import { useState } from 'react'
import { Plus, Search, ShoppingCart } from 'lucide-react'

const Consumos = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const consumos = [
    {
      id: 1,
      fecha: '2024-12-03 10:30',
      habitacion: '201',
      cliente: 'Juan Pérez',
      servicio: 'Desayuno Buffet',
      cantidad: 2,
      precioUnitario: 25,
      total: 50,
      estado: 'REGISTRADO'
    },
    {
      id: 2,
      fecha: '2024-12-03 14:15',
      habitacion: '303',
      cliente: 'Carlos López',
      servicio: 'Spa y Masajes',
      cantidad: 1,
      precioUnitario: 80,
      total: 80,
      estado: 'REGISTRADO'
    },
    {
      id: 3,
      fecha: '2024-12-03 20:45',
      habitacion: '105',
      cliente: 'María García',
      servicio: 'Servicio de Habitación',
      cantidad: 1,
      precioUnitario: 15,
      total: 15,
      estado: 'REGISTRADO'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Consumos de Servicios</h2>
          <p className="text-gray-600 mt-1">Registro de servicios consumidos por los huéspedes</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Registrar Consumo
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por habitación, cliente o servicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-blue-600" size={20} />
            <div className="text-sm text-gray-600">Consumos Hoy</div>
          </div>
          <div className="text-2xl font-bold text-blue-600">3</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Ingresos por Servicios Hoy</div>
          <div className="text-2xl font-bold text-green-600">S/ 145</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Servicio Más Consumido</div>
          <div className="text-sm font-bold text-gray-900">Desayuno</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Total Mes</div>
          <div className="text-2xl font-bold text-gold-600">S/ 4,280</div>
        </div>
      </div>

      {/* Consumos Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Habitación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P. Unitario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {consumos.map((consumo) => (
                <tr key={consumo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {consumo.fecha}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-primary-600">
                      Hab. {consumo.habitacion}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {consumo.cliente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {consumo.servicio}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {consumo.cantidad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    S/ {consumo.precioUnitario}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    S/ {consumo.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900">
                      Ver Detalle
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

export default Consumos
