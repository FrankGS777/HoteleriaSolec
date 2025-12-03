import { useState } from 'react'
import { Plus, Search, CreditCard, DollarSign } from 'lucide-react'

const Pagos = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const pagos = [
    {
      id: 1,
      fecha: '2024-12-03 10:30',
      factura: 'F001-00123',
      cliente: 'Juan Pérez García',
      monto: 885,
      metodoPago: 'Tarjeta de Crédito',
      referencia: 'VISA-****1234',
      estado: 'COMPLETADO'
    },
    {
      id: 2,
      fecha: '2024-12-03 14:15',
      factura: 'F001-00124',
      cliente: 'María López Sánchez',
      monto: 300,
      metodoPago: 'Efectivo',
      referencia: '-',
      estado: 'COMPLETADO'
    },
    {
      id: 3,
      fecha: '2024-12-02 16:45',
      factura: 'F001-00125',
      cliente: 'Carlos Rodríguez Pérez',
      monto: 1416,
      metodoPago: 'Transferencia Bancaria',
      referencia: 'TRF-789456',
      estado: 'COMPLETADO'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pagos</h2>
          <p className="text-gray-600 mt-1">Registro de pagos recibidos</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Registrar Pago
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por factura, cliente o referencia..."
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
            <DollarSign className="text-green-600" size={20} />
            <div className="text-sm text-gray-600">Pagos Hoy</div>
          </div>
          <div className="text-2xl font-bold text-green-600">2</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Total Recaudado Hoy</div>
          <div className="text-2xl font-bold text-green-600">S/ 1,185</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <CreditCard className="text-blue-600" size={20} />
            <div className="text-sm text-gray-600">Método Más Usado</div>
          </div>
          <div className="text-sm font-bold text-gray-900">Tarjeta</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Total Mes</div>
          <div className="text-2xl font-bold text-gold-600">S/ 42,500</div>
        </div>
      </div>

      {/* Pagos Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Factura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método de Pago
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referencia
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
              {pagos.map((pago) => (
                <tr key={pago.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {pago.fecha}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-primary-600">
                      {pago.factura}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pago.cliente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                    S/ {pago.monto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-900">{pago.metodoPago}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {pago.referencia}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {pago.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900">
                      Ver Comprobante
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

export default Pagos
