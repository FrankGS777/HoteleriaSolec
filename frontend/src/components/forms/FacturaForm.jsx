import { useState, useEffect } from 'react'

const FacturaForm = ({ data, onSubmit, onCancel, reservas = [] }) => {
  const [formData, setFormData] = useState({
    reserva_id: '',
    tipo_comprobante: 'BOLETA'
  })

  useEffect(() => {
    if (data) {
      setFormData({
        reserva_id: data.reserva_id || data.reservaId || '',
        tipo_comprobante: data.tipo_comprobante || data.tipoComprobante || 'BOLETA'
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
              Reserva #{reserva.id} - {reserva.clienteNombre} - Total: S/. {reserva.total || '0.00'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Comprobante *
        </label>
        <select
          name="tipo_comprobante"
          value={formData.tipo_comprobante}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="BOLETA">Boleta</option>
          <option value="FACTURA">Factura</option>
        </select>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        <p className="text-sm text-blue-800">
          La factura se generará automáticamente con todos los detalles de la reserva, habitaciones y consumos asociados.
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
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium"
        >
          Generar Factura
        </button>
      </div>
    </form>
  )
}

export default FacturaForm
