import { useState, useEffect } from 'react'

const UsuarioForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    nombre_completo: '',
    role_id: '3', // RECEPCIONISTA by default
    activo: true
  })

  const [roles] = useState([
    { id: 1, nombre: 'ADMIN' },
    { id: 2, nombre: 'GERENTE' },
    { id: 3, nombre: 'RECEPCIONISTA' },
    { id: 4, nombre: 'HOUSEKEEPING' },
    { id: 5, nombre: 'MANTENIMIENTO' }
  ])

  useEffect(() => {
    if (data) {
      setFormData({
        username: data.username || '',
        password: '', // Don't pre-fill password
        email: data.email || '',
        nombre_completo: data.nombreCompleto || data.nombre_completo || '',
        role_id: data.role_id || data.roleId || '3',
        activo: data.activo !== undefined ? data.activo : true
      })
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Don't send password if it's empty (for edit mode)
    if (data && !formData.password) {
      const { password, ...submitData } = formData
      onSubmit(submitData)
    } else {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username *
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={!!data} // Disable username editing
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {data ? 'Nueva Contraseña (dejar vacío para no cambiar)' : 'Contraseña *'}
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={!data}
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre Completo *
        </label>
        <input
          type="text"
          name="nombre_completo"
          value={formData.nombre_completo}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rol *
        </label>
        <select
          name="role_id"
          value={formData.role_id}
          onChange={handleChange}
          required
          className="input-field"
        >
          {roles.map(role => (
            <option key={role.id} value={role.id}>
              {role.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="activo"
          checked={formData.activo}
          onChange={handleChange}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Usuario Activo
        </label>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium"
        >
          {data ? 'Actualizar' : 'Crear'} Usuario
        </button>
      </div>
    </form>
  )
}

export default UsuarioForm
