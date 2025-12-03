const StatusBadge = ({ status, type = 'default' }) => {
  const getColorClasses = () => {
    // Estado de habitaciones
    if (type === 'habitacion') {
      const colors = {
        DISPONIBLE: 'bg-green-100 text-green-800',
        OCUPADA: 'bg-red-100 text-red-800',
        LIMPIEZA: 'bg-yellow-100 text-yellow-800',
        MANTENIMIENTO: 'bg-orange-100 text-orange-800',
        BLOQUEADA: 'bg-gray-100 text-gray-800'
      }
      return colors[status] || 'bg-gray-100 text-gray-800'
    }

    // Estado de reservas
    if (type === 'reserva') {
      const colors = {
        PENDIENTE: 'bg-yellow-100 text-yellow-800',
        CONFIRMADA: 'bg-green-100 text-green-800',
        COMPLETADA: 'bg-blue-100 text-blue-800',
        CANCELADA: 'bg-red-100 text-red-800'
      }
      return colors[status] || 'bg-gray-100 text-gray-800'
    }

    // Estado de limpieza
    if (type === 'limpieza') {
      const colors = {
        LIMPIA: 'bg-green-100 text-green-800',
        SUCIA: 'bg-red-100 text-red-800',
        EN_LIMPIEZA: 'bg-yellow-100 text-yellow-800'
      }
      return colors[status] || 'bg-gray-100 text-gray-800'
    }

    // Estado de mantenimiento
    if (type === 'mantenimiento') {
      const colors = {
        PENDIENTE: 'bg-yellow-100 text-yellow-800',
        EN_PROCESO: 'bg-blue-100 text-blue-800',
        COMPLETADO: 'bg-green-100 text-green-800',
        CANCELADO: 'bg-red-100 text-red-800'
      }
      return colors[status] || 'bg-gray-100 text-gray-800'
    }

    // Estado general
    const colors = {
      ACTIVO: 'bg-green-100 text-green-800',
      INACTIVO: 'bg-red-100 text-red-800',
      PENDIENTE: 'bg-yellow-100 text-yellow-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getColorClasses()}`}>
      {status}
    </span>
  )
}

export default StatusBadge
