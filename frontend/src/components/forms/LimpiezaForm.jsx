import { useState, useEffect } from 'react'

const LimpiezaForm = ({ data, onSubmit, onCancel, habitaciones = [], empleados = [] }) => {
  const [formData, setFormData] = useState({
    habitacion_id: '',
    empleado_id: '',
    fecha_programada: '',
    tipo_limpieza: 'DIARIA'
  })

  useEffect(() => {
    if (data) {
      setFormData({
        habitacion_id: data.habitacion_id || data.habitacionId || '',
        empleado_id: data.empleado_id || data.empleadoId || '',
        fecha_programada: data.fecha_programada || data.fechaProgramada || '',
        tipo_limpieza: data.tipo_limpieza || data.tipoLimpieza || 'DIARIA'
      })
    } else {
      // Set default date to today
      const today = new Date().toISOString().split('T')[0]
      setFormData(prev => ({ ...prev, fecha_programada: today }))
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
          Habitación *
        </label>
        <select
          name="habitacion_id"
          value={formData.habitacion_id}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">Seleccionar habitación...</option>
          {habitaciones.map(habitacion => (
            <option key={habitacion.id} value={habitacion.id}>
              Habitación {habitacion.numero} - Piso {habitacion.piso}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Empleado Asignado *
        </label>
        <select
          name="empleado_id"
          value={formData.empleado_id}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">Seleccionar empleado...</option>
          {empleados.map(empleado => (
            <option key={empleado.id} value={empleado.id}>
              {empleado.nombre} {empleado.apellidos}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha Programada *
        </label>
        <input
          type="date"
          name="fecha_programada"
          value={formData.fecha_programada}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Limpieza *
        </label>
        <select
          name="tipo_limpieza"
          value={formData.tipo_limpieza}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="DIARIA">Limpieza Diaria</option>
          <option value="PROFUNDA">Limpieza Profunda</option>
          <option value="EXPRESS">Limpieza Express</option>
          <option value="CHECKOUT">Limpieza Post Check-out</option>
        </select>
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
          {data ? 'Actualizar' : 'Asignar'} Limpieza
        </button>
      </div>
    </form>
  )
}

export default LimpiezaForm
