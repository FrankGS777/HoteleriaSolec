import { useState } from 'react'
import { Plus, Search, Briefcase } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'

const Empleados = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const empleados = [
    {
      id: 1,
      dni: '12345678',
      nombre: 'Carlos',
      apellidos: 'Ramírez González',
      cargo: 'Recepcionista',
      turno: 'MAÑANA',
      telefono: '987654321',
      email: 'carlos.ramirez@hotelsolec.com',
      fechaContratacion: '2023-01-15',
      salario: 2500,
      activo: true
    },
    {
      id: 2,
      dni: '87654321',
      nombre: 'Ana',
      apellidos: 'López Martínez',
      cargo: 'Housekeeping',
      turno: 'TARDE',
      telefono: '987654322',
      email: 'ana.lopez@hotelsolec.com',
      fechaContratacion: '2023-03-10',
      salario: 1800,
      activo: true
    },
    {
      id: 3,
      dni: '45678912',
      nombre: 'Miguel',
      apellidos: 'Torres Sánchez',
      cargo: 'Mantenimiento',
      turno: 'NOCHE',
      telefono: '987654323',
      email: 'miguel.torres@hotelsolec.com',
      fechaContratacion: '2022-11-20',
      salario: 2000,
      activo: true
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Empleados</h2>
          <p className="text-gray-600 mt-1">Gestión de empleados del hotel</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nuevo Empleado
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre, DNI o cargo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Total Empleados</div>
          <div className="text-2xl font-bold text-gray-900">3</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Activos</div>
          <div className="text-2xl font-bold text-green-600">3</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <Briefcase className="text-blue-600" size={20} />
            <div className="text-sm text-gray-600">Turno Actual</div>
          </div>
          <div className="text-2xl font-bold text-blue-600">Mañana</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Nuevos Este Mes</div>
          <div className="text-2xl font-bold text-purple-600">0</div>
        </div>
      </div>

      {/* Empleados Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empleado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DNI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cargo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Turno
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salario
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
              {empleados.map((empleado) => (
                <tr key={empleado.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {empleado.nombre.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {empleado.nombre} {empleado.apellidos}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {empleado.dni}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {empleado.cargo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {empleado.turno}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{empleado.telefono}</div>
                    <div className="text-sm text-gray-500">{empleado.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    S/ {empleado.salario}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={empleado.activo ? 'ACTIVO' : 'INACTIVO'} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Eliminar
                    </button>
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

export default Empleados
