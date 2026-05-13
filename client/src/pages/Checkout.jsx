import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { ordersAPI, paymentAPI } from '../services/api'
import { formatPrice } from '../utils/formatPrice'
import { CreditCard, Truck } from 'lucide-react'

const Checkout = () => {
  const { user } = useAuth()
  const { cart, currency } = useCart()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    department: '',
    reference: '',
    paymentMethod: 'card'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <Link to="/catalog" className="btn-primary">Ver Catálogo</Link>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Debes iniciar sesión</h2>
        <Link to="/login" className="btn-primary">Iniciar Sesión</Link>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const orderData = {
        shippingAddress: {
          name: formData.name,
          street: formData.street,
          city: formData.city,
          department: formData.department,
          phone: formData.phone,
          reference: formData.reference
        },
        paymentMethod: formData.paymentMethod
      }

      const orderRes = await ordersAPI.create(orderData)
      const order = orderRes.data

      if (formData.paymentMethod === 'card') {
        const paymentRes = await paymentAPI.createCheckout({
          orderId: order._id,
          currency: currency.toLowerCase()
        })
        window.location.href = paymentRes.data.url
      } else {
        navigate(`/order/success?orderId=${order._id}`)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al procesar el pedido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" /> Datos de Envío
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Nombre completo</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input
                  type="tel"
                  required
                  className="w-full p-3 border rounded-lg"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Dirección</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg"
                  value={formData.street}
                  onChange={e => setFormData({ ...formData, street: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ciudad</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Departamento</label>
                <select
                  required
                  className="w-full p-3 border rounded-lg"
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="">Seleccionar</option>
                  <option value="Lima">Lima</option>
                  <option value="Arequipa">Arequipa</option>
                  <option value="Cusco">Cusco</option>
                  <option value="Trujillo">Trujillo</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Referencia (opcional)</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={formData.reference}
                  onChange={e => setFormData({ ...formData, reference: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Método de Pago
            </h2>

            <div className="space-y-3">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="mr-3"
                />
                <span>Tarjeta de crédito/débito (Stripe)</span>
              </label>

              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="mr-3"
                />
                <span>Pago contra entrega</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>

          <div className="space-y-2 mb-4">
            {cart.items.map((item, index) => {
              const price = currency === 'USD' ? item.priceUSD : item.price
              return (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name || item.product?.name} x{item.quantity}</span>
                  <span>{formatPrice(price * item.quantity, currency)}</span>
                </div>
              )
            })}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{formatPrice(currency === 'USD' ? cart.totalUSD : cart.total, currency)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">
                {formatPrice(currency === 'USD' ? cart.totalUSD : cart.total, currency)}
              </span>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-6 disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Confirmar Pedido'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Checkout