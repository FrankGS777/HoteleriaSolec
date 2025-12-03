import { useState, useEffect } from 'react'

const PagoForm = ({ data, onSubmit, onCancel, facturas = [] }) => {
  const [formData, setFormData] = useState({
    factura_id: '',
    monto: '',
    metodo_pago: 'EFECTIVO',
    numero_operacion: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        factura_id: data.factura_id || data.facturaId || '',
        monto: data.monto || '',
        metodo_pago: data.metodo_pago || data.metodoPago || 'EFECTIVO',
        numero_operacion: data.numero_operacion || data.numeroOperacion || ''
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

  const requiresOperationNumber = ['TARJETA', 'TRANSFERENCIA', 'YAPE', 'PLIN'].includes(formData.metodo_pago)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Factura *
        </label>
        <select
          name="factura_id"
          value={formData.factura_id}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">Seleccionar factura...</option>
          {facturas.map(factura => (
            <option key={factura.id} value={factura.id}>
              {factura.serie}-{factura.numero} - S/. {factura.total} - {factura.clienteNombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Monto (S/.) *
        </label>
        <input
          type="number"
          name="monto"
          value={formData.monto}
          onChange={handleChange}
          required
          min="0.01"
          step="0.01"
          placeholder="100.00"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Método de Pago *
        </label>
        <select
          name="metodo_pago"
          value={formData.metodo_pago}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="EFECTIVO">Efectivo</option>
          <option value="TARJETA">Tarjeta</option>
          <option value="TRANSFERENCIA">Transferencia</option>
          <option value="YAPE">Yape</option>
          <option value="PLIN">Plin</option>
        </select>
      </div>

      {requiresOperationNumber && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Operación *
          </label>
          <input
            type="text"
            name="numero_operacion"
            value={formData.numero_operacion}
            onChange={handleChange}
            required
            placeholder="Número de operación o código"
            className="input-field"
          />
        </div>
      )}

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
          Registrar Pago
        </button>
      </div>
    </form>
  )
}

export default PagoForm
