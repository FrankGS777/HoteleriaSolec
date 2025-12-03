import { useState } from 'react'
import { BarChart3, Download, Calendar, TrendingUp, DollarSign, Users } from 'lucide-react'

const Reportes = () => {
  const [tipoReporte, setTipoReporte] = useState('ocupacion')
  const [fechaInicio, setFechaInicio] = useState('2024-12-01')
  const [fechaFin, setFechaFin] = useState('2024-12-31')

  const reportesDisponibles = [
    { id: 'ocupacion', nombre: 'Reporte de Ocupación', icon: TrendingUp, color: 'bg-blue-500' },
    { id: 'ingresos', nombre: 'Reporte de Ingresos', icon: DollarSign, color: 'bg-green-500' },
    { id: 'servicios', nombre: 'Reporte de Servicios', icon: Users, color: 'bg-purple-500' },
    { id: 'clientes', nombre: 'Reporte de Clientes', icon: Users, color: 'bg-orange-500' }
  ]

  // Mock data
  const statsOcupacion = [
    { mes: 'Enero', ocupacion: 75, habitaciones: 18 },
    { mes: 'Febrero', ocupacion: 82, habitaciones: 20 },
    { mes: 'Marzo', ocupacion: 68, habitaciones: 16 },
    { mes: 'Abril', ocupacion: 90, habitaciones: 21 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reportes</h2>
          <p className="text-gray-600 mt-1">Generación de reportes y estadísticas del hotel</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download size={20} />
          Exportar PDF
        </button>
      </div>

      {/* Tipo de Reporte */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Seleccionar Tipo de Reporte</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportesDisponibles.map((reporte) => {
            const Icon = reporte.icon
            return (
              <button
                key={reporte.id}
                onClick={() => setTipoReporte(reporte.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  tipoReporte === reporte.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`${reporte.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="text-white" size={24} />
                </div>
                <p className="text-sm font-semibold text-gray-900">{reporte.nombre}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Filtros */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Fecha Inicio</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div>
            <label className="label">Fecha Fin</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <BarChart3 size={20} />
              Generar Reporte
            </button>
          </div>
        </div>
      </div>

      {/* Resumen Ejecutivo */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Resumen Ejecutivo</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 mb-1">Ocupación Promedio</p>
            <p className="text-3xl font-bold text-blue-700">78.75%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 mb-1">Ingresos Totales</p>
            <p className="text-3xl font-bold text-green-700">S/ 45,280</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 mb-1">Total Reservas</p>
            <p className="text-3xl font-bold text-purple-700">156</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-600 mb-1">Nuevos Clientes</p>
            <p className="text-3xl font-bold text-orange-700">42</p>
          </div>
        </div>
      </div>

      {/* Gráfico de Ocupación */}
      {tipoReporte === 'ocupacion' && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Ocupación Mensual</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Ocupación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Habitaciones Ocupadas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gráfico
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {statsOcupacion.map((stat) => (
                  <tr key={stat.mes}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {stat.mes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                      {stat.ocupacion}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stat.habitaciones} / 22
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${stat.ocupacion}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Opciones de Exportación */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Exportar Reporte</h3>
        <div className="flex gap-4">
          <button className="btn-primary flex items-center gap-2">
            <Download size={20} />
            Exportar a PDF
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download size={20} />
            Exportar a Excel
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download size={20} />
            Exportar a CSV
          </button>
        </div>
      </div>
    </div>
  )
}

export default Reportes
