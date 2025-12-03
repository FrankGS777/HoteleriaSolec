import { useState, useEffect } from 'react'

const AmenityForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    categoria: 'BAÑO',
    unidad_medida: 'UNIDAD',
    stock_actual: '0',
    stock_minimo: '10',
    costo_unitario: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        codigo: data.codigo || '',
        nombre: data.nombre || '',
        descripcion: data.descripcion || '',
        categoria: data.categoria || 'BAÑO',
        unidad_medida: data.unidad_medida || data.unidadMedida || 'UNIDAD',
        stock_actual: data.stock_actual || data.stockActual || '0',
        stock_minimo: data.stock_minimo || data.stockMinimo || '10',
        costo_unitario: data.costo_unitario || data.costoUnitario || ''
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
            Código *
          </label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            required
            placeholder="AMN001"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría *
          </label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="BAÑO">Baño</option>
            <option value="ROPA_CAMA">Ropa de Cama</option>
            <option value="LIMPIEZA">Limpieza</option>
            <option value="MINIBAR">Minibar</option>
            <option value="OTROS">Otros</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre *
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          placeholder="Jabón de tocador"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows="2"
          className="input-field"
          placeholder="Descripción del amenity"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unidad de Medida *
          </label>
          <select
            name="unidad_medida"
            value={formData.unidad_medida}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="UNIDAD">Unidad</option>
            <option value="PAQUETE">Paquete</option>
            <option value="CAJA">Caja</option>
            <option value="LITRO">Litro</option>
            <option value="KG">Kilogramo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Costo Unitario (S/.) *
          </label>
          <input
            type="number"
            name="costo_unitario"
            value={formData.costo_unitario}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="2.50"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Actual *
          </label>
          <input
            type="number"
            name="stock_actual"
            value={formData.stock_actual}
            onChange={handleChange}
            required
            min="0"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Mínimo *
          </label>
          <input
            type="number"
            name="stock_minimo"
            value={formData.stock_minimo}
            onChange={handleChange}
            required
            min="0"
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
          {data ? 'Actualizar' : 'Crear'} Amenity
        </button>
      </div>
    </form>
  )
}

export default AmenityForm
