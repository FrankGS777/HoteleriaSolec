import { useState } from 'react'
import { Plus, Search, TrendingUp, TrendingDown } from 'lucide-react'

const MovimientosInventario = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const movimientos = [
    {
      id: 1,
      fecha: '2024-12-03 10:30',
      tipo: 'ENTRADA',
      producto: 'Toallas de baño',
      cantidad: 50,
      motivo: 'Compra',
      stockAnterior: 100,
      stockNuevo: 150,
      usuario: 'Admin',
      observaciones: 'Reposición mensual'
    },
    {
      id: 2,
      fecha: '2024-12-03 14:15',
      tipo: 'SALIDA',
      producto: 'Shampoo',
      cantidad: 20,
      motivo: 'Consumo habitaciones',
      stockAnterior: 100,
      stockNuevo: 80,
      usuario: 'Ana López',
      observaciones: null
    },
    {
      id: 3,
      fecha: '2024-12-03 09:00',
      tipo: 'ENTRADA',
      producto: 'Agua embotellada 500ml',
      cantidad: 100,
      motivo: 'Compra',
      stockAnterior: 200,
      stockNuevo: 300,
      usuario: 'Admin',
      observaciones: 'Proveedor ABC'
    },
    {
      id: 4,
      fecha: '2024-12-02 16:30',
      tipo: 'SALIDA',
      producto: 'Papel higiénico',
      cantidad: 30,
      motivo: 'Consumo habitaciones',
      stockAnterior: 230,
      stockNuevo: 200,
      usuario: 'María García',
      observaciones: null
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Movimientos de Inventario</h2>
          <p className="text-gray-600 mt-1">Registro de entradas y salidas de productos</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Registrar Movimiento
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por producto o usuario..."
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
            <TrendingUp className="text-green-600" size={20} />
            <div className="text-sm text-gray-600">Entradas Hoy</div>
          </div>
          <div className="text-2xl font-bold text-green-600">2</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2">
            <TrendingDown className="text-red-600" size={20} />
            <div className="text-sm text-gray-600">Salidas Hoy</div>
          </div>
          <div className="text-2xl font-bold text-red-600">2</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Total Movimientos Hoy</div>
          <div className="text-2xl font-bold text-blue-600">4</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Movimientos Este Mes</div>
          <div className="text-2xl font-bold text-purple-600">145</div>
        </div>
      </div>

      {/* Movimientos Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motivo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movimientos.map((mov) => (
                <tr key={mov.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mov.fecha}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {mov.tipo === 'ENTRADA' ? (
                        <>
                          <TrendingUp className="text-green-600" size={16} />
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            ENTRADA
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="text-red-600" size={16} />
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            SALIDA
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {mov.producto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`text-lg font-bold ${
                      mov.tipo === 'ENTRADA' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {mov.tipo === 'ENTRADA' ? '+' : '-'}{mov.cantidad}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {mov.motivo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{mov.stockAnterior} → {mov.stockNuevo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {mov.usuario}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900">
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MovimientosInventario
