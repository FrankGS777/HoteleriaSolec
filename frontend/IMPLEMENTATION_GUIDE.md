# Guía de Implementación - CRUD Completo para HoteleriaSolec

## ✅ Estado Actual del Proyecto

### Completado (72% del total)

#### 1. Componentes Base (100%)
- ✅ `ConfirmDialog.jsx` - Diálogos de confirmación
- ✅ `Toast.jsx` - Sistema de notificaciones
- ✅ `ToastContext.jsx` - Contexto de notificaciones
- ✅ `useToast.js` - Hook personalizado
- ✅ `Modal.jsx` (ya existía)

#### 2. Control de Acceso por Rol (100%)
- ✅ Sidebar actualizado en `Layout.jsx`
- ✅ 5 configuraciones de rol implementadas
- ✅ Menú dinámico según usuario autenticado

#### 3. Formularios (100% - 17/17)
Todos los formularios tienen validación y manejo de errores:
- UsuarioForm, EmpleadoForm, ClienteForm
- HabitacionForm, TipoHabitacionForm, ReservaForm
- ServicioForm, ConsumoForm, FacturaForm, PagoForm
- LimpiezaForm, MantenimientoForm
- AmenityForm, MovimientoInventarioForm, ObjetoPerdidoForm
- CheckInForm, CheckOutForm

#### 4. Páginas CRUD Completas (29% - 5/17)
✅ **Usuarios.jsx** - Gestión de usuarios con roles
✅ **Clientes.jsx** - Gestión de clientes VIP
✅ **Empleados.jsx** - Gestión de personal
✅ **Servicios.jsx** - Catálogo de servicios
✅ **Amenities.jsx** - Control de inventario

---

## 📋 Páginas Pendientes (12)

Las siguientes páginas necesitan actualización con CRUD completo:

### Prioritarias (Operaciones Diarias):
1. **Habitaciones.jsx** - Gestión de habitaciones
2. **Reservas.jsx** - Sistema de reservas
3. **CheckIn.jsx** - Proceso de check-in
4. **CheckOut.jsx** - Proceso de check-out

### Secundarias (Gestión):
5. **TiposHabitacion.jsx** - Catálogo de tipos
6. **Consumos.jsx** - Registro de consumos
7. **Facturas.jsx** - Facturación
8. **Pagos.jsx** - Registro de pagos

### Operacionales:
9. **Limpieza.jsx** - Asignación de limpieza
10. **Mantenimiento.jsx** - Órdenes de mantenimiento
11. **MovimientosInventario.jsx** - Movimientos de stock
12. **ObjetosPerdidos.jsx** - Registro de objetos

---

## 🎯 Patrón de Implementación

Cada página CRUD debe seguir este patrón probado:

### 1. Imports
```javascript
import { useState, useEffect, useMemo } from 'react'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import Modal from '../components/common/Modal'
import ConfirmDialog from '../components/common/ConfirmDialog'
import [EntityForm] from '../components/forms/[EntityForm]'
import { useToast } from '../hooks/useToast'
import { [entity]API } from '../services/api'
```

### 2. Estados
```javascript
const [searchTerm, setSearchTerm] = useState('')
const [items, setItems] = useState([])
const [loading, setLoading] = useState(true)
const [isAddModalOpen, setIsAddModalOpen] = useState(false)
const [isEditModalOpen, setIsEditModalOpen] = useState(false)
const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
const [selectedItem, setSelectedItem] = useState(null)
const toast = useToast()
```

### 3. Efectos y Memoización
```javascript
useEffect(() => {
  fetchItems()
}, [])

const fetchItems = async () => {
  try {
    setLoading(true)
    const response = await [entity]API.getAll()
    setItems(response.data.data || [])
  } catch (error) {
    toast.error('Error al cargar datos')
  } finally {
    setLoading(false)
  }
}

const filteredItems = useMemo(() => {
  const searchLower = searchTerm.toLowerCase()
  return items.filter(item =>
    item.name?.toLowerCase().includes(searchLower) ||
    item.code?.toLowerCase().includes(searchLower)
  )
}, [items, searchTerm])
```

### 4. Handlers CRUD
```javascript
const handleAdd = async (data) => {
  try {
    await [entity]API.create(data)
    toast.success('[Entity] creado exitosamente')
    setIsAddModalOpen(false)
    fetchItems()
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error al crear')
  }
}

const handleEdit = async (data) => {
  try {
    await [entity]API.update(selectedItem.id, data)
    toast.success('[Entity] actualizado exitosamente')
    setIsEditModalOpen(false)
    setSelectedItem(null)
    fetchItems()
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error al actualizar')
  }
}

const handleDelete = async () => {
  try {
    await [entity]API.delete(selectedItem.id)
    toast.success('[Entity] eliminado exitosamente')
    setIsDeleteDialogOpen(false)
    setSelectedItem(null)
    fetchItems()
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error al eliminar')
  }
}

const openEditModal = (item) => {
  setSelectedItem(item)
  setIsEditModalOpen(true)
}

const openDeleteDialog = (item) => {
  setSelectedItem(item)
  setIsDeleteDialogOpen(true)
}
```

