import { useState, useEffect } from 'react'
import { Plus, Search, UserCheck, Edit, Eye } from 'lucide-react'
import Modal from '../components/common/Modal'
import ClienteForm from '../components/forms/ClienteForm'
import { useToast } from '../hooks/useToast'
import { clientesAPI } from '../services/api'

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState(null)
  const toast = useToast()

  useEffect(() => {
    fetchClientes()
  }, [])

  const fetchClientes = async () => {
    try {
      setLoading(true)
      const response = await clientesAPI.getAll()
      setClientes(response.data.data || [])
    } catch (error) {
      toast.error('Error al cargar clientes')
      console.error('Error fetching clientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (data) => {
    try {
      await clientesAPI.create(data)
      toast.success('Cliente creado exitosamente')
      setIsAddModalOpen(false)
      fetchClientes()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear cliente')
    }
  }

  const handleEdit = async (data) => {
    try {
      await clientesAPI.update(selectedCliente.id, data)
      toast.success('Cliente actualizado exitosamente')
      setIsEditModalOpen(false)
      setSelectedCliente(null)
      fetchClientes()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar cliente')
    }
  }

  const openEditModal = (cliente) => {
    setSelectedCliente(cliente)
    setIsEditModalOpen(true)
  }

  const openViewModal = (cliente) => {
    setSelectedCliente(cliente)
    setIsViewModalOpen(true)
  }

  const filteredClientes = clientes.filter(cliente => {
    const searchLower = searchTerm.toLowerCase()
    return (
      cliente.nombre?.toLowerCase().includes(searchLower) ||
      cliente.apellidos?.toLowerCase().includes(searchLower) ||
      cliente.numeroDocumento?.includes(searchTerm) ||
      cliente.numero_documento?.includes(searchTerm)
    )
  })

  // Mock data for fallback
  const mockClientes = [
    {
      id: 1,
      nombre: 'Juan Pérez García',
      tipoDocumento: 'DNI',
      numeroDocumento: '12345678',
      email: 'juan.perez@example.com',
      telefono: '987654321',
      esVip: true,
      totalReservas: 5
    },
    {
      id: 2,
      nombre: 'María García López',
      tipoDocumento: 'DNI',
      numeroDocumento: '87654321',
      email: 'maria.garcia@example.com',
      telefono: '987654322',
      esVip: false,
      totalReservas: 2
    },
    {
      id: 3,
      nombre: 'Carlos López Martínez',
      tipoDocumento: 'PASAPORTE',
      numeroDocumento: 'P1234567',
      email: 'carlos.lopez@example.com',
      telefono: '987654323',
      esVip: true,
      totalReservas: 8
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clientes</h2>
          <p className="text-gray-600 mt-1">Gestión de clientes del hotel</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Cliente
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre, documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Total Clientes</div>
          <div className="text-2xl font-bold text-gray-900">{filteredClientes.length}</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <UserCheck className="text-gold-600" size={20} />
            <div className="text-sm text-gray-600">Clientes VIP</div>
          </div>
          <div className="text-2xl font-bold text-gold-600">
            {filteredClientes.filter(c => c.esVip || c.es_vip).length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Clientes Regulares</div>
          <div className="text-2xl font-bold text-green-600">
            {filteredClientes.filter(c => !(c.esVip || c.es_vip)).length}
          </div>
        </div>
      </div>

      {/* Clientes Table */}
      <div className="card">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Cargando clientes...</p>
          </div>
        ) : filteredClientes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No se encontraron clientes</p>
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
                    Documento
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
                {filteredClientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {cliente.nombre?.charAt(0) || 'C'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {cliente.nombre} {cliente.apellidos}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{cliente.tipoDocumento || cliente.tipo_documento}</div>
                      <div className="text-sm text-gray-500">{cliente.numeroDocumento || cliente.numero_documento}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{cliente.email}</div>
                      <div className="text-sm text-gray-500">{cliente.telefono}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(cliente.esVip || cliente.es_vip) ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gold-100 text-gold-800">
                          VIP
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Regular
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => openViewModal(cliente)}
                        className="text-blue-600 hover:text-blue-900 mr-3 inline-flex items-center gap-1"
                      >
                        <Eye size={16} />
                        Ver
                      </button>
                      <button 
                        onClick={() => openEditModal(cliente)}
                        className="text-primary-600 hover:text-primary-900 inline-flex items-center gap-1"
                      >
                        <Edit size={16} />
                        Editar
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
        title="Nuevo Cliente"
        size="lg"
      >
        <ClienteForm
          onSubmit={handleAdd}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedCliente(null)
        }}
        title="Editar Cliente"
        size="lg"
      >
        <ClienteForm
          data={selectedCliente}
          onSubmit={handleEdit}
          onCancel={() => {
            setIsEditModalOpen(false)
            setSelectedCliente(null)
          }}
        />
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedCliente(null)
        }}
        title="Información del Cliente"
        size="lg"
      >
        {selectedCliente && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <p className="mt-1 text-sm text-gray-900">{selectedCliente.nombre} {selectedCliente.apellidos}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Documento</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedCliente.tipoDocumento || selectedCliente.tipo_documento}: {selectedCliente.numeroDocumento || selectedCliente.numero_documento}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{selectedCliente.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <p className="mt-1 text-sm text-gray-900">{selectedCliente.telefono}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dirección</label>
                <p className="mt-1 text-sm text-gray-900">{selectedCliente.direccion || 'No especificado'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ciudad / País</label>
                <p className="mt-1 text-sm text-gray-900">{selectedCliente.ciudad || 'N/A'}, {selectedCliente.pais || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <p className="mt-1">
                  {(selectedCliente.esVip || selectedCliente.es_vip) ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gold-100 text-gold-800">
                      VIP
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Regular
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Clientes
