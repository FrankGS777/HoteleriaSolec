import { useState, useEffect } from 'react'
import { Plus, Search, Bed } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'
import { useToast } from '../hooks/useToast'
import { tiposHabitacionAPI } from '../services/api'

const TiposHabitacion = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [tiposHabitacion, setTiposHabitacion] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    fetchTiposHabitacion()
  }, [])

  const fetchTiposHabitacion = async () => {
    try {
      setLoading(true)
      const response = await tiposHabitacionAPI.getAll()
      setTiposHabitacion(response.data.data || [])
    } catch (error) {
      toast.error('Error al cargar tipos de habitación')
      console.error('Error fetching tipos habitacion:', error)
    } finally {
      setLoading(false)
    }
  }
      numeroCamas: 2,
      precioBase: 800,
      metrosCuadrados: 80,
      caracteristicas: 'TV, WiFi, Baño privado, Mini bar, Jacuzzi, Sala de estar, Cocina',
      cantidadHabitaciones: 1,
      activo: true
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tipos de Habitación</h2>
          <p className="text-gray-600 mt-1">Gestión de tipos y categorías de habitaciones</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nuevo Tipo
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar tipos de habitación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Tipos Activos</div>
          <div className="text-2xl font-bold text-gray-900">4</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Total Habitaciones</div>
          <div className="text-2xl font-bold text-blue-600">22</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Precio Promedio</div>
          <div className="text-2xl font-bold text-gold-600">S/ 413</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Tipo Más Popular</div>
          <div className="text-sm font-bold text-gray-900">Doble</div>
        </div>
      </div>

      {/* Tipos Grid */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-gray-600">Cargando tipos de habitación...</p>
        </div>
      ) : tiposHabitacion.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No se encontraron tipos de habitación</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiposHabitacion.map((tipo) => (
          <div key={tipo.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Bed className="text-primary-600" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{tipo.nombre}</h3>
                  <p className="text-sm text-gray-500">{tipo.cantidadHabitaciones} habitaciones</p>
                </div>
              </div>
              <StatusBadge status={tipo.activo ? 'ACTIVO' : 'INACTIVO'} />
            </div>

            <p className="text-sm text-gray-600 mb-4">{tipo.descripcion}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600">Capacidad</p>
                <p className="font-medium">{tipo.capacidadPersonas} persona(s)</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Camas</p>
                <p className="font-medium">{tipo.numeroCamas} cama(s)</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Área</p>
                <p className="font-medium">{tipo.metrosCuadrados} m²</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Precio Base</p>
                <p className="font-bold text-gold-600">S/ {tipo.precioBase}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-2">Características</p>
              <p className="text-sm text-gray-900">{tipo.caracteristicas}</p>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 btn-secondary text-sm">
                Editar
              </button>
              <button className="flex-1 btn-primary text-sm">
                Ver Habitaciones
              </button>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TiposHabitacion
