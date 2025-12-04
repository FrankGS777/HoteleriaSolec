import { useState, useEffect } from 'react'
import { Plus, Search, Wrench, AlertTriangle } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'
import { useToast } from '../hooks/useToast'
import { mantenimientoAPI } from '../services/api'

const Mantenimiento = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [ordenesMantenimiento, setOrdenesMantenimiento] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    fetchMantenimiento()
  }, [])

  const fetchMantenimiento = async () => {
    try {
      setLoading(true)
      const response = await mantenimientoAPI.getAll()
      setOrdenesMantenimiento(response.data.data || [])
    } catch (error) {
      toast.error('Error al cargar órdenes de mantenimiento')
      console.error('Error fetching mantenimiento:', error)
    } finally {
      setLoading(false)
    }
  }

  const getHabitacionNumero = (orden) => {
    if (!orden?.habitacion) return 'N/A'
    return typeof orden.habitacion === 'string' ? orden.habitacion : orden.habitacion.numero || 'N/A'
  }

  const getEmpleadoNombre = (orden) => {
    if (!orden?.tecnico && !orden?.empleado) return 'Sin asignar'
    const empleado = orden.tecnico || orden.empleado
    return typeof empleado === 'string' ? empleado : empleado.nombreCompleto || empleado.nombre || 'Sin asignar'
  }
    {
      id: 1,
      numero: 'MAN-001',
      habitacion: '303',
      tipo: 'Correctivo',
      prioridad: 'ALTA',
      problema: 'Fuga de agua en baño',
      descripcion: 'Se reporta fuga de agua en el baño principal',
      estado: 'PENDIENTE',
      fechaReporte: '2024-12-03 08:30',
      reportadoPor: 'Ana López',
      tecnico: null,
      costoEstimado: 150
    },
    {
      id: 2,
      numero: 'MAN-002',
      habitacion: '105',
      tipo: 'Preventivo',
      prioridad: 'MEDIA',
      problema: 'Mantenimiento de aire acondicionado',
      descripcion: 'Mantenimiento preventivo trimestral',
      estado: 'EN_PROCESO',
      fechaReporte: '2024-12-03 09:00',
      reportadoPor: 'Sistema',
      tecnico: 'Miguel Torres',
      fechaInicio: '2024-12-03 10:00',
      costoEstimado: 80
    },
    {
      id: 3,
      numero: 'MAN-003',
      habitacion: '201',
      tipo: 'Correctivo',
      prioridad: 'BAJA',
      problema: 'TV no enciende',
      descripcion: 'El televisor de la habitación no enciende',
      estado: 'COMPLETADO',
      fechaReporte: '2024-12-02 16:00',
      reportadoPor: 'Carlos Ramírez',
      tecnico: 'Miguel Torres',
      fechaInicio: '2024-12-02 17:00',
      fechaFin: '2024-12-02 18:30',
      costoEstimado: 50,
      costoReal: 45
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
          <h2 className="text-2xl font-bold text-gray-900">Órdenes de Mantenimiento</h2>
          <p className="text-gray-600 mt-1">Gestión de mantenimiento de habitaciones e instalaciones</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nueva Orden
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por número, habitación o problema..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="card">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-600" size={20} />
            <div className="text-sm text-gray-600">Urgentes</div>
          </div>
          <div className="text-2xl font-bold text-red-600">1</div>
        </div>
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
            <Wrench className="text-purple-600" size={20} />
            <div className="text-sm text-gray-600">Costo Estimado</div>
          </div>
          <div className="text-xl font-bold text-purple-600">S/ 230</div>
        </div>
      </div>

      {/* Órdenes de Mantenimiento */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-gray-600">Cargando órdenes...</p>
        </div>
      ) : ordenesMantenimiento.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No se encontraron órdenes de mantenimiento</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ordenesMantenimiento.map((orden) => (
          <div key={orden.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg font-bold text-primary-600">{orden.numero}</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPrioridadColor(orden.prioridad)}`}>
                    {orden.prioridad}
                  </span>
                  <StatusBadge status={orden.estado} type="mantenimiento" />
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                    {orden.tipo}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Ubicación</h4>
                    <p className="text-lg font-bold text-gray-900">Habitación {getHabitacionNumero(orden)}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Problema</h4>
                    <p className="font-medium text-gray-900">{orden.problema}</p>
                    <p className="text-sm text-gray-500 mt-1">{orden.descripcion}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Personal</h4>
                    <p className="text-sm text-gray-600">Reportado por: {orden.reportadoPor || 'N/A'}</p>
                    <p className="text-sm text-gray-600">
                      Técnico: {getEmpleadoNombre(orden) === 'Sin asignar' ? <span className="text-gray-400">Sin asignar</span> : getEmpleadoNombre(orden)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Fecha Reporte:</p>
                    <p className="font-medium">{orden.fechaReporte}</p>
                  </div>
                  {orden.fechaInicio && (
                    <div>
                      <p className="text-gray-600">Inicio:</p>
                      <p className="font-medium">{orden.fechaInicio}</p>
                    </div>
                  )}
                  {orden.fechaFin && (
                    <div>
                      <p className="text-gray-600">Fin:</p>
                      <p className="font-medium text-green-600">{orden.fechaFin}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-600">Costo Estimado:</p>
                    <p className="font-bold text-gray-900">S/ {orden.costoEstimado}</p>
                    {orden.costoReal && (
                      <p className="text-sm text-gray-500">Real: S/ {orden.costoReal}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="ml-6 flex flex-col gap-2">
                {orden.estado === 'PENDIENTE' && (
                  <button className="btn-primary whitespace-nowrap">
                    Asignar Técnico
                  </button>
                )}
                {orden.estado === 'EN_PROCESO' && (
                  <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg whitespace-nowrap">
                    Completar
                  </button>
                )}
                <button className="btn-secondary text-sm">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Mantenimiento
