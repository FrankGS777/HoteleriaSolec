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

export default api
