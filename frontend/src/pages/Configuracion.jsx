import { useState } from 'react'
import { Save, Hotel, DollarSign, Mail, Bell } from 'lucide-react'

const Configuracion = () => {
  const [activeTab, setActiveTab] = useState('general')

  // Mock data
  const [config, setConfig] = useState({
    nombreHotel: 'Hotel Solec',
    direccion: 'Av. Principal 123, Lima, Perú',
    telefono: '+51 987 654 321',
    email: 'info@hotelsolec.com',
    ruc: '20123456789',
    moneda: 'PEN',
    igv: 18,
    horaCheckin: '14:00',
    horaCheckout: '12:00',
    emailNotificaciones: true,
    smsNotificaciones: false,
    notificacionesReservas: true,
    notificacionesPagos: true
  })

  const tabs = [
    { id: 'general', nombre: 'General', icon: Hotel },
    { id: 'financiero', nombre: 'Financiero', icon: DollarSign },
    { id: 'notificaciones', nombre: 'Notificaciones', icon: Bell },
    { id: 'email', nombre: 'Email', icon: Mail }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Configuración del Sistema</h2>
          <p className="text-gray-600 mt-1">Ajustes generales del hotel y sistema</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Save size={20} />
          Guardar Cambios
        </button>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon size={20} />
                  {tab.nombre}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Información General</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Nombre del Hotel</label>
                  <input
                    type="text"
                    value={config.nombreHotel}
                    onChange={(e) => setConfig({ ...config, nombreHotel: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">RUC</label>
                  <input
                    type="text"
                    value={config.ruc}
                    onChange={(e) => setConfig({ ...config, ruc: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">Dirección</label>
                  <input
                    type="text"
                    value={config.direccion}
                    onChange={(e) => setConfig({ ...config, direccion: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Teléfono</label>
                  <input
                    type="text"
                    value={config.telefono}
                    onChange={(e) => setConfig({ ...config, telefono: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Hora de Check-in</label>
                  <input
                    type="time"
                    value={config.horaCheckin}
                    onChange={(e) => setConfig({ ...config, horaCheckin: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Hora de Check-out</label>
                  <input
                    type="time"
                    value={config.horaCheckout}
                    onChange={(e) => setConfig({ ...config, horaCheckout: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Financiero Tab */}
          {activeTab === 'financiero' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Configuración Financiera</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Moneda</label>
                  <select
                    value={config.moneda}
                    onChange={(e) => setConfig({ ...config, moneda: e.target.value })}
                    className="input-field"
                  >
                    <option value="PEN">Soles (S/)</option>
                    <option value="USD">Dólares ($)</option>
                    <option value="EUR">Euros (€)</option>
                  </select>
                </div>

                <div>
                  <label className="label">IGV (%)</label>
                  <input
                    type="number"
                    value={config.igv}
                    onChange={(e) => setConfig({ ...config, igv: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Nota:</strong> Los cambios en la configuración de impuestos se aplicarán a las nuevas transacciones.
                </p>
              </div>
            </div>
          )}

          {/* Notificaciones Tab */}
          {activeTab === 'notificaciones' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Preferencias de Notificaciones</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Notificaciones por Email</p>
                    <p className="text-sm text-gray-500">Recibir notificaciones por correo electrónico</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.emailNotificaciones}
                      onChange={(e) => setConfig({ ...config, emailNotificaciones: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Notificaciones por SMS</p>
                    <p className="text-sm text-gray-500">Recibir notificaciones por mensaje de texto</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.smsNotificaciones}
                      onChange={(e) => setConfig({ ...config, smsNotificaciones: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Notificaciones de Reservas</p>
                    <p className="text-sm text-gray-500">Alertas sobre nuevas reservas y cambios</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.notificacionesReservas}
                      onChange={(e) => setConfig({ ...config, notificacionesReservas: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Notificaciones de Pagos</p>
                    <p className="text-sm text-gray-500">Alertas sobre pagos recibidos</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.notificacionesPagos}
                      onChange={(e) => setConfig({ ...config, notificacionesPagos: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Email Tab */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Configuración de Email</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Información:</strong> La configuración de servidor SMTP requiere permisos de administrador del sistema.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="label">Servidor SMTP</label>
                  <input
                    type="text"
                    placeholder="smtp.gmail.com"
                    className="input-field"
                    disabled
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Puerto</label>
                    <input
                      type="text"
                      placeholder="587"
                      className="input-field"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="label">Seguridad</label>
                    <select className="input-field" disabled>
                      <option>TLS</option>
                      <option>SSL</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Configuracion
