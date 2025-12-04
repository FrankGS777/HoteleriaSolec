import { useState, useEffect } from 'react'
import { Plus, Search, FileText, Download } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'
import { useToast } from '../hooks/useToast'
import { facturasAPI } from '../services/api'

const Facturas = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [facturas, setFacturas] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    fetchFacturas()
  }, [])

  const fetchFacturas = async () => {
    try {
      setLoading(true)
      const response = await facturasAPI.getAll()
      setFacturas(response.data.data || [])
    } catch (error) {
      toast.error('Error al cargar facturas')
      console.error('Error fetching facturas:', error)
    } finally {
      setLoading(false)
    }
  }

  const getClienteNombre = (factura) => {
    if (!factura?.reserva?.cliente) return 'Sin cliente'
    const cliente = factura.reserva.cliente
    return typeof cliente === 'string' ? cliente : cliente.nombreCompleto || cliente.nombre || 'Sin cliente'
  }

  const getClienteDocumento = (factura) => {
    if (!factura?.reserva?.cliente) return 'N/A'
    const cliente = factura.reserva.cliente
    return typeof cliente === 'string' ? 'N/A' : cliente.dni || cliente.documento || 'N/A'
  }

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
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Cargando facturas...</p>
          </div>
        ) : facturas.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No se encontraron facturas</p>
          </div>
        ) : (
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
                        {factura.numeroFactura || factura.numero || `F-${factura.id}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {factura.fechaEmision || factura.fecha || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{getClienteNombre(factura)}</div>
                      <div className="text-sm text-gray-500">{getClienteDocumento(factura)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      S/ {factura.subtotal || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      S/ {factura.igv || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      S/ {factura.montoTotal || factura.total || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {(factura.saldo || 0) > 0 ? (
                        <span className="font-semibold text-red-600">S/ {factura.saldo}</span>
                      ) : (
                        <span className="text-green-600">S/ 0</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge 
                        status={factura.estado || 'PENDIENTE'}
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
        )}
      </div>
    </div>
  )
}

export default Facturas
