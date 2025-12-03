import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import Habitaciones from './pages/Habitaciones'
import Reservas from './pages/Reservas'
import Clientes from './pages/Clientes'
import Usuarios from './pages/Usuarios'
import Empleados from './pages/Empleados'
import CheckIn from './pages/CheckIn'
import CheckOut from './pages/CheckOut'
import Huespedes from './pages/Huespedes'
import Servicios from './pages/Servicios'
import Consumos from './pages/Consumos'
import Facturas from './pages/Facturas'
import Pagos from './pages/Pagos'
import Limpieza from './pages/Limpieza'
import TiposHabitacion from './pages/TiposHabitacion'
import Mantenimiento from './pages/Mantenimiento'
import Amenities from './pages/Amenities'
import MovimientosInventario from './pages/MovimientosInventario'
import ObjetosPerdidos from './pages/ObjetosPerdidos'
import Reportes from './pages/Reportes'
import Configuracion from './pages/Configuracion'
import Auditoria from './pages/Auditoria'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  
                  {/* Operaciones */}
                  <Route path="/checkin" element={<CheckIn />} />
                  <Route path="/checkout" element={<CheckOut />} />
                  <Route path="/huespedes" element={<Huespedes />} />
                  
                  {/* Reservas y Clientes */}
                  <Route path="/reservas" element={<Reservas />} />
                  <Route path="/clientes" element={<Clientes />} />
                  
                  {/* Habitaciones */}
                  <Route path="/habitaciones" element={<Habitaciones />} />
                  <Route path="/tipos-habitacion" element={<TiposHabitacion />} />
                  <Route path="/limpieza" element={<Limpieza />} />
                  <Route path="/mantenimiento" element={<Mantenimiento />} />
                  
                  {/* Servicios */}
                  <Route path="/servicios" element={<Servicios />} />
                  <Route path="/consumos" element={<Consumos />} />
                  
                  {/* Facturación */}
                  <Route path="/facturas" element={<Facturas />} />
                  <Route path="/pagos" element={<Pagos />} />
                  
                  {/* Inventario */}
                  <Route path="/amenities" element={<Amenities />} />
                  <Route path="/movimientos-inventario" element={<MovimientosInventario />} />
                  <Route path="/objetos-perdidos" element={<ObjetosPerdidos />} />
                  
                  {/* Administración */}
                  <Route path="/usuarios" element={<Usuarios />} />
                  <Route path="/empleados" element={<Empleados />} />
                  <Route path="/reportes" element={<Reportes />} />
                  <Route path="/configuracion" element={<Configuracion />} />
                  <Route path="/auditoria" element={<Auditoria />} />
                  
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
