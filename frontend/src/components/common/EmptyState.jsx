import { Inbox } from 'lucide-react'

const EmptyState = ({ 
  icon: Icon = Inbox, 
  title = 'No hay datos', 
  description = 'No se encontraron resultados',
  action = null 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <Icon className="text-gray-400 mb-4" size={48} />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      {action}
    </div>
  )
}

export default EmptyState
