import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ordersAPI } from '../services/api'
import { formatPrice } from '../utils/formatPrice'
import { CheckCircle, Package } from 'lucide-react'

const OrderSuccess = () => {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState(null)

  useEffect(() => {
    if (orderId) {
      ordersAPI.getById(orderId)
        .then(res => setOrder(res.data))
        .catch(err => console.error(err))
    }
  }, [orderId])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">¡Pedido Confirmado!</h1>
      <p className="text-gray-600 mb-2">Tu pedido ha sido registrado exitosamente.</p>
      {order && (
        <p className="text-gray-500 mb-6">
          Pedido #{order._id.slice(-8)} - Total: {formatPrice(order.total)}
        </p>
      )}
      <Link to="/profile" className="btn-primary inline-flex items-center gap-2">
        <Package className="w-5 h-5" /> Ver mis pedidos
      </Link>
    </div>
  )
}

export default OrderSuccess