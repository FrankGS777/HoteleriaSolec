import { useState, useEffect } from 'react'
import { Search, UserCheck, Phone, Mail } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import { huespedesAPI } from '../services/api'

const Huespedes = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [huespedesActivos, setHuespedesActivos] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    fetchHuespedes()
  }, [])

  const fetchHuespedes = async () => {
    try {
      setLoading(true)
      const response = await huespedesAPI.getActivos()
      setHuespedesActivos(response.data.data || [])
    } catch (error) {
      toast.error('Error al cargar huéspedes activos')
      console.error('Error fetching huespedes:', error)
    } finally {
      setLoading(false)
    }
  }

  const getClienteNombre = (huesped) => {
    if (!huesped?.cliente) return 'Sin cliente'
    return typeof huesped.cliente === 'string' ? huesped.cliente : huesped.cliente.nombreCompleto || huesped.cliente.nombre || 'Sin cliente'
  }

  const getHabitacionInfo = (huesped) => {
    if (!huesped?.habitacion) return { numero: 'N/A', tipo: 'N/A' }
    if (typeof huesped.habitacion === 'string') return { numero: huesped.habitacion, tipo: 'N/A' }
    return {
      numero: huesped.habitacion.numero || 'N/A',
      tipo: huesped.habitacion.tipoHabitacion?.nombre || huesped.habitacion.tipo || 'N/A'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Huéspedes Activos</h2>
          <p className="text-gray-600 mt-1">Lista de huéspedes actualmente alojados en el hotel</p>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre, documento o habitación..."
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
            <UserCheck className="text-blue-600" size={20} />
            <div className="text-sm text-gray-600">Huéspedes Activos</div>
          </div>
          <div className="text-2xl font-bold text-blue-600">3</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Check-outs Hoy</div>
          <div className="text-2xl font-bold text-yellow-600">0</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Check-outs Mañana</div>
          <div className="text-2xl font-bold text-orange-600">1</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Total Personas</div>
          <div className="text-2xl font-bold text-gray-900">6</div>
        </div>
      </div>

      {/* Huéspedes Grid */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-gray-600">Cargando huéspedes...</p>
        </div>
      ) : huespedesActivos.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">
          <UserCheck size={48} className="mx-auto mb-4 text-gray-400" />
          <p>No hay huéspedes actualmente alojados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {huespedesActivos.map((huesped) => {
            const nombre = getClienteNombre(huesped)
            const habitacion = getHabitacionInfo(huesped)
            return (
              <div key={huesped.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {nombre.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{nombre}</h3>
                      <p className="text-sm text-gray-500">DNI: {huesped.cliente?.dni || huesped.documento || 'N/A'}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-primary-600">Hab. {habitacion.numero}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium">{habitacion.tipo}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Entrada - Salida:</span>
                    <span className="font-medium">{huesped.fechaEntrada || 'N/A'} / {huesped.fechaSalida || 'N/A'}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Días restantes:</span>
                    <span className={`font-bold ${
                      (huesped.diasRestantes || 0) <= 1 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {huesped.diasRestantes || 0} día(s)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Acompañantes:</span>
                    <span className="font-medium">{huesped.numAcompanantes || 0}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Servicios consumidos:</span>
                    <span className="font-medium">{huesped.serviciosConsumidos || 0}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-200 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} />
                      <span>{huesped.cliente?.telefono || huesped.telefono || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={16} />
                      <span>{huesped.cliente?.email || huesped.email || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 btn-secondary text-sm">
                    Ver Detalles
                  </button>
                  <button className="flex-1 btn-primary text-sm">
                    Servicios
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Huespedes
