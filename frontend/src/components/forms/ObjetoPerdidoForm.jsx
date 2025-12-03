import { useState, useEffect } from 'react'

const ObjetoPerdidoForm = ({ data, onSubmit, onCancel, habitaciones = [] }) => {
  const [formData, setFormData] = useState({
    descripcion: '',
    habitacion_id: '',
    ubicacion_encontrado: '',
    fecha_encontrado: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        descripcion: data.descripcion || '',
        habitacion_id: data.habitacion_id || data.habitacionId || '',
        ubicacion_encontrado: data.ubicacion_encontrado || data.ubicacionEncontrado || '',
        fecha_encontrado: data.fecha_encontrado || data.fechaEncontrado || ''
      })
    } else {
      // Set default date to today
      const today = new Date().toISOString().split('T')[0]
      setFormData(prev => ({ ...prev, fecha_encontrado: today }))
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción *
        </label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
          rows="3"
          className="input-field"
          placeholder="Describa el objeto encontrado (color, marca, características)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Habitación
        </label>
        <select
          name="habitacion_id"
          value={formData.habitacion_id}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Áreas comunes / Sin habitación</option>
          {habitaciones.map(habitacion => (
            <option key={habitacion.id} value={habitacion.id}>
              Habitación {habitacion.numero} - Piso {habitacion.piso}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ubicación Encontrado *
        </label>
        <input
          type="text"
          name="ubicacion_encontrado"
          value={formData.ubicacion_encontrado}
          onChange={handleChange}
          required
          placeholder="Ej: Debajo de la cama, En el baño, Lobby"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha Encontrado *
        </label>
        <input
          type="date"
          name="fecha_encontrado"
          value={formData.fecha_encontrado}
          onChange={handleChange}
          required
          className="input-field"
        />
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
          {data ? 'Actualizar' : 'Registrar'} Objeto Perdido
        </button>
      </div>
    </form>
  )
}

export default ObjetoPerdidoForm
