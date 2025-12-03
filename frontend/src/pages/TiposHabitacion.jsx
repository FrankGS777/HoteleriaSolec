import { useState } from 'react'
import { Plus, Search, Bed } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'

const TiposHabitacion = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const tiposHabitacion = [
    {
      id: 1,
      nombre: 'Simple',
      descripcion: 'Habitación individual con cama simple',
      capacidadPersonas: 1,
      numeroCamas: 1,
      precioBase: 150,
      metrosCuadrados: 20,
      caracteristicas: 'TV, WiFi, Baño privado',
      cantidadHabitaciones: 8,
      activo: true
    },
    {
      id: 2,
      nombre: 'Doble',
      descripcion: 'Habitación con cama doble o dos camas',
      capacidadPersonas: 2,
      numeroCamas: 1,
      precioBase: 250,
      metrosCuadrados: 30,
      caracteristicas: 'TV, WiFi, Baño privado, Mini bar',
      cantidadHabitaciones: 10,
      activo: true
    },
    {
      id: 3,
      nombre: 'Suite',
      descripcion: 'Suite con sala de estar separada',
      capacidadPersonas: 3,
      numeroCamas: 2,
      precioBase: 450,
      metrosCuadrados: 50,
      caracteristicas: 'TV, WiFi, Baño privado, Mini bar, Jacuzzi',
      cantidadHabitaciones: 3,
      activo: true
    },
    {
      id: 4,
      nombre: 'Suite Presidencial',
      descripcion: 'Suite de lujo con todas las comodidades',
      capacidadPersonas: 4,
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
    </div>
  )
}

export default TiposHabitacion
