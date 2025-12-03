import { useState } from 'react'
import { Plus, Search, Sparkles } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'

const Limpieza = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const tareasLimpieza = [
    {
      id: 1,
      habitacion: '201',
      tipo: 'Doble',
      prioridad: 'ALTA',
      estado: 'PENDIENTE',
      empleado: null,
      tipoLimpieza: 'Limpieza de Salida',
      horaAsignada: '10:00',
      observaciones: 'Check-out programado'
    },
    {
      id: 2,
      habitacion: '105',
      tipo: 'Simple',
      prioridad: 'MEDIA',
      estado: 'EN_LIMPIEZA',
      empleado: 'Ana López',
      tipoLimpieza: 'Limpieza Diaria',
      horaAsignada: '09:30',
      horaInicio: '09:45',
      observaciones: null
    },
    {
      id: 3,
      habitacion: '303',
      tipo: 'Suite',
      prioridad: 'BAJA',
      estado: 'COMPLETADO',
      empleado: 'María García',
      tipoLimpieza: 'Limpieza Diaria',
      horaAsignada: '08:00',
      horaInicio: '08:15',
      horaFin: '09:30',
      observaciones: null
    }
  ]

  const getPrioridadColor = (prioridad) => {
    const colors = {
      ALTA: 'bg-red-100 text-red-800',
      MEDIA: 'bg-yellow-100 text-yellow-800',
      BAJA: 'bg-green-100 text-green-800'
    }
    return colors[prioridad] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Limpieza de Habitaciones</h2>
          <p className="text-gray-600 mt-1">Programación y seguimiento de tareas de housekeeping</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Asignar Tarea
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por habitación o empleado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Pendientes</div>
          <div className="text-2xl font-bold text-yellow-600">1</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">En Proceso</div>
          <div className="text-2xl font-bold text-blue-600">1</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Completadas Hoy</div>
          <div className="text-2xl font-bold text-green-600">1</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <Sparkles className="text-purple-600" size={20} />
            <div className="text-sm text-gray-600">Habitaciones Limpias</div>
          </div>
          <div className="text-2xl font-bold text-purple-600">15/22</div>
        </div>
      </div>

      {/* Tareas de Limpieza */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Habitación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo Limpieza
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prioridad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empleado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tareasLimpieza.map((tarea) => (
                <tr key={tarea.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-primary-600">Hab. {tarea.habitacion}</div>
                    <div className="text-sm text-gray-500">{tarea.tipo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tarea.tipoLimpieza}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPrioridadColor(tarea.prioridad)}`}>
                      {tarea.prioridad}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tarea.empleado || <span className="text-gray-400">Sin asignar</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Asignado: {tarea.horaAsignada}</div>
                    {tarea.horaInicio && (
                      <div className="text-sm text-gray-500">Inicio: {tarea.horaInicio}</div>
                    )}
                    {tarea.horaFin && (
                      <div className="text-sm text-green-600">Fin: {tarea.horaFin}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={tarea.estado} type="limpieza" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tarea.estado === 'PENDIENTE' && (
                      <button className="text-blue-600 hover:text-blue-900">
                        Asignar
                      </button>
                    )}
                    {tarea.estado === 'EN_LIMPIEZA' && (
                      <button className="text-green-600 hover:text-green-900">
                        Completar
                      </button>
                    )}
                    {tarea.estado === 'COMPLETADO' && (
                      <button className="text-primary-600 hover:text-primary-900">
                        Ver Detalle
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Limpieza
