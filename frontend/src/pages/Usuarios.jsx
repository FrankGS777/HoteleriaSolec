import { useState, useEffect } from 'react'
import { Plus, Search, Shield, Edit, Trash2 } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'
import Modal from '../components/common/Modal'
import ConfirmDialog from '../components/common/ConfirmDialog'
import UsuarioForm from '../components/forms/UsuarioForm'
import { useToast } from '../hooks/useToast'
import { usuariosAPI } from '../services/api'

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUsuario, setSelectedUsuario] = useState(null)
  const toast = useToast()

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const fetchUsuarios = async () => {
    try {
      setLoading(true)
      const response = await usuariosAPI.getAll()
      setUsuarios(response.data.data || [])
    } catch (error) {
      toast.error('Error al cargar usuarios')
      console.error('Error fetching usuarios:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (data) => {
    try {
      await usuariosAPI.create(data)
      toast.success('Usuario creado exitosamente')
      setIsAddModalOpen(false)
      fetchUsuarios()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al crear usuario')
    }
  }

  const handleEdit = async (data) => {
    try {
      await usuariosAPI.update(selectedUsuario.id, data)
      toast.success('Usuario actualizado exitosamente')
      setIsEditModalOpen(false)
      setSelectedUsuario(null)
      fetchUsuarios()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar usuario')
    }
  }

  const handleDelete = async () => {
    try {
      await usuariosAPI.delete(selectedUsuario.id)
      toast.success('Usuario eliminado exitosamente')
      setIsDeleteDialogOpen(false)
      setSelectedUsuario(null)
      fetchUsuarios()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar usuario')
    }
  }

  const openEditModal = (usuario) => {
    setSelectedUsuario(usuario)
    setIsEditModalOpen(true)
  }

  const openDeleteDialog = (usuario) => {
    setSelectedUsuario(usuario)
    setIsDeleteDialogOpen(true)
  }

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombreCompleto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Mock data for fallback
  const mockUsuarios = [
    {
      id: 1,
      username: 'admin',
      nombreCompleto: 'Administrador Sistema',
      email: 'admin@hotelsolec.com',
      role: 'ADMIN',
      activo: true,
      ultimoAcceso: '2024-12-03 14:30'
    },
    {
      id: 2,
      username: 'gerente01',
      nombreCompleto: 'Juan Carlos Pérez',
      email: 'gerente@hotelsolec.com',
      role: 'GERENTE',
      activo: true,
      ultimoAcceso: '2024-12-03 12:15'
    },
    {
      id: 3,
      username: 'recepcion01',
      nombreCompleto: 'María García López',
      email: 'recepcion@hotelsolec.com',
      role: 'RECEPCIONISTA',
      activo: true,
      ultimoAcceso: '2024-12-03 08:45'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Usuarios</h2>
          <p className="text-gray-600 mt-1">Gestión de usuarios del sistema (Solo Administradores)</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Usuario
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre, username o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Total Usuarios</div>
          <div className="text-2xl font-bold text-gray-900">{filteredUsuarios.length}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Activos</div>
          <div className="text-2xl font-bold text-green-600">
            {filteredUsuarios.filter(u => u.activo).length}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <Shield className="text-primary-600" size={20} />
            <div className="text-sm text-gray-600">Administradores</div>
          </div>
          <div className="text-2xl font-bold text-primary-600">
            {filteredUsuarios.filter(u => u.role === 'ADMIN').length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Total Roles</div>
          <div className="text-2xl font-bold text-blue-600">5</div>
        </div>
      </div>

      {/* Usuarios Table */}
      <div className="card">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Cargando usuarios...</p>
          </div>
        ) : filteredUsuarios.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No se encontraron usuarios</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
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
                {filteredUsuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {usuario.nombreCompleto?.charAt(0) || usuario.username?.charAt(0) || 'U'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {usuario.nombreCompleto || 'Sin nombre'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {usuario.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {usuario.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {usuario.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={usuario.activo ? 'ACTIVO' : 'INACTIVO'} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => openEditModal(usuario)}
                        className="text-primary-600 hover:text-primary-900 mr-3 inline-flex items-center gap-1"
                      >
                        <Edit size={16} />
                        Editar
                      </button>
                      <button 
                        onClick={() => openDeleteDialog(usuario)}
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
        title="Nuevo Usuario"
        size="md"
      >
        <UsuarioForm
          onSubmit={handleAdd}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedUsuario(null)
        }}
        title="Editar Usuario"
        size="md"
      >
        <UsuarioForm
          data={selectedUsuario}
          onSubmit={handleEdit}
          onCancel={() => {
            setIsEditModalOpen(false)
            setSelectedUsuario(null)
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onConfirm={handleDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false)
          setSelectedUsuario(null)
        }}
        title="Eliminar Usuario"
        message={`¿Está seguro de eliminar el usuario "${selectedUsuario?.nombreCompleto}"? Esta acción no se puede deshacer.`}
        type="danger"
      />
    </div>
  )
}

export default Usuarios
