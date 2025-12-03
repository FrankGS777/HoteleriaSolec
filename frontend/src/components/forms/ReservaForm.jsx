import { useState, useEffect } from 'react'

const ReservaForm = ({ data, onSubmit, onCancel, clientes = [], habitaciones = [] }) => {
  const [formData, setFormData] = useState({
    cliente_id: '',
    fecha_entrada: '',
    fecha_salida: '',
    numero_adultos: '1',
    numero_ninos: '0',
    tipo_reserva: 'PRESENCIAL',
    observaciones: '',
    habitacion_ids: []
  })

  useEffect(() => {
    if (data) {
      setFormData({
        cliente_id: data.cliente_id || data.clienteId || '',
        fecha_entrada: data.fecha_entrada || data.fechaEntrada || '',
        fecha_salida: data.fecha_salida || data.fechaSalida || '',
        numero_adultos: data.numero_adultos || data.numeroAdultos || '1',
        numero_ninos: data.numero_ninos || data.numeroNinos || '0',
        tipo_reserva: data.tipo_reserva || data.tipoReserva || 'PRESENCIAL',
        observaciones: data.observaciones || '',
        habitacion_ids: data.habitacion_ids || data.habitacionIds || []
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

  const handleHabitacionToggle = (habitacionId) => {
    setFormData(prev => ({
      ...prev,
      habitacion_ids: prev.habitacion_ids.includes(habitacionId)
        ? prev.habitacion_ids.filter(id => id !== habitacionId)
        : [...prev.habitacion_ids, habitacionId]
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
          Cliente *
        </label>
        <select
          name="cliente_id"
          value={formData.cliente_id}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">Seleccionar cliente...</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre} {cliente.apellidos} - {cliente.numeroDocumento || cliente.numero_documento}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Entrada *
          </label>
          <input
            type="date"
            name="fecha_entrada"
            value={formData.fecha_entrada}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Salida *
          </label>
          <input
            type="date"
            name="fecha_salida"
            value={formData.fecha_salida}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Adultos *
          </label>
          <input
            type="number"
            name="numero_adultos"
            value={formData.numero_adultos}
            onChange={handleChange}
            required
            min="1"
            max="10"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Niños
          </label>
          <input
            type="number"
            name="numero_ninos"
            value={formData.numero_ninos}
            onChange={handleChange}
            min="0"
            max="10"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Reserva *
        </label>
        <select
          name="tipo_reserva"
          value={formData.tipo_reserva}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="PRESENCIAL">Presencial</option>
          <option value="TELEFONO">Teléfono</option>
          <option value="WEB">Web</option>
          <option value="EMAIL">Email</option>
          <option value="AGENCIA">Agencia</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Habitaciones *
        </label>
        <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
          {habitaciones.length === 0 ? (
            <p className="text-sm text-gray-500">No hay habitaciones disponibles</p>
          ) : (
            habitaciones.map(habitacion => (
              <label key={habitacion.id} className="flex items-center py-1 cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.habitacion_ids.includes(habitacion.id)}
                  onChange={() => handleHabitacionToggle(habitacion.id)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">
                  Habitación {habitacion.numero} - {habitacion.tipoNombre || 'N/A'}
                </span>
              </label>
            ))
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Observaciones
        </label>
        <textarea
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          rows="3"
          className="input-field"
          placeholder="Observaciones adicionales"
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
          {data ? 'Actualizar' : 'Crear'} Reserva
        </button>
      </div>
    </form>
  )
}

export default ReservaForm
