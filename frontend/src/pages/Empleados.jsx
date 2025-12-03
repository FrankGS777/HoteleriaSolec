import { useState, useEffect, useMemo } from 'react'
import { Plus, Search, Briefcase, Edit, Trash2 } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'
import Modal from '../components/common/Modal'
import ConfirmDialog from '../components/common/ConfirmDialog'
import EmpleadoForm from '../components/forms/EmpleadoForm'
import { useToast } from '../hooks/useToast'
import { empleadosAPI } from '../services/api'

const Empleados = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [empleados, setEmpleados] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEmpleado, setSelectedEmpleado] = useState(null)
  const toast = useToast()

  useEffect(() => {
    fetchEmpleados()
  }, [])

  const fetchEmpleados = async () => {
    try {
      setLoading(true)
      const response = await empleadosAPI.getAll()
      setEmpleados(response.data.data || [])
    } catch (error) {
      toast.error('Error al cargar empleados')
      console.error('Error fetching empleados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (data) => {
    try {
      await empleadosAPI.create(data)
      toast.success('Empleado creado exitosamente')
      setIsAddModalOpen(false)
      fetchEmpleados()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear empleado')
    }
  }

  const handleEdit = async (data) => {
    try {
      await empleadosAPI.update(selectedEmpleado.id, data)
      toast.success('Empleado actualizado exitosamente')
      setIsEditModalOpen(false)
      setSelectedEmpleado(null)
      fetchEmpleados()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar empleado')
    }
  }

  const handleDelete = async () => {
    try {
      await empleadosAPI.delete(selectedEmpleado.id)
      toast.success('Empleado eliminado exitosamente')
      setIsDeleteDialogOpen(false)
      setSelectedEmpleado(null)
      fetchEmpleados()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar empleado')
    }
  }

  const openEditModal = (empleado) => {
    setSelectedEmpleado(empleado)
    setIsEditModalOpen(true)
  }

  const openDeleteDialog = (empleado) => {
    setSelectedEmpleado(empleado)
    setIsDeleteDialogOpen(true)
  }

  const filteredEmpleados = useMemo(() => {
    const searchLower = searchTerm.toLowerCase()
    return empleados.filter(empleado =>
      empleado.nombre?.toLowerCase().includes(searchLower) ||
      empleado.apellidos?.toLowerCase().includes(searchLower) ||
      empleado.dni?.includes(searchTerm) ||
      empleado.cargo?.toLowerCase().includes(searchLower)
    )
  }, [empleados, searchTerm])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Empleados</h2>
          <p className="text-gray-600 mt-1">Gestión de empleados del hotel</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
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
          <div className="text-2xl font-bold text-gray-900">{filteredEmpleados.length}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Activos</div>
          <div className="text-2xl font-bold text-green-600">
            {filteredEmpleados.filter(e => e.activo).length}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <Briefcase className="text-primary-600" size={20} />
            <div className="text-sm text-gray-600">Departamentos</div>
          </div>
          <div className="text-2xl font-bold text-primary-600">
            {new Set(filteredEmpleados.map(e => e.cargo)).size}
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Turno Actual</div>
          <div className="text-2xl font-bold text-blue-600">
            {filteredEmpleados.filter(e => e.turno === 'MAÑANA').length}
          </div>
        </div>
      </div>

      {/* Empleados Table */}
      <div className="card">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Cargando empleados...</p>
          </div>
        ) : filteredEmpleados.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No se encontraron empleados</p>
          </div>
        ) : (
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
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmpleados.map((empleado) => (
                  <tr key={empleado.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {empleado.nombre?.charAt(0) || 'E'}
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {empleado.cargo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {empleado.turno}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{empleado.email}</div>
                      <div className="text-sm text-gray-500">{empleado.telefono}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={empleado.activo ? 'ACTIVO' : 'INACTIVO'} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => openEditModal(empleado)}
                        className="text-primary-600 hover:text-primary-900 mr-3 inline-flex items-center gap-1"
                      >
                        <Edit size={16} />
                        Editar
                      </button>
                      <button 
                        onClick={() => openDeleteDialog(empleado)}
                        className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Nuevo Empleado"
        size="lg"
      >
        <EmpleadoForm
          onSubmit={handleAdd}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedEmpleado(null)
        }}
        title="Editar Empleado"
        size="lg"
      >
        <EmpleadoForm
          data={selectedEmpleado}
          onSubmit={handleEdit}
          onCancel={() => {
            setIsEditModalOpen(false)
            setSelectedEmpleado(null)
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onConfirm={handleDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false)
          setSelectedEmpleado(null)
        }}
        title="Eliminar Empleado"
        message={`¿Está seguro de eliminar al empleado "${selectedEmpleado?.nombre} ${selectedEmpleado?.apellidos}"? Esta acción no se puede deshacer.`}
        type="danger"
      />
    </div>
  )
}

export default Empleados
