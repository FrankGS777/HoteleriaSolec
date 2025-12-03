import { useState } from 'react'
import { Search, UserCheck, Phone, Mail } from 'lucide-react'

const Huespedes = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - Huéspedes actualmente alojados
  const huespedesActivos = [
    {
      id: 1,
      nombre: 'Juan Pérez García',
      documento: '12345678',
      habitacion: '201',
      tipoHabitacion: 'Doble',
      fechaEntrada: '2024-12-01',
      fechaSalida: '2024-12-05',
      diasRestantes: 2,
      telefono: '987654321',
      email: 'juan.perez@email.com',
      numAcompanantes: 1,
      serviciosConsumidos: 4
    },
    {
      id: 2,
      nombre: 'María López Sánchez',
      documento: '87654321',
      habitacion: '105',
      tipoHabitacion: 'Simple',
      fechaEntrada: '2024-12-02',
      fechaSalida: '2024-12-04',
      diasRestantes: 1,
      telefono: '987654322',
      email: 'maria.lopez@email.com',
      numAcompanantes: 0,
      serviciosConsumidos: 2
    },
    {
      id: 3,
      nombre: 'Carlos Rodríguez Pérez',
      documento: '45678912',
      habitacion: '303',
      tipoHabitacion: 'Suite',
      fechaEntrada: '2024-11-30',
      fechaSalida: '2024-12-07',
      diasRestantes: 4,
      telefono: '987654323',
      email: 'carlos.rodriguez@email.com',
      numAcompanantes: 2,
      serviciosConsumidos: 8
    }
  ]

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {huespedesActivos.map((huesped) => (
          <div key={huesped.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {huesped.nombre.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{huesped.nombre}</h3>
                  <p className="text-sm text-gray-500">DNI: {huesped.documento}</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-primary-600">Hab. {huesped.habitacion}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tipo:</span>
                <span className="font-medium">{huesped.tipoHabitacion}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Entrada - Salida:</span>
                <span className="font-medium">{huesped.fechaEntrada} / {huesped.fechaSalida}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Días restantes:</span>
                <span className={`font-bold ${
                  huesped.diasRestantes <= 1 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {huesped.diasRestantes} día(s)
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Acompañantes:</span>
                <span className="font-medium">{huesped.numAcompanantes}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Servicios consumidos:</span>
                <span className="font-medium">{huesped.serviciosConsumidos}</span>
              </div>

              <div className="pt-3 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} />
                  <span>{huesped.telefono}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} />
                  <span>{huesped.email}</span>
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
        ))}
      </div>

      {huespedesActivos.length === 0 && (
        <div className="card text-center py-12 text-gray-500">
          <UserCheck size={48} className="mx-auto mb-4 text-gray-400" />
          <p>No hay huéspedes actualmente alojados</p>
        </div>
      )}
    </div>
  )
}

export default Huespedes
