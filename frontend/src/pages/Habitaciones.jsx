import { useState, useEffect } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import { habitacionesAPI } from '../services/api'

const Habitaciones = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [habitaciones, setHabitaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    fetchHabitaciones()
  }, [])

  const fetchHabitaciones = async () => {
    try {
      setLoading(true)
      const response = await habitacionesAPI.getAll()
      setHabitaciones(response.data.data || [])
    } catch (error) {
      toast.error('Error al cargar habitaciones')
      console.error('Error fetching habitaciones:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTipoHabitacion = (habitacion) => {
    if (!habitacion?.tipoHabitacion) return 'Sin tipo'
    return typeof habitacion.tipoHabitacion === 'string' ? habitacion.tipoHabitacion : habitacion.tipoHabitacion.nombre || 'Sin tipo'
  }

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'DISPONIBLE':
        return 'bg-green-100 text-green-800'
      case 'OCUPADA':
        return 'bg-red-100 text-red-800'
      case 'LIMPIEZA':
        return 'bg-yellow-100 text-yellow-800'
      case 'MANTENIMIENTO':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Habitaciones</h2>
          <p className="text-gray-600 mt-1">Gestión de habitaciones del hotel</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nueva Habitación
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por número o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={20} />
            Filtros
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Disponibles</div>
          <div className="text-2xl font-bold text-green-600">3</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Ocupadas</div>
          <div className="text-2xl font-bold text-red-600">2</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">En Mantenimiento</div>
          <div className="text-2xl font-bold text-orange-600">1</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Total</div>
          <div className="text-2xl font-bold text-gray-900">6</div>
        </div>
      </div>

      {/* Habitaciones Grid */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-gray-600">Cargando habitaciones...</p>
        </div>
      ) : habitaciones.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No se encontraron habitaciones</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habitaciones.map((habitacion) => (
            <div key={habitacion.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Hab. {habitacion.numero}
                  </h3>
                  <p className="text-sm text-gray-600">{getTipoHabitacion(habitacion)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(habitacion.estado)}`}>
                  {habitacion.estado}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Piso:</span>
                  <span className="font-medium">{habitacion.piso}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Limpieza:</span>
                  <span className="font-medium">{habitacion.estadoLimpieza || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Precio:</span>
                  <span className="font-bold text-gold-600">S/ {habitacion.precioBase || habitacion.precio || 0}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 btn-secondary text-sm py-2">
                  Ver Detalles
                </button>
                <button className="flex-1 btn-primary text-sm py-2">
                  Reservar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Habitaciones
