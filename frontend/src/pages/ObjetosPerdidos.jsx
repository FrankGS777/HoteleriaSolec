import { useState } from 'react'
import { Plus, Search, Package } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'

const ObjetosPerdidos = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const objetosPerdidos = [
    {
      id: 1,
      numero: 'OBJ-001',
      descripcion: 'Maleta negra marca Samsonite',
      categoria: 'Equipaje',
      habitacion: '201',
      fechaHallazgo: '2024-12-03',
      lugarHallazgo: 'Habitación',
      encontradoPor: 'Ana López',
      estado: 'PENDIENTE',
      observaciones: 'En buen estado'
    },
    {
      id: 2,
      numero: 'OBJ-002',
      descripcion: 'Teléfono celular iPhone 13',
      categoria: 'Electrónica',
      habitacion: '303',
      fechaHallazgo: '2024-12-02',
      lugarHallazgo: 'Habitación',
      encontradoPor: 'María García',
      estado: 'RECLAMADO',
      fechaEntrega: '2024-12-03',
      entregadoA: 'Carlos López Martínez',
      documentoReclamante: '45678912',
      observaciones: null
    },
    {
      id: 3,
      numero: 'OBJ-003',
      descripcion: 'Gafas de sol Ray-Ban',
      categoria: 'Accesorios',
      habitacion: null,
      fechaHallazgo: '2024-12-01',
      lugarHallazgo: 'Restaurante',
      encontradoPor: 'Carlos Ramírez',
      estado: 'PENDIENTE',
      observaciones: 'Encontrado en mesa del restaurante'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Objetos Perdidos</h2>
          <p className="text-gray-600 mt-1">Registro y control de objetos extraviados</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Registrar Objeto
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por número, descripción o habitación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-2">
            <Package className="text-yellow-600" size={20} />
            <div className="text-sm text-gray-600">Pendientes</div>
          </div>
          <div className="text-2xl font-bold text-yellow-600">2</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Reclamados Este Mes</div>
          <div className="text-2xl font-bold text-green-600">1</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Total Registrados</div>
          <div className="text-2xl font-bold text-blue-600">3</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">% Recuperación</div>
          <div className="text-2xl font-bold text-purple-600">33%</div>
        </div>
      </div>

      {/* Objetos Perdidos */}
      <div className="space-y-4">
        {objetosPerdidos.map((objeto) => (
          <div key={objeto.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg font-bold text-primary-600">{objeto.numero}</span>
                  <StatusBadge 
                    status={objeto.estado}
                    type="reserva"
                  />
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                    {objeto.categoria}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">{objeto.descripcion}</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Hallazgo</h4>
                    <p className="text-sm text-gray-600">Fecha: {objeto.fechaHallazgo}</p>
                    <p className="text-sm text-gray-600">Lugar: {objeto.lugarHallazgo}</p>
                    {objeto.habitacion && (
                      <p className="text-sm text-gray-600">Habitación: {objeto.habitacion}</p>
                    )}
                    <p className="text-sm text-gray-600">Por: {objeto.encontradoPor}</p>
                  </div>

                  {objeto.estado === 'RECLAMADO' && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Entrega</h4>
                      <p className="text-sm text-gray-600">Fecha: {objeto.fechaEntrega}</p>
                      <p className="text-sm text-gray-600">Entregado a: {objeto.entregadoA}</p>
                      <p className="text-sm text-gray-600">Documento: {objeto.documentoReclamante}</p>
                    </div>
                  )}

                  {objeto.observaciones && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Observaciones</h4>
                      <p className="text-sm text-gray-600">{objeto.observaciones}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="ml-6 flex flex-col gap-2">
                {objeto.estado === 'PENDIENTE' && (
                  <>
                    <button className="btn-primary whitespace-nowrap">
                      Entregar
                    </button>
                    <button className="btn-secondary text-sm">
                      Editar
                    </button>
                  </>
                )}
                {objeto.estado === 'RECLAMADO' && (
                  <button className="btn-secondary text-sm">
                    Ver Detalles
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {objetosPerdidos.length === 0 && (
        <div className="card text-center py-12 text-gray-500">
          <Package size={48} className="mx-auto mb-4 text-gray-400" />
          <p>No hay objetos perdidos registrados</p>
        </div>
      )}
    </div>
  )
}

export default ObjetosPerdidos
