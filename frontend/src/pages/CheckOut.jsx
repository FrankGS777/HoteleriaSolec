import { useState, useEffect } from 'react'
import { Search, LogOut, Calendar, DollarSign } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import { huespedesAPI } from '../services/api'

const CheckOut = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [checkoutsPendientes, setCheckoutsPendientes] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    fetchCheckouts()
  }, [])

  const fetchCheckouts = async () => {
    try {
      setLoading(true)
      const response = await huespedesAPI.getActivos()
      // Filter huespedes whose checkout date is today or earlier
      const today = new Date().toISOString().split('T')[0]
      const pendientes = (response.data.data || []).filter(h => 
        h.fechaSalida && h.fechaSalida <= today
      )
      setCheckoutsPendientes(pendientes)
    } catch (error) {
      toast.error('Error al cargar check-outs pendientes')
      console.error('Error fetching checkouts:', error)
    } finally {
      setLoading(false)
    }
  }

  const getClienteNombre = (checkout) => {
    if (!checkout?.cliente) return 'Sin cliente'
    return typeof checkout.cliente === 'string' ? checkout.cliente : checkout.cliente.nombreCompleto || checkout.cliente.nombre || 'Sin cliente'
  }

  const getHabitacionNumero = (checkout) => {
    if (!checkout?.habitacion) return 'N/A'
    return typeof checkout.habitacion === 'string' ? checkout.habitacion : checkout.habitacion.numero || 'N/A'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Check-Out de Huéspedes</h2>
          <p className="text-gray-600 mt-1">Proceso de salida de huéspedes del hotel</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={20} />
          <span>Hoy: {new Date().toLocaleDateString('es-PE')}</span>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por habitación, cliente o documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Check-outs Pendientes Hoy</div>
          <div className="text-2xl font-bold text-yellow-600">2</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Check-outs Completados Hoy</div>
          <div className="text-2xl font-bold text-green-600">1</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <DollarSign className="text-gold-600" size={20} />
            <div className="text-sm text-gray-600">Pendiente de Cobro</div>
          </div>
          <div className="text-2xl font-bold text-gold-600">S/ 120</div>
        </div>
      </div>

      {/* Check-outs Pendientes */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Huéspedes Pendientes de Check-Out</h3>
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Cargando check-outs...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {checkoutsPendientes.map((checkout) => (
            <div key={checkout.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl font-bold text-primary-600">Hab. {getHabitacionNumero(checkout)}</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                      PENDIENTE CHECK-OUT
                    </span>
                    {checkout.saldo > 0 && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                        SALDO PENDIENTE
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Información del Huésped</h4>
                      <p className="font-medium text-gray-900">{getClienteNombre(checkout)}</p>
                      <p className="text-sm text-gray-500">DNI: {checkout.cliente?.dni || checkout.documento || 'N/A'}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Estadía: {checkout.diasEstadia || 'N/A'} día(s) | Servicios: {checkout.serviciosConsumidos || 0}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Resumen Financiero</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Alojamiento:</span>
                          <span className="font-medium">S/ {checkout.montoAlojamiento || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Servicios:</span>
                          <span className="font-medium">S/ {checkout.montoServicios || 0}</span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span className="text-gray-600">Total:</span>
                          <span className="font-bold text-gray-900">S/ {checkout.montoTotal || 0}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Pagado:</span>
                          <span className="font-medium">S/ {checkout.pagado || 0}</span>
                        </div>
                        {(checkout.saldo || 0) > 0 && (
                          <div className="flex justify-between text-red-600 font-bold">
                            <span>Saldo:</span>
                            <span>S/ {checkout.saldo}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex flex-col gap-2">
                  <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
                    <LogOut size={20} />
                    Realizar Check-Out
                  </button>
                  <button className="btn-secondary text-sm">
                    Ver Factura
                  </button>
                  {(checkout.saldo || 0) > 0 && (
                    <button className="bg-gold-600 hover:bg-gold-700 text-white font-medium py-2 px-4 rounded-lg text-sm">
                      Registrar Pago
                    </button>
                  )}
                </div>
              </div>
            </div>
            ))}

            {checkoutsPendientes.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <LogOut size={48} className="mx-auto mb-4 text-gray-400" />
                <p>No hay check-outs pendientes para hoy</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckOut
