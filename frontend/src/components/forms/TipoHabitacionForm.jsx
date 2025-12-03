import { useState, useEffect } from 'react'

const TipoHabitacionForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    capacidad_personas: '2',
    numero_camas: '1',
    precio_base: '',
    metros_cuadrados: '',
    caracteristicas: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        nombre: data.nombre || '',
        descripcion: data.descripcion || '',
        capacidad_personas: data.capacidad_personas || data.capacidadPersonas || '2',
        numero_camas: data.numero_camas || data.numeroCamas || '1',
        precio_base: data.precio_base || data.precioBase || '',
        metros_cuadrados: data.metros_cuadrados || data.metrosCuadrados || '',
        caracteristicas: data.caracteristicas || ''
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
          placeholder="Ej: Habitación Simple, Suite Ejecutiva"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows="3"
          className="input-field"
          placeholder="Descripción detallada del tipo de habitación"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Capacidad de Personas *
          </label>
          <input
            type="number"
            name="capacidad_personas"
            value={formData.capacidad_personas}
            onChange={handleChange}
            required
            min="1"
            max="10"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Camas *
          </label>
          <input
            type="number"
            name="numero_camas"
            value={formData.numero_camas}
            onChange={handleChange}
            required
            min="1"
            max="5"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio Base (S/.) *
          </label>
          <input
            type="number"
            name="precio_base"
            value={formData.precio_base}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="150.00"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Metros Cuadrados
          </label>
          <input
            type="number"
            name="metros_cuadrados"
            value={formData.metros_cuadrados}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="25.50"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Características
        </label>
        <textarea
          name="caracteristicas"
          value={formData.caracteristicas}
          onChange={handleChange}
          rows="3"
          className="input-field"
          placeholder="Ej: WiFi, TV Cable, Aire Acondicionado, Minibar"
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
          {data ? 'Actualizar' : 'Crear'} Tipo de Habitación
        </button>
      </div>
    </form>
  )
}

export default TipoHabitacionForm
