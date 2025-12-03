import { useState, useEffect } from 'react'

const CheckInForm = ({ data, onSubmit, onCancel, reservas = [] }) => {
  const [formData, setFormData] = useState({
    reserva_id: '',
    hora_entrada_real: '',
    observaciones: '',
    huespedes: [{ nombre_completo: '', tipo_documento: 'DNI', numero_documento: '' }]
  })

  useEffect(() => {
    if (data) {
      setFormData({
        reserva_id: data.reserva_id || data.reservaId || '',
        hora_entrada_real: data.hora_entrada_real || data.horaEntradaReal || '',
        observaciones: data.observaciones || '',
        huespedes: data.huespedes || [{ nombre_completo: '', tipo_documento: 'DNI', numero_documento: '' }]
      })
    } else {
      // Set default time to now
      const now = new Date().toISOString().slice(0, 16)
      setFormData(prev => ({ ...prev, hora_entrada_real: now }))
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleHuespedChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      huespedes: prev.huespedes.map((h, i) => 
        i === index ? { ...h, [field]: value } : h
      )
    }))
  }

  const addHuesped = () => {
    setFormData(prev => ({
      ...prev,
      huespedes: [...prev.huespedes, { nombre_completo: '', tipo_documento: 'DNI', numero_documento: '' }]
    }))
  }

  const removeHuesped = (index) => {
    if (formData.huespedes.length > 1) {
      setFormData(prev => ({
        ...prev,
        huespedes: prev.huespedes.filter((_, i) => i !== index)
      }))
    }
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
          Hora de Entrada Real *
        </label>
        <input
          type="datetime-local"
          name="hora_entrada_real"
          value={formData.hora_entrada_real}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Huéspedes *
          </label>
          <button
            type="button"
            onClick={addHuesped}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            + Agregar Huésped
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.huespedes.map((huesped, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-3">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-700">Huésped {index + 1}</span>
                {formData.huespedes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHuesped(index)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                )}
              </div>
              
              <div className="space-y-2">
                <input
                  type="text"
                  value={huesped.nombre_completo}
                  onChange={(e) => handleHuespedChange(index, 'nombre_completo', e.target.value)}
                  required
                  placeholder="Nombre completo"
                  className="input-field text-sm"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={huesped.tipo_documento}
                    onChange={(e) => handleHuespedChange(index, 'tipo_documento', e.target.value)}
                    required
                    className="input-field text-sm"
                  >
                    <option value="DNI">DNI</option>
                    <option value="PASAPORTE">Pasaporte</option>
                    <option value="CARNET_EXTRANJERIA">Carnet Ext.</option>
                  </select>
                  
                  <input
                    type="text"
                    value={huesped.numero_documento}
                    onChange={(e) => handleHuespedChange(index, 'numero_documento', e.target.value)}
                    required
                    placeholder="Número documento"
                    className="input-field text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
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
          rows="2"
          className="input-field"
          placeholder="Observaciones del check-in"
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
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium"
        >
          Realizar Check-In
        </button>
      </div>
    </form>
  )
}

export default CheckInForm
