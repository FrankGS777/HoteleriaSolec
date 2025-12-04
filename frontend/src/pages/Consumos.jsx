import { useState, useEffect } from 'react'
import { Plus, Search, ShoppingCart } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import { consumosAPI } from '../services/api'

const Consumos = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [consumos, setConsumos] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    fetchConsumos()
  }, [])

  const fetchConsumos = async () => {
    try {
      setLoading(true)
      const response = await consumosAPI.getAll()
      setConsumos(response.data.data || [])
    } catch (error) {
      toast.error('Error al cargar consumos')
      console.error('Error fetching consumos:', error)
    } finally {
      setLoading(false)
    }
  }

  const getReservaNombre = (consumo) => {
    if (!consumo?.reserva) return 'Sin reserva'
    if (typeof consumo.reserva === 'string') return consumo.reserva
    const cliente = consumo.reserva.cliente
    if (!cliente) return 'Sin cliente'
    return typeof cliente === 'string' ? cliente : cliente.nombreCompleto || cliente.nombre || 'Sin cliente'
  }

  const getHabitacionNumero = (consumo) => {
    if (!consumo?.reserva) return 'N/A'
    if (typeof consumo.reserva === 'string') return consumo.reserva
    const habitacion = consumo.reserva.habitacion
    if (!habitacion) return 'N/A'
    return typeof habitacion === 'string' ? habitacion : habitacion.numero || 'N/A'
  }

  const getServicioNombre = (consumo) => {
    if (!consumo?.servicio) return 'Sin servicio'
    return typeof consumo.servicio === 'string' ? consumo.servicio : consumo.servicio.nombre || 'Sin servicio'
  }

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
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Cargando consumos...</p>
          </div>
        ) : consumos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No se encontraron consumos</p>
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
                      {consumo.fechaConsumo || consumo.fecha || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-primary-600">
                        Hab. {getHabitacionNumero(consumo)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getReservaNombre(consumo)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getServicioNombre(consumo)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {consumo.cantidad || 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      S/ {consumo.precioUnitario || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      S/ {consumo.total || consumo.monto || 0}
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
        )}
      </div>
    </div>
  )
}

export default Consumos
