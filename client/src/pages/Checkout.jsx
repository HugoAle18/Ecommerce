import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { ordersAPI, paymentAPI } from '../services/api'
import { formatPrice } from '../utils/formatPrice'
import { CreditCard, Truck, Check } from 'lucide-react'

const steps = ['Carrito', 'Detalles del pedido', 'Pagar']

const Checkout = () => {
  const { user } = useAuth()
  const { cart } = useCart()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const selectedProductIds = useMemo(() => {
    const raw = searchParams.get('items')
    return raw ? raw.split(',') : []
  }, [searchParams])

  const selectedItems = useMemo(() => {
    if (!cart.items) return []
    if (selectedProductIds.length === 0) return cart.items
    return cart.items.filter(item => {
      const id = item._id || item.productId || item.product?._id
      return selectedProductIds.includes(id)
    })
  }, [cart.items, selectedProductIds])

  const selectedTotal = useMemo(() =>
    selectedItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0),
    [selectedItems]
  )

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
        <Link to="/" className="btn-primary">Ver productos</Link>
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
        paymentMethod: formData.paymentMethod,
        items: selectedItems.map(item =>
          item.product?._id || item.productId || item._id
        ).filter(Boolean)
      }

      const orderRes = await ordersAPI.create(orderData)
      const order = orderRes.data

      if (formData.paymentMethod === 'card') {
        const paymentRes = await paymentAPI.createCheckout({
          orderId: order._id,
          currency: 'pen'
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
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-center gap-2 mb-8 text-sm">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              i === 1 ? 'bg-primary text-white shadow-sm' : 'text-gray-400'
            } ${i < 1 ? 'bg-green-50 text-green-600' : ''}`}>
              {i < 1 && <Check className="w-3 h-3" />}
              {step}
            </div>
            {i < steps.length - 1 && <span className="text-gray-300 text-xs">{'›'}</span>}
          </div>
        ))}
      </div>

      <h1 className="text-xl lg:text-2xl font-bold mb-5">Detalles del Pedido</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h2 className="font-bold text-base mb-4 flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" /> Datos de Envío
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1">Nombre completo</label>
                <input
                  type="text"
                  required
                  className="w-full p-2.5 border rounded-lg text-sm"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1">Teléfono</label>
                <input
                  type="tel"
                  required
                  className="w-full p-2.5 border rounded-lg text-sm"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1">Dirección</label>
                <input
                  type="text"
                  required
                  className="w-full p-2.5 border rounded-lg text-sm"
                  value={formData.street}
                  onChange={e => setFormData({ ...formData, street: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Ciudad</label>
                <input
                  type="text"
                  required
                  className="w-full p-2.5 border rounded-lg text-sm"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Departamento</label>
                <select
                  required
                  className="w-full p-2.5 border rounded-lg text-sm"
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
                <label className="block text-xs font-medium mb-1">Referencia (opcional)</label>
                <input
                  type="text"
                  className="w-full p-2.5 border rounded-lg text-sm"
                  value={formData.reference}
                  onChange={e => setFormData({ ...formData, reference: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h2 className="font-bold text-base mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" /> Método de Pago
            </h2>

            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm">
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

              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm">
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

        <div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 sticky top-20">
            <h3 className="font-bold text-base mb-4">Resumen del Pedido</h3>

            <div className="space-y-2 mb-4">
              {selectedItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate mr-2">{item.name || item.product?.name} x{item.quantity}</span>
                  <span className="font-medium whitespace-nowrap">{formatPrice(item.price * item.quantity, 'PEN')}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-gray-600">Subtotal ({selectedItems.length} prod.)</span>
                <span>{formatPrice(selectedTotal, 'PEN')}</span>
              </div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-gray-600">Envío</span>
                <span className="text-green-600 font-medium">Gratis</span>
              </div>
            </div>

            <div className="border-t pt-3 mb-5">
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-gray-900">{formatPrice(selectedTotal, 'PEN')}</span>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-sm py-2.5 disabled:opacity-50"
            >
              {loading ? 'Procesando...' : 'Confirmar Pedido'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout