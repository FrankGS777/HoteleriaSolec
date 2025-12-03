import { Hotel, Users, Calendar, DollarSign } from 'lucide-react'

const Dashboard = () => {
  // Mock data - En producción, estos datos vendrían de la API
  const stats = [
    {
      name: 'Habitaciones Ocupadas',
      value: '18 / 22',
      percentage: '82%',
      icon: Hotel,
      color: 'bg-blue-500'
    },
    {
      name: 'Reservas Hoy',
      value: '5',
      change: '+2',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      name: 'Clientes Activos',
      value: '34',
      change: '+7',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      name: 'Ingresos del Mes',
      value: 'S/ 45,280',
      change: '+15%',
      icon: DollarSign,
      color: 'bg-gold-500'
    }
  ]

  const recentReservations = [
    { id: 1, cliente: 'Juan Pérez', habitacion: '201', checkin: '2024-12-03', estado: 'Confirmada' },
    { id: 2, cliente: 'María García', habitacion: '105', checkin: '2024-12-04', estado: 'Pendiente' },
    { id: 3, cliente: 'Carlos López', habitacion: '303', checkin: '2024-12-03', estado: 'Check-in' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.change && (
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                )}
                {stat.percentage && (
                  <p className="text-sm text-gray-500 mt-1">{stat.percentage}</p>
                )}
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reservations */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Reservas Recientes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Habitación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-in
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentReservations.map((reserva) => (
                <tr key={reserva.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reserva.cliente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reserva.habitacion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reserva.checkin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${reserva.estado === 'Confirmada' ? 'bg-green-100 text-green-800' : ''}
                      ${reserva.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${reserva.estado === 'Check-in' ? 'bg-blue-100 text-blue-800' : ''}
                    `}>
                      {reserva.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="card hover:shadow-lg transition-shadow cursor-pointer text-left">
          <Calendar className="text-primary-600 mb-2" size={32} />
          <h3 className="text-lg font-semibold mb-1">Nueva Reserva</h3>
          <p className="text-sm text-gray-600">Crear una nueva reserva de habitación</p>
        </button>
        
        <button className="card hover:shadow-lg transition-shadow cursor-pointer text-left">
          <Users className="text-green-600 mb-2" size={32} />
          <h3 className="text-lg font-semibold mb-1">Check-in</h3>
          <p className="text-sm text-gray-600">Registrar entrada de huéspedes</p>
        </button>
        
        <button className="card hover:shadow-lg transition-shadow cursor-pointer text-left">
          <DollarSign className="text-gold-600 mb-2" size={32} />
          <h3 className="text-lg font-semibold mb-1">Facturación</h3>
          <p className="text-sm text-gray-600">Generar y gestionar facturas</p>
        </button>
      </div>
    </div>
  )
}

export default Dashboard
