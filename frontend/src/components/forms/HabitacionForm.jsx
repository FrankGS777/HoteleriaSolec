import { useState, useEffect } from 'react'

const HabitacionForm = ({ data, onSubmit, onCancel, tiposHabitacion = [] }) => {
  const [formData, setFormData] = useState({
    numero: '',
    piso: '1',
    tipo_habitacion_id: '',
    estado: 'DISPONIBLE',
    estado_limpieza: 'LIMPIA'
  })

  useEffect(() => {
    if (data) {
      setFormData({
        numero: data.numero || '',
        piso: data.piso || '1',
        tipo_habitacion_id: data.tipo_habitacion_id || data.tipoHabitacionId || '',
        estado: data.estado || 'DISPONIBLE',
        estado_limpieza: data.estado_limpieza || data.estadoLimpieza || 'LIMPIA'
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
            Número de Habitación *
          </label>
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
            placeholder="101"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Piso *
          </label>
          <select
            name="piso"
            value={formData.piso}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="1">Piso 1</option>
            <option value="2">Piso 2</option>
            <option value="3">Piso 3</option>
            <option value="4">Piso 4</option>
            <option value="5">Piso 5</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Habitación *
        </label>
        <select
          name="tipo_habitacion_id"
          value={formData.tipo_habitacion_id}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">Seleccionar tipo...</option>
          {tiposHabitacion.map(tipo => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado *
          </label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="DISPONIBLE">Disponible</option>
            <option value="OCUPADA">Ocupada</option>
            <option value="MANTENIMIENTO">Mantenimiento</option>
            <option value="RESERVADA">Reservada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado de Limpieza *
          </label>
          <select
            name="estado_limpieza"
            value={formData.estado_limpieza}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="LIMPIA">Limpia</option>
            <option value="SUCIA">Sucia</option>
            <option value="EN_LIMPIEZA">En Limpieza</option>
            <option value="INSPECCION">Inspección</option>
          </select>
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
          {data ? 'Actualizar' : 'Crear'} Habitación
        </button>
      </div>
    </form>
  )
}

export default HabitacionForm
