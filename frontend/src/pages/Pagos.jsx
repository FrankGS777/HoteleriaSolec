import { useState, useEffect } from 'react'
import { Plus, Search, CreditCard, DollarSign } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import { pagosAPI } from '../services/api'

const Pagos = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [pagos, setPagos] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    fetchPagos()
  }, [])

  const fetchPagos = async () => {
    try {
      setLoading(true)
      const response = await pagosAPI.getAll()
      setPagos(response.data.data || [])
    } catch (error) {
      toast.error('Error al cargar pagos')
      console.error('Error fetching pagos:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFacturaNumero = (pago) => {
    if (!pago?.factura) return 'N/A'
    return typeof pago.factura === 'string' ? pago.factura : pago.factura.numeroFactura || pago.factura.numero || `F-${pago.factura.id}`
  }

  const getClienteNombre = (pago) => {
    if (!pago?.factura?.reserva?.cliente) return 'Sin cliente'
    const cliente = pago.factura.reserva.cliente
    return typeof cliente === 'string' ? cliente : cliente.nombreCompleto || cliente.nombre || 'Sin cliente'
  }

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
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Cargando pagos...</p>
          </div>
        ) : pagos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No se encontraron pagos</p>
          </div>
        ) : (
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
                      {pago.fechaPago || pago.fecha || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-primary-600">
                        {getFacturaNumero(pago)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getClienteNombre(pago)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                      S/ {pago.monto || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-900">{pago.metodoPago || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pago.numeroTransaccion || pago.referencia || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {pago.estado || 'COMPLETADO'}
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
        )}
      </div>
    </div>
  )
}

export default Pagos
