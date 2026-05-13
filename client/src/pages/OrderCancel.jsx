import { Link } from 'react-router-dom'
import { XCircle, ShoppingBag } from 'lucide-react'

const OrderCancel = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Pago Cancelado</h1>
      <p className="text-gray-600 mb-2">El pago no se pudo completar.</p>
      <p className="text-gray-500 mb-6">Puedes intentar de nuevo o contactarnos para ayuda.</p>
      <div className="flex gap-4 justify-center">
        <Link to="/cart" className="btn-primary inline-flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" /> Reintentar
        </Link>
        <Link to="/" className="btn-secondary">Volver al inicio</Link>
      </div>
    </div>
  )
}

export default OrderCancel