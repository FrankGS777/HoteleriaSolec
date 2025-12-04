import { useState, useEffect } from 'react'
import { Search, Shield, Filter } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import { auditoriaAPI } from '../services/api'

const Auditoria = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [registrosAuditoria, setRegistrosAuditoria] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    fetchAuditoria()
  }, [])

  const fetchAuditoria = async () => {
    try {
      setLoading(true)
      const response = await auditoriaAPI.getAll()
      setRegistrosAuditoria(response.data.data || [])
    } catch (error) {
      toast.error('Error al cargar auditoría')
      console.error('Error fetching auditoria:', error)
    } finally {
      setLoading(false)
    }
  }

  const getUsuarioNombre = (registro) => {
    if (!registro?.usuario) return 'Sistema'
    return typeof registro.usuario === 'string' ? registro.usuario : registro.usuario.username || registro.usuario.nombreCompleto || 'Sistema'
  }
      fecha: '2024-12-03 15:00:00',
      usuario: 'recepcion01',
      accion: 'CREATE',
      modulo: 'Reservas',
      descripcion: 'Nueva reserva creada',
      ip: '192.168.1.110',
      detalles: 'Reserva RES-001 para cliente Juan Pérez'
    },
    {
      id: 6,
      fecha: '2024-12-03 15:15:45',
      usuario: 'admin',
      accion: 'DELETE',
      modulo: 'Empleados',
      descripcion: 'Eliminación de empleado',
      ip: '192.168.1.100',
      detalles: 'Empleado eliminado: ID 15'
    }
  ]

  const getAccionColor = (accion) => {
    const colors = {
      LOGIN: 'bg-blue-100 text-blue-800',
      LOGOUT: 'bg-gray-100 text-gray-800',
      CREATE: 'bg-green-100 text-green-800',
      UPDATE: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800'
    }
    return colors[accion] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Auditoría del Sistema</h2>
          <p className="text-gray-600 mt-1">Registro de todas las acciones realizadas en el sistema (Solo Administradores)</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="text-red-600" size={24} />
          <span className="text-sm font-semibold text-red-600">Acceso Restringido</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por usuario, acción o módulo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={20} />
            Filtros Avanzados
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Total Hoy</div>
          <div className="text-2xl font-bold text-gray-900">6</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Login</div>
          <div className="text-2xl font-bold text-blue-600">2</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Creaciones</div>
          <div className="text-2xl font-bold text-green-600">2</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Modificaciones</div>
          <div className="text-2xl font-bold text-yellow-600">1</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Eliminaciones</div>
          <div className="text-2xl font-bold text-red-600">1</div>
        </div>
      </div>

      {/* Auditoria Table */}
      <div className="card">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Cargando auditoría...</p>
          </div>
        ) : registrosAuditoria.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No se encontraron registros de auditoría</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha/Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Módulo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrosAuditoria.map((registro) => {
                  const usuario = getUsuarioNombre(registro)
                  return (
                    <tr key={registro.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {registro.fechaHora || registro.fecha || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {usuario.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {usuario}
                            </div>
                          </div>
                        </div>
                      </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAccionColor(registro.accion)}`}>
                      {registro.accion}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {registro.modulo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>{registro.descripcion}</div>
                    <div className="text-xs text-gray-500 mt-1">{registro.detalles}</div>
                  </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {registro.ip || registro.ipAddress || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-primary-600 hover:text-primary-900">
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Nota:</strong> Los registros de auditoría se mantienen por un período de 90 días. Los registros antiguos se archivan automáticamente.
        </p>
      </div>
    </div>
  )
}

export default Auditoria
