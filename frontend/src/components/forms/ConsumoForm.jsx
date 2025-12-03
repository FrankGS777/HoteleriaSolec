import { useState, useEffect } from 'react'

const ConsumoForm = ({ data, onSubmit, onCancel, reservas = [], servicios = [] }) => {
  const [formData, setFormData] = useState({
    reserva_id: '',
    servicio_id: '',
    cantidad: '1',
    observaciones: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        reserva_id: data.reserva_id || data.reservaId || '',
        servicio_id: data.servicio_id || data.servicioId || '',
        cantidad: data.cantidad || '1',
        observaciones: data.observaciones || ''
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

  const selectedServicio = servicios.find(s => s.id === parseInt(formData.servicio_id))
  const total = selectedServicio ? selectedServicio.precio * parseFloat(formData.cantidad) : 0

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Reserva *
        </label>
        <select
          name="reserva_id"
          value={formData.reserva_id}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">Seleccionar reserva...</option>
          {reservas.map(reserva => (
            <option key={reserva.id} value={reserva.id}>
              Reserva #{reserva.id} - {reserva.clienteNombre} - Hab. {reserva.habitacionNumero}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Servicio *
        </label>
        <select
          name="servicio_id"
          value={formData.servicio_id}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">Seleccionar servicio...</option>
          {servicios.map(servicio => (
            <option key={servicio.id} value={servicio.id}>
              {servicio.nombre} - S/. {servicio.precio}
            </option>
          ))}
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

      {selectedServicio && (
        <div className="p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">S/. {total.toFixed(2)}</span>
          </div>
        </div>
      )}

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
          Registrar Consumo
        </button>
      </div>
    </form>
  )
}

export default ConsumoForm
