import { useState } from 'react'
import { Plus, Search, Package, AlertCircle } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'

const Amenities = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const amenities = [
    {
      id: 1,
      codigo: 'AM-001',
      nombre: 'Toallas de baño',
      categoria: 'Baño',
      unidad: 'Unidad',
      stockActual: 150,
      stockMinimo: 50,
      stockMaximo: 200,
      costoUnitario: 15,
      ubicacion: 'Almacén Principal',
      activo: true
    },
    {
      id: 2,
      codigo: 'AM-002',
      nombre: 'Shampoo',
      categoria: 'Baño',
      unidad: 'Unidad',
      stockActual: 80,
      stockMinimo: 100,
      stockMaximo: 200,
      costoUnitario: 8,
      ubicacion: 'Almacén Principal',
      activo: true
    },
    {
      id: 3,
      codigo: 'AM-003',
      nombre: 'Agua embotellada 500ml',
      categoria: 'Bebidas',
      unidad: 'Unidad',
      stockActual: 300,
      stockMinimo: 150,
      stockMaximo: 400,
      costoUnitario: 2,
      ubicacion: 'Almacén Cocina',
      activo: true
    },
    {
      id: 4,
      codigo: 'AM-004',
      nombre: 'Papel higiénico',
      categoria: 'Baño',
      unidad: 'Rollo',
      stockActual: 200,
      stockMinimo: 100,
      stockMaximo: 300,
      costoUnitario: 3,
      ubicacion: 'Almacén Principal',
      activo: true
    }
  ]

  const getStockStatus = (actual, minimo) => {
    if (actual <= minimo) return { color: 'text-red-600', label: 'Bajo' }
    if (actual <= minimo * 1.5) return { color: 'text-yellow-600', label: 'Medio' }
    return { color: 'text-green-600', label: 'Óptimo' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Amenities e Inventario</h2>
          <p className="text-gray-600 mt-1">Gestión de productos y suministros del hotel</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nuevo Producto
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por código, nombre o categoría..."
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
            <Package className="text-blue-600" size={20} />
            <div className="text-sm text-gray-600">Total Productos</div>
          </div>
          <div className="text-2xl font-bold text-blue-600">4</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-red-600" size={20} />
            <div className="text-sm text-gray-600">Stock Bajo</div>
          </div>
          <div className="text-2xl font-bold text-red-600">1</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Categorías</div>
          <div className="text-2xl font-bold text-purple-600">2</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Valor Total Inventario</div>
          <div className="text-2xl font-bold text-gold-600">S/ 4,790</div>
        </div>
      </div>

      {/* Amenities Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Min/Max
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Costo Unit.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {amenities.map((amenity) => {
                const stockStatus = getStockStatus(amenity.stockActual, amenity.stockMinimo)
                return (
                  <tr key={amenity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-primary-600">
                        {amenity.codigo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{amenity.nombre}</div>
                      <div className="text-sm text-gray-500">{amenity.unidad}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {amenity.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-lg font-bold ${stockStatus.color}`}>
                        {amenity.stockActual}
                      </div>
                      <div className="text-xs text-gray-500">{stockStatus.label}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>Min: {amenity.stockMinimo}</div>
                      <div>Max: {amenity.stockMaximo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      S/ {amenity.costoUnitario}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={amenity.activo ? 'ACTIVO' : 'INACTIVO'} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        Editar
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        Movimiento
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Amenities
