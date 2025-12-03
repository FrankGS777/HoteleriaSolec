import { useState } from 'react'
import { Plus, Search, FileText, Download } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'

const Facturas = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const facturas = [
    {
      id: 1,
      numero: 'F001-00123',
      fecha: '2024-12-03',
      cliente: 'Juan Pérez García',
      documento: '12345678',
      subtotal: 750,
      igv: 135,
      total: 885,
      pagado: 885,
      saldo: 0,
      estado: 'PAGADA'
    },
    {
      id: 2,
      numero: 'F001-00124',
      fecha: '2024-12-03',
      cliente: 'María López Sánchez',
      documento: '87654321',
      subtotal: 500,
      igv: 90,
      total: 590,
      pagado: 300,
      saldo: 290,
      estado: 'PENDIENTE'
    },
    {
      id: 3,
      numero: 'F001-00125',
      fecha: '2024-12-02',
      cliente: 'Carlos Rodríguez Pérez',
      documento: '45678912',
      subtotal: 1200,
      igv: 216,
      total: 1416,
      pagado: 1416,
      saldo: 0,
      estado: 'PAGADA'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Facturas</h2>
          <p className="text-gray-600 mt-1">Gestión de facturas y comprobantes</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nueva Factura
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por número, cliente o documento..."
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
            <FileText className="text-blue-600" size={20} />
            <div className="text-sm text-gray-600">Facturas Hoy</div>
          </div>
          <div className="text-2xl font-bold text-blue-600">2</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Total Facturado Hoy</div>
          <div className="text-2xl font-bold text-green-600">S/ 1,475</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Pendientes de Cobro</div>
          <div className="text-2xl font-bold text-red-600">S/ 290</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Facturado Este Mes</div>
          <div className="text-2xl font-bold text-gold-600">S/ 45,280</div>
        </div>
      </div>

      {/* Facturas Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subtotal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IGV
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Saldo
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
              {facturas.map((factura) => (
                <tr key={factura.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-primary-600">
                      {factura.numero}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {factura.fecha}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{factura.cliente}</div>
                    <div className="text-sm text-gray-500">{factura.documento}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    S/ {factura.subtotal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    S/ {factura.igv}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    S/ {factura.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {factura.saldo > 0 ? (
                      <span className="font-semibold text-red-600">S/ {factura.saldo}</span>
                    ) : (
                      <span className="text-green-600">S/ 0</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      status={factura.estado}
                      type="reserva"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        Ver
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Download size={16} />
                      </button>
                    </div>
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

export default Facturas
