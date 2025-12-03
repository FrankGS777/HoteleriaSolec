import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API Methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  validate: () => api.get('/auth/validate')
}

export const habitacionesAPI = {
  getAll: () => api.get('/habitaciones'),
  getById: (id) => api.get(`/habitaciones/${id}`),
  create: (data) => api.post('/habitaciones', data),
  update: (id, data) => api.put(`/habitaciones/${id}`, data),
  delete: (id) => api.delete(`/habitaciones/${id}`),
  getDisponibles: () => api.get('/habitaciones/disponibles')
}

export const reservasAPI = {
  getAll: () => api.get('/reservas'),
  getById: (id) => api.get(`/reservas/${id}`),
  create: (data) => api.post('/reservas', data),
  update: (id, data) => api.put(`/reservas/${id}`, data),
  cancel: (id, motivo) => api.post(`/reservas/${id}/cancelar`, { motivo })
}

export const clientesAPI = {
  getAll: () => api.get('/clientes'),
  getById: (id) => api.get(`/clientes/${id}`),
  create: (data) => api.post('/clientes', data),
  update: (id, data) => api.put(`/clientes/${id}`, data)
}

export const usuariosAPI = {
  getAll: () => api.get('/usuarios'),
  getById: (id) => api.get(`/usuarios/${id}`),
  create: (data) => api.post('/usuarios', data),
  update: (id, data) => api.put(`/usuarios/${id}`, data),
  delete: (id) => api.delete(`/usuarios/${id}`)
}

export const empleadosAPI = {
  getAll: () => api.get('/empleados'),
  getById: (id) => api.get(`/empleados/${id}`),
  create: (data) => api.post('/empleados', data),
  update: (id, data) => api.put(`/empleados/${id}`, data),
  delete: (id) => api.delete(`/empleados/${id}`)
}

export const checkinAPI = {
  getAll: () => api.get('/checkins'),
  getById: (id) => api.get(`/checkins/${id}`),
  create: (data) => api.post('/checkins', data)
}

export const checkoutAPI = {
  getAll: () => api.get('/checkouts'),
  getById: (id) => api.get(`/checkouts/${id}`),
  create: (data) => api.post('/checkouts', data)
}

export const huespedesAPI = {
  getAll: () => api.get('/huespedes'),
  getActivos: () => api.get('/huespedes/activos')
}

export const serviciosAPI = {
  getAll: () => api.get('/servicios'),
  getById: (id) => api.get(`/servicios/${id}`),
  create: (data) => api.post('/servicios', data),
  update: (id, data) => api.put(`/servicios/${id}`, data),
  delete: (id) => api.delete(`/servicios/${id}`)
}

export const consumosAPI = {
  getAll: () => api.get('/consumos'),
  getByReserva: (reservaId) => api.get(`/consumos/reserva/${reservaId}`),
  create: (data) => api.post('/consumos', data)
}

export const facturasAPI = {
  getAll: () => api.get('/facturas'),
  getById: (id) => api.get(`/facturas/${id}`),
  create: (data) => api.post('/facturas', data),
  getPDF: (id) => api.get(`/facturas/${id}/pdf`, { responseType: 'blob' })
}

export const pagosAPI = {
  getAll: () => api.get('/pagos'),
  getByFactura: (facturaId) => api.get(`/pagos/factura/${facturaId}`),
  create: (data) => api.post('/pagos', data)
}

export const limpiezaAPI = {
  getAll: () => api.get('/limpieza'),
  getById: (id) => api.get(`/limpieza/${id}`),
  create: (data) => api.post('/limpieza', data),
  update: (id, data) => api.put(`/limpieza/${id}`, data),
  completar: (id) => api.post(`/limpieza/${id}/completar`)
}

export const tiposHabitacionAPI = {
  getAll: () => api.get('/tipos-habitacion'),
  getById: (id) => api.get(`/tipos-habitacion/${id}`),
  create: (data) => api.post('/tipos-habitacion', data),
  update: (id, data) => api.put(`/tipos-habitacion/${id}`, data),
  delete: (id) => api.delete(`/tipos-habitacion/${id}`)
}

export const mantenimientoAPI = {
  getAll: () => api.get('/mantenimiento'),
  getById: (id) => api.get(`/mantenimiento/${id}`),
  create: (data) => api.post('/mantenimiento', data),
  update: (id, data) => api.put(`/mantenimiento/${id}`, data),
  completar: (id) => api.post(`/mantenimiento/${id}/completar`)
}

export const amenitiesAPI = {
  getAll: () => api.get('/amenities'),
  getById: (id) => api.get(`/amenities/${id}`),
  create: (data) => api.post('/amenities', data),
  update: (id, data) => api.put(`/amenities/${id}`, data),
  delete: (id) => api.delete(`/amenities/${id}`)
}

export const movimientosInventarioAPI = {
  getAll: () => api.get('/movimientos-inventario'),
  create: (data) => api.post('/movimientos-inventario', data)
}

export const objetosPerdidosAPI = {
  getAll: () => api.get('/objetos-perdidos'),
  getById: (id) => api.get(`/objetos-perdidos/${id}`),
  create: (data) => api.post('/objetos-perdidos', data),
  update: (id, data) => api.put(`/objetos-perdidos/${id}`, data),
  entregar: (id) => api.post(`/objetos-perdidos/${id}/entregar`)
}

export const reportesAPI = {
  getOcupacion: (params) => api.get('/reportes/ocupacion', { params }),
  getIngresos: (params) => api.get('/reportes/ingresos', { params }),
  getServicios: (params) => api.get('/reportes/servicios', { params })
}

export const configuracionAPI = {
  getAll: () => api.get('/configuracion'),
  update: (data) => api.put('/configuracion', data)
}

export const auditoriaAPI = {
  getAll: (params) => api.get('/auditoria', { params })
}

export default api
