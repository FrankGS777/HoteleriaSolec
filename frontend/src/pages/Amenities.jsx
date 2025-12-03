import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react'
import Modal from '../components/common/Modal'
import ConfirmDialog from '../components/common/ConfirmDialog'
import AmenityForm from '../components/forms/AmenityForm'
import { useToast } from '../hooks/useToast'
import { amenitiesAPI } from '../services/api'

const Amenities = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [amenities, setAmenities] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedAmenity, setSelectedAmenity] = useState(null)
  const toast = useToast()

  useEffect(() => {
    fetchAmenities()
  }, [])

  const fetchAmenities = async () => {
    try {
      setLoading(true)
      const response = await amenitiesAPI.getAll()
      setAmenities(response.data.data || [])
    } catch (error) {
      toast.error('Error al cargar amenities')
      console.error('Error fetching amenities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (data) => {
    try {
      await amenitiesAPI.create(data)
      toast.success('Amenity creado exitosamente')
      setIsAddModalOpen(false)
      fetchAmenities()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear amenity')
    }
  }

  const handleEdit = async (data) => {
    try {
      await amenitiesAPI.update(selectedAmenity.id, data)
      toast.success('Amenity actualizado exitosamente')
      setIsEditModalOpen(false)
      setSelectedAmenity(null)
      fetchAmenities()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar amenity')
    }
  }

  const handleDelete = async () => {
    try {
      await amenitiesAPI.delete(selectedAmenity.id)
      toast.success('Amenity eliminado exitosamente')
      setIsDeleteDialogOpen(false)
      setSelectedAmenity(null)
      fetchAmenities()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar amenity')
    }
  }

  const openEditModal = (amenity) => {
    setSelectedAmenity(amenity)
    setIsEditModalOpen(true)
  }

  const openDeleteDialog = (amenity) => {
    setSelectedAmenity(amenity)
    setIsDeleteDialogOpen(true)
  }

  const filteredAmenities = amenities.filter(amenity =>
    amenity.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amenity.codigo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amenity.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const lowStockCount = amenities.filter(a => 
    (a.stockActual || a.stock_actual || 0) <= (a.stockMinimo || a.stock_minimo || 0)
  ).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Amenities</h2>
          <p className="text-gray-600 mt-1">Gestión de amenities y suministros</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Amenity
        </button>
      </div>

      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar amenities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Total Amenities</div>
          <div className="text-2xl font-bold text-gray-900">{filteredAmenities.length}</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <Package className="text-yellow-600" size={20} />
            <div className="text-sm text-gray-600">Stock Bajo</div>
          </div>
          <div className="text-2xl font-bold text-yellow-600">{lowStockCount}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Categorías</div>
          <div className="text-2xl font-bold text-primary-600">
            {new Set(filteredAmenities.map(a => a.categoria)).size}
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Stock Total</div>
          <div className="text-2xl font-bold text-green-600">
            {filteredAmenities.reduce((sum, a) => sum + (a.stockActual || a.stock_actual || 0), 0)}
          </div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Cargando amenities...</p>
          </div>
        ) : filteredAmenities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No se encontraron amenities</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo Unit.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAmenities.map((amenity) => {
                  const stockActual = amenity.stockActual || amenity.stock_actual || 0
                  const stockMinimo = amenity.stockMinimo || amenity.stock_minimo || 0
                  const lowStock = stockActual <= stockMinimo
                  
                  return (
                    <tr key={amenity.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {amenity.codigo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {amenity.nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {amenity.categoria}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <span className={lowStock ? 'text-red-600 font-medium' : ''}>
                            {stockActual}
                          </span> / {stockMinimo}
                        </div>
                        {lowStock && (
                          <span className="text-xs text-red-600">Stock bajo</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        S/. {parseFloat(amenity.costoUnitario || amenity.costo_unitario || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                          onClick={() => openEditModal(amenity)}
                          className="text-primary-600 hover:text-primary-900 mr-3 inline-flex items-center gap-1"
                        >
                          <Edit size={16} />
                          Editar
                        </button>
                        <button 
                          onClick={() => openDeleteDialog(amenity)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          Eliminar
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

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Nuevo Amenity" size="lg">
        <AmenityForm onSubmit={handleAdd} onCancel={() => setIsAddModalOpen(false)} />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setSelectedAmenity(null) }} title="Editar Amenity" size="lg">
        <AmenityForm data={selectedAmenity} onSubmit={handleEdit} onCancel={() => { setIsEditModalOpen(false); setSelectedAmenity(null) }} />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onConfirm={handleDelete}
        onCancel={() => { setIsDeleteDialogOpen(false); setSelectedAmenity(null) }}
        title="Eliminar Amenity"
        message={`¿Está seguro de eliminar el amenity "${selectedAmenity?.nombre}"?`}
        type="danger"
      />
    </div>
  )
}

export default Amenities
