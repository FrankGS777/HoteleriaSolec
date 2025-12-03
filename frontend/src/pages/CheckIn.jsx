import { useState } from 'react'
import { Search, UserCheck, Calendar } from 'lucide-react'

const CheckIn = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - Reservas pendientes de check-in
  const reservasPendientes = [
    {
      id: 1,
      codigo: 'RES-001',
      cliente: 'Juan Pérez García',
      documento: '12345678',
      habitacion: '201',
      tipo: 'Doble',
      fechaEntrada: '2024-12-03',
      fechaSalida: '2024-12-06',
      numHuespedes: 2,
      observaciones: 'Cliente VIP'
    },
    {
      id: 2,
      codigo: 'RES-004',
      cliente: 'María López Sánchez',
      documento: '87654321',
      habitacion: '105',
      tipo: 'Simple',
      fechaEntrada: '2024-12-03',
      fechaSalida: '2024-12-05',
      numHuespedes: 1,
      observaciones: null
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Check-In de Huéspedes</h2>
          <p className="text-gray-600 mt-1">Proceso de entrada de huéspedes al hotel</p>
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
            placeholder="Buscar por código de reserva, cliente o documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Check-ins Pendientes Hoy</div>
          <div className="text-2xl font-bold text-yellow-600">2</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Check-ins Completados Hoy</div>
          <div className="text-2xl font-bold text-green-600">3</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Check-ins Tarde</div>
          <div className="text-2xl font-bold text-red-600">0</div>
        </div>
      </div>

      {/* Reservas Pendientes */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Reservas Pendientes de Check-In</h3>
        <div className="space-y-4">
          {reservasPendientes.map((reserva) => (
            <div key={reserva.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-lg font-bold text-gray-900">{reserva.codigo}</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                      PENDIENTE
                    </span>
                    {reserva.observaciones && (
                      <span className="px-2 py-1 bg-gold-100 text-gold-800 text-xs font-semibold rounded-full">
                        VIP
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Cliente</p>
                      <p className="font-medium text-gray-900">{reserva.cliente}</p>
                      <p className="text-sm text-gray-500">DNI: {reserva.documento}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Habitación</p>
                      <p className="font-medium text-gray-900">Hab. {reserva.habitacion}</p>
                      <p className="text-sm text-gray-500">{reserva.tipo}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Estadía</p>
                      <p className="font-medium text-gray-900">{reserva.fechaEntrada} - {reserva.fechaSalida}</p>
                      <p className="text-sm text-gray-500">{reserva.numHuespedes} huésped(es)</p>
                    </div>
                  </div>

                  {reserva.observaciones && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <strong>Observaciones:</strong> {reserva.observaciones}
                      </p>
                    </div>
                  )}
                </div>

                <div className="ml-6 flex flex-col gap-2">
                  <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
                    <UserCheck size={20} />
                    Realizar Check-In
                  </button>
                  <button className="btn-secondary text-sm">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reservasPendientes.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <UserCheck size={48} className="mx-auto mb-4 text-gray-400" />
            <p>No hay reservas pendientes de check-in para hoy</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckIn
