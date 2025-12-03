import { useState, useEffect } from 'react'

const EmpleadoForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    cargo: '',
    turno: 'MAÑANA',
    fecha_contratacion: '',
    salario: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        dni: data.dni || '',
        nombre: data.nombre || '',
        apellidos: data.apellidos || '',
        telefono: data.telefono || '',
        email: data.email || '',
        cargo: data.cargo || '',
        turno: data.turno || 'MAÑANA',
        fecha_contratacion: data.fecha_contratacion || data.fechaContratacion || '',
        salario: data.salario || ''
      })
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            DNI *
          </label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
            maxLength="8"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono *
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apellidos *
          </label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cargo *
          </label>
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            required
            placeholder="Ej: Recepcionista, Camarera, etc."
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Turno *
          </label>
          <select
            name="turno"
            value={formData.turno}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="MAÑANA">Mañana</option>
            <option value="TARDE">Tarde</option>
            <option value="NOCHE">Noche</option>
            <option value="ROTATIVO">Rotativo</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Contratación *
          </label>
          <input
            type="date"
            name="fecha_contratacion"
            value={formData.fecha_contratacion}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salario *
          </label>
          <input
            type="number"
            name="salario"
            value={formData.salario}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="1025.00"
            className="input-field"
          />
        </div>
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
          {data ? 'Actualizar' : 'Crear'} Empleado
        </button>
      </div>
    </form>
  )
}

export default EmpleadoForm
