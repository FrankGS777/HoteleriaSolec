import { useState, useEffect } from 'react'

const MovimientoInventarioForm = ({ data, onSubmit, onCancel, amenities = [], habitaciones = [] }) => {
  const [formData, setFormData] = useState({
    amenity_id: '',
    tipo_movimiento: 'ENTRADA',
    cantidad: '1',
    motivo: '',
    habitacion_id: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        amenity_id: data.amenity_id || data.amenityId || '',
        tipo_movimiento: data.tipo_movimiento || data.tipoMovimiento || 'ENTRADA',
        cantidad: data.cantidad || '1',
        motivo: data.motivo || '',
        habitacion_id: data.habitacion_id || data.habitacionId || ''
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

  const requiresRoom = formData.tipo_movimiento === 'SALIDA'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amenity *
        </label>
        <select
          name="amenity_id"
          value={formData.amenity_id}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">Seleccionar amenity...</option>
          {amenities.map(amenity => (
            <option key={amenity.id} value={amenity.id}>
              {amenity.nombre} - Stock: {amenity.stockActual || amenity.stock_actual || 0}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Movimiento *
          </label>
          <select
            name="tipo_movimiento"
            value={formData.tipo_movimiento}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="ENTRADA">Entrada (Compra)</option>
            <option value="SALIDA">Salida (Uso)</option>
            <option value="AJUSTE">Ajuste de Inventario</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad *
          </label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
            min="1"
            className="input-field"
          />
        </div>
      </div>

      {requiresRoom && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Habitación {requiresRoom ? '*' : ''}
          </label>
          <select
            name="habitacion_id"
            value={formData.habitacion_id}
            onChange={handleChange}
            required={requiresRoom}
            className="input-field"
          >
            <option value="">Seleccionar habitación...</option>
            {habitaciones.map(habitacion => (
              <option key={habitacion.id} value={habitacion.id}>
                Habitación {habitacion.numero}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Motivo *
        </label>
        <textarea
          name="motivo"
          value={formData.motivo}
          onChange={handleChange}
          required
          rows="3"
          className="input-field"
          placeholder="Motivo del movimiento de inventario"
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
          Registrar Movimiento
        </button>
      </div>
    </form>
  )
}

export default MovimientoInventarioForm
