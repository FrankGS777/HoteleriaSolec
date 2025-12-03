import { useState } from 'react'
import { Plus, Search, Coffee, Utensils, Wind } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'

const Servicios = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const servicios = [
    {
      id: 1,
      nombre: 'Desayuno Buffet',
      categoria: 'Restaurante',
      descripcion: 'Desayuno buffet completo',
      precio: 25,
      activo: true,
      icon: Utensils
    },
    {
      id: 2,
      nombre: 'Servicio de Habitación',
      categoria: 'Room Service',
      descripcion: 'Comida en habitación 24/7',
      precio: 15,
      activo: true,
      icon: Coffee
    },
    {
      id: 3,
      nombre: 'Lavandería Express',
      categoria: 'Lavandería',
      descripcion: 'Servicio de lavado rápido',
      precio: 30,
      activo: true,
      icon: Wind
    },
    {
      id: 4,
      nombre: 'Spa y Masajes',
      categoria: 'Spa',
      descripcion: 'Masajes relajantes',
      precio: 80,
      activo: true,
      icon: Wind
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Servicios del Hotel</h2>
          <p className="text-gray-600 mt-1">Gestión de servicios disponibles para los huéspedes</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nuevo Servicio
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Total Servicios</div>
          <div className="text-2xl font-bold text-gray-900">4</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Activos</div>
          <div className="text-2xl font-bold text-green-600">4</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Categorías</div>
          <div className="text-2xl font-bold text-blue-600">4</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Precio Promedio</div>
          <div className="text-2xl font-bold text-gold-600">S/ 38</div>
        </div>
      </div>

      {/* Servicios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicios.map((servicio) => {
          const Icon = servicio.icon
          return (
            <div key={servicio.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Icon className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{servicio.nombre}</h3>
                    <span className="text-xs text-gray-500">{servicio.categoria}</span>
                  </div>
                </div>
                <StatusBadge status={servicio.activo ? 'ACTIVO' : 'INACTIVO'} />
              </div>

              <p className="text-sm text-gray-600 mb-4">{servicio.descripcion}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-600">Precio</p>
                  <p className="text-2xl font-bold text-gold-600">S/ {servicio.precio}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary text-sm py-2">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Servicios
