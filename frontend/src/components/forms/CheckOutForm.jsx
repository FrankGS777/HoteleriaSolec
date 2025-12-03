import { useState, useEffect } from 'react'

const CheckOutForm = ({ data, onSubmit, onCancel, reservas = [] }) => {
  const [formData, setFormData] = useState({
    reserva_id: '',
    hora_salida_real: '',
    estado_habitacion: 'LIMPIEZA_REQUERIDA',
    observaciones: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        reserva_id: data.reserva_id || data.reservaId || '',
        hora_salida_real: data.hora_salida_real || data.horaSalidaReal || '',
        estado_habitacion: data.estado_habitacion || data.estadoHabitacion || 'LIMPIEZA_REQUERIDA',
        observaciones: data.observaciones || ''
      })
    } else {
      // Set default time to now
      const now = new Date().toISOString().slice(0, 16)
      setFormData(prev => ({ ...prev, hora_salida_real: now }))
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
          Hora de Salida Real *
        </label>
        <input
          type="datetime-local"
          name="hora_salida_real"
          value={formData.hora_salida_real}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estado de la Habitación *
        </label>
        <select
          name="estado_habitacion"
          value={formData.estado_habitacion}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="LIMPIEZA_REQUERIDA">Limpieza Requerida</option>
          <option value="BUEN_ESTADO">Buen Estado</option>
          <option value="REQUIERE_MANTENIMIENTO">Requiere Mantenimiento</option>
          <option value="DANOS_REPORTADOS">Daños Reportados</option>
        </select>
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
          placeholder="Observaciones del check-out, consumos adicionales, estado de la habitación, etc."
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
        <p className="text-sm text-yellow-800">
          <strong>Nota:</strong> Asegúrese de haber verificado todos los consumos y el estado de la habitación antes de realizar el check-out.
        </p>
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
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
        >
          Realizar Check-Out
        </button>
      </div>
    </form>
  )
}

export default CheckOutForm
