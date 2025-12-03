import { useState, useEffect, useMemo } from 'react'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import Modal from '../components/common/Modal'
import ConfirmDialog from '../components/common/ConfirmDialog'
import ServicioForm from '../components/forms/ServicioForm'
import { useToast } from '../hooks/useToast'
import { serviciosAPI } from '../services/api'

const Servicios = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [servicios, setServicios] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedServicio, setSelectedServicio] = useState(null)
  const toast = useToast()

  useEffect(() => {
    fetchServicios()
  }, [])

  const fetchServicios = async () => {
    try {
      setLoading(true)
      const response = await serviciosAPI.getAll()
      setServicios(response.data.data || [])
    } catch (error) {
      toast.error('Error al cargar servicios')
      console.error('Error fetching servicios:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (data) => {
    try {
      await serviciosAPI.create(data)
      toast.success('Servicio creado exitosamente')
      setIsAddModalOpen(false)
      fetchServicios()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear servicio')
    }
  }

  const handleEdit = async (data) => {
    try {
      await serviciosAPI.update(selectedServicio.id, data)
      toast.success('Servicio actualizado exitosamente')
      setIsEditModalOpen(false)
      setSelectedServicio(null)
      fetchServicios()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar servicio')
    }
  }

  const handleDelete = async () => {
    try {
      await serviciosAPI.delete(selectedServicio.id)
      toast.success('Servicio eliminado exitosamente')
      setIsDeleteDialogOpen(false)
      setSelectedServicio(null)
      fetchServicios()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar servicio')
    }
  }

  const openEditModal = (servicio) => {
    setSelectedServicio(servicio)
    setIsEditModalOpen(true)
  }

  const openDeleteDialog = (servicio) => {
    setSelectedServicio(servicio)
    setIsDeleteDialogOpen(true)
  }

  const filteredServicios = useMemo(() => {
    const searchLower = searchTerm.toLowerCase()
    return servicios.filter(servicio =>
      servicio.nombre?.toLowerCase().includes(searchLower) ||
      servicio.codigo?.toLowerCase().includes(searchLower) ||
      servicio.categoria?.toLowerCase().includes(searchLower)
    )
  }, [servicios, searchTerm])
  
  const precioPromedio = useMemo(() => {
    if (filteredServicios.length === 0) return 0
    const total = filteredServicios.reduce((sum, s) => sum + parseFloat(s.precio || 0), 0)
    return (total / filteredServicios.length).toFixed(2)
  }, [filteredServicios])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Servicios</h2>
          <p className="text-gray-600 mt-1">Gestión de servicios del hotel</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Servicio
        </button>
      </div>

      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Total Servicios</div>
          <div className="text-2xl font-bold text-gray-900">{filteredServicios.length}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Disponibles</div>
          <div className="text-2xl font-bold text-green-600">
            {filteredServicios.filter(s => s.disponible).length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Categorías</div>
          <div className="text-2xl font-bold text-primary-600">
            {new Set(filteredServicios.map(s => s.categoria)).size}
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Precio Promedio</div>
          <div className="text-2xl font-bold text-blue-600">
            S/. {precioPromedio}
          </div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Cargando servicios...</p>
          </div>
        ) : filteredServicios.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No se encontraron servicios</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredServicios.map((servicio) => (
                  <tr key={servicio.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {servicio.codigo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {servicio.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {servicio.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      S/. {parseFloat(servicio.precio).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        servicio.disponible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {servicio.disponible ? 'Disponible' : 'No disponible'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => openEditModal(servicio)}
                        className="text-primary-600 hover:text-primary-900 mr-3 inline-flex items-center gap-1"
                      >
                        <Edit size={16} />
                        Editar
                      </button>
                      <button 
                        onClick={() => openDeleteDialog(servicio)}
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

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Nuevo Servicio" size="md">
        <ServicioForm onSubmit={handleAdd} onCancel={() => setIsAddModalOpen(false)} />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setSelectedServicio(null) }} title="Editar Servicio" size="md">
        <ServicioForm data={selectedServicio} onSubmit={handleEdit} onCancel={() => { setIsEditModalOpen(false); setSelectedServicio(null) }} />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onConfirm={handleDelete}
        onCancel={() => { setIsDeleteDialogOpen(false); setSelectedServicio(null) }}
        title="Eliminar Servicio"
        message={`¿Está seguro de eliminar el servicio "${selectedServicio?.nombre}"?`}
        type="danger"
      />
    </div>
  )
}

export default Servicios
