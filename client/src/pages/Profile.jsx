import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ordersAPI } from '../services/api'
import { formatPrice } from '../utils/formatPrice'
import { Package, User, MapPin } from 'lucide-react'

const Profile = () => {
  const { user, loading: authLoading } = useAuth()
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [activeTab, setActiveTab] = useState('orders')

  useEffect(() => {
    if (user) {
      ordersAPI.getMy()
        .then(res => setOrders(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoadingOrders(false))
    }
  }, [user])

  if (authLoading) return <div className="container mx-auto px-4 py-8">Cargando...</div>
  if (!user) return <Navigate to="/login" />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mi Cuenta</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                {user.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          <nav className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-6 py-4 flex items-center gap-3 hover:bg-gray-50 ${activeTab === 'orders' ? 'bg-primary-50 border-l-4 border-primary' : ''}`}
            >
              <Package className="w-5 h-5" /> Mis Pedidos
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-6 py-4 flex items-center gap-3 hover:bg-gray-50 ${activeTab === 'profile' ? 'bg-primary-50 border-l-4 border-primary' : ''}`}
            >
              <User className="w-5 h-5" /> Mi Perfil
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-6 py-4 flex items-center gap-3 hover:bg-gray-50 ${activeTab === 'addresses' ? 'bg-primary-50 border-l-4 border-primary' : ''}`}
            >
              <MapPin className="w-5 h-5" /> Mis Direcciones
            </button>
          </nav>
        </aside>

        <main className="flex-1">
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Mis Pedidos</h2>

              {loadingOrders ? (
                <p>Cargando pedidos...</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-4">No tienes pedidos aún</p>
                  <Link to="/" className="btn-primary">Ver productos</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-semibold">Pedido #{order._id.slice(-8)}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString('es-PE')}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-primary-100 text-primary-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status === 'pending' ? 'Pendiente' :
                           order.status === 'processing' ? 'Procesando' :
                           order.status === 'shipped' ? 'Enviado' :
                           order.status === 'delivered' ? 'Entregado' : 'Cancelado'}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} x{item.quantity}</span>
                            <span>{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Información del Perfil</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500">Nombre</label>
                  <p className="font-semibold">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Email</label>
                  <p className="font-semibold">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Teléfono</label>
                  <p className="font-semibold">{user.phone || 'No registrado'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Mis Direcciones</h2>
              {user.addresses?.length > 0 ? (
                <div className="space-y-4">
                  {user.addresses.map((addr, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <p className="font-semibold">{addr.label || 'Dirección'}</p>
                      <p className="text-gray-600">{addr.street}</p>
                      <p className="text-gray-600">{addr.city}, {addr.department}</p>
                      {addr.reference && <p className="text-gray-500 text-sm">Ref: {addr.reference}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No hay direcciones guardadas</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Profile