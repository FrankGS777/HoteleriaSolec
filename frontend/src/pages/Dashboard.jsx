import { useState, useEffect } from 'react'
import { Hotel, Users, Calendar, DollarSign } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import { habitacionesAPI, reservasAPI, huespedesAPI } from '../services/api'

const Dashboard = () => {
  const [stats, setStats] = useState([
    { name: 'Habitaciones Ocupadas', value: '0 / 0', percentage: '0%', icon: Hotel, color: 'bg-blue-500' },
    { name: 'Reservas Hoy', value: '0', change: '0', icon: Calendar, color: 'bg-green-500' },
    { name: 'Clientes Activos', value: '0', change: '0', icon: Users, color: 'bg-purple-500' },
    { name: 'Ingresos del Mes', value: 'S/ 0', change: '0%', icon: DollarSign, color: 'bg-gold-500' }
  ])
  const [recentReservations, setRecentReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch all data in parallel
      const [habitacionesRes, reservasRes, huespedesRes] = await Promise.all([
        habitacionesAPI.getAll().catch(() => ({ data: { data: [] } })),
        reservasAPI.getAll().catch(() => ({ data: { data: [] } })),
        huespedesAPI.getActivos().catch(() => ({ data: { data: [] } }))
      ])

      const habitaciones = habitacionesRes.data.data || []
      const reservas = reservasRes.data.data || []
      const huespedes = huespedesRes.data.data || []

      // Calculate stats
      const ocupadas = habitaciones.filter(h => h.estado === 'OCUPADA').length
      const total = habitaciones.length
      const percentage = total > 0 ? Math.round((ocupadas / total) * 100) : 0

      const today = new Date().toISOString().split('T')[0]
      const reservasHoy = reservas.filter(r => r.fechaEntrada === today).length

      const ingresosMes = reservas
        .filter(r => r.estado === 'COMPLETADA')
        .reduce((sum, r) => sum + (r.montoTotal || 0), 0)

      setStats([
        { name: 'Habitaciones Ocupadas', value: `${ocupadas} / ${total}`, percentage: `${percentage}%`, icon: Hotel, color: 'bg-blue-500' },
        { name: 'Reservas Hoy', value: `${reservasHoy}`, change: `+${reservasHoy}`, icon: Calendar, color: 'bg-green-500' },
        { name: 'Clientes Activos', value: `${huespedes.length}`, change: `+${huespedes.length}`, icon: Users, color: 'bg-purple-500' },
        { name: 'Ingresos del Mes', value: `S/ ${ingresosMes.toLocaleString()}`, change: '+0%', icon: DollarSign, color: 'bg-gold-500' }
      ])

      // Get recent reservations (last 3)
      const recent = reservas.slice(0, 3)
      setRecentReservations(recent)
    } catch (error) {
      toast.error('Error al cargar datos del dashboard')
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getClienteNombre = (reserva) => {
    if (!reserva?.cliente) return 'Sin cliente'
    return typeof reserva.cliente === 'string' ? reserva.cliente : reserva.cliente.nombreCompleto || reserva.cliente.nombre || 'Sin cliente'
  }

  const getHabitacionNumero = (reserva) => {
    if (!reserva?.habitacion) return 'N/A'
    return typeof reserva.habitacion === 'string' ? reserva.habitacion : reserva.habitacion.numero || 'N/A'
  }

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
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Cargando datos...</p>
          </div>
        ) : recentReservations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No hay reservas recientes</p>
          </div>
        ) : (
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
                      {getClienteNombre(reserva)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getHabitacionNumero(reserva)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reserva.fechaEntrada || reserva.checkin || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${reserva.estado === 'CONFIRMADA' || reserva.estado === 'Confirmada' ? 'bg-green-100 text-green-800' : ''}
                        ${reserva.estado === 'PENDIENTE' || reserva.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : ''}
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
        )}
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
