import { useState, useEffect } from 'react'

const MantenimientoForm = ({ data, onSubmit, onCancel, habitaciones = [], empleados = [] }) => {
  const [formData, setFormData] = useState({
    habitacion_id: '',
    tipo: 'PREVENTIVO',
    prioridad: 'MEDIA',
    descripcion: '',
    empleado_asignado_id: '',
    fecha_programada: '',
    costo_estimado: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        habitacion_id: data.habitacion_id || data.habitacionId || '',
        tipo: data.tipo || 'PREVENTIVO',
        prioridad: data.prioridad || 'MEDIA',
        descripcion: data.descripcion || '',
        empleado_asignado_id: data.empleado_asignado_id || data.empleadoAsignadoId || '',
        fecha_programada: data.fecha_programada || data.fechaProgramada || '',
        costo_estimado: data.costo_estimado || data.costoEstimado || ''
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo *
          </label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="PREVENTIVO">Preventivo</option>
            <option value="CORRECTIVO">Correctivo</option>
            <option value="EMERGENCIA">Emergencia</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prioridad *
          </label>
          <select
            name="prioridad"
            value={formData.prioridad}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="BAJA">Baja</option>
            <option value="MEDIA">Media</option>
            <option value="ALTA">Alta</option>
            <option value="CRITICA">Crítica</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción *
        </label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
          rows="3"
          className="input-field"
          placeholder="Describa el problema o mantenimiento necesario"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Empleado Asignado
        </label>
        <select
          name="empleado_asignado_id"
          value={formData.empleado_asignado_id}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Sin asignar</option>
          {empleados.map(empleado => (
            <option key={empleado.id} value={empleado.id}>
              {empleado.nombre} {empleado.apellidos}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Programada
          </label>
          <input
            type="date"
            name="fecha_programada"
            value={formData.fecha_programada}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Costo Estimado (S/.)
          </label>
          <input
            type="number"
            name="costo_estimado"
            value={formData.costo_estimado}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="100.00"
            className="input-field"
          />
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
          {data ? 'Actualizar' : 'Crear'} Orden de Mantenimiento
        </button>
      </div>
    </form>
  )
}

export default MantenimientoForm