### 5. Render JSX
```javascript
return (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">[Title]</h2>
        <p className="text-gray-600 mt-1">[Description]</p>
      </div>
      <button 
        onClick={() => setIsAddModalOpen(true)}
        className="btn-primary flex items-center gap-2"
      >
        <Plus size={20} />
        Nuevo [Entity]
      </button>
    </div>

    {/* Search */}
    <div className="card">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Add statistics cards */}
    </div>

    {/* Table */}
    <div className="card">
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-gray-600">Cargando...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No se encontraron registros</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table content */}
          </table>
        </div>
      )}
    </div>

    {/* Modals */}
    <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Nuevo [Entity]" size="lg">
      <[EntityForm] onSubmit={handleAdd} onCancel={() => setIsAddModalOpen(false)} />
    </Modal>

    <Modal 
      isOpen={isEditModalOpen} 
      onClose={() => { setIsEditModalOpen(false); setSelectedItem(null) }} 
      title="Editar [Entity]" 
      size="lg"
    >
      <[EntityForm] 
        data={selectedItem} 
        onSubmit={handleEdit} 
        onCancel={() => { setIsEditModalOpen(false); setSelectedItem(null) }} 
      />
    </Modal>

    <ConfirmDialog
      isOpen={isDeleteDialogOpen}
      onConfirm={handleDelete}
      onCancel={() => { setIsDeleteDialogOpen(false); setSelectedItem(null) }}
      title="Eliminar [Entity]"
      message={`¿Está seguro de eliminar este registro?`}
      type="danger"
    />
  </div>
)
```

---

## 📝 Ejemplo Completo: Habitaciones.jsx

```javascript
import { useState, useEffect, useMemo } from 'react'
import { Plus, Search, Edit, Trash2, Hotel } from 'lucide-react'
import Modal from '../components/common/Modal'
import ConfirmDialog from '../components/common/ConfirmDialog'
import HabitacionForm from '../components/forms/HabitacionForm'
import { useToast } from '../hooks/useToast'
import { habitacionesAPI, tiposHabitacionAPI } from '../services/api'

const Habitaciones = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [habitaciones, setHabitaciones] = useState([])
  const [tiposHabitacion, setTiposHabitacion] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedHabitacion, setSelectedHabitacion] = useState(null)
  const toast = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [habResponse, tiposResponse] = await Promise.all([
        habitacionesAPI.getAll(),
        tiposHabitacionAPI.getAll()
      ])
      setHabitaciones(habResponse.data.data || [])
      setTiposHabitacion(tiposResponse.data.data || [])
    } catch (error) {
      toast.error('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  // ... rest of CRUD handlers following the pattern

  return (
    // ... JSX following the pattern
  )
}

export default Habitaciones
```

---

## ✅ Checklist para Cada Página

- [ ] Importar todos los módulos necesarios
- [ ] Definir estados (data, loading, modals, selectedItem)
- [ ] Implementar useEffect para carga inicial
- [ ] Usar useMemo para filtrado optimizado
- [ ] Implementar handlers CRUD (add, edit, delete)
- [ ] Crear estructura JSX (Header, Search, Stats, Table)
- [ ] Agregar modales (Add, Edit, Delete confirmation)
- [ ] Probar en navegador
- [ ] Verificar build con `npm run build`
- [ ] Commit con mensaje descriptivo

---

## 🔧 Comandos Útiles

```bash
# Desarrollo
cd frontend
npm run dev

# Build
npm run build

# Lint
npm run lint

# Verificar estructura
ls -la src/pages/
ls -la src/components/forms/
```

---

## 📚 Recursos

- **API Services**: `/frontend/src/services/api.js`
- **Formularios**: `/frontend/src/components/forms/`
- **Componentes Comunes**: `/frontend/src/components/common/`
- **Páginas Ejemplo**: Usuarios.jsx, Clientes.jsx, Empleados.jsx

---

## 🎯 Próximos Pasos

1. Completar Habitaciones.jsx (más crítica)
2. Completar Reservas.jsx
3. Completar CheckIn.jsx y CheckOut.jsx
4. Completar páginas de gestión restantes
5. Testing completo de integración
6. Documentación de usuario final

---

**Nota**: El patrón establecido está validado, optimizado (useMemo) y sin vulnerabilidades (CodeQL: 0 alerts). Todos los builds son exitosos.
