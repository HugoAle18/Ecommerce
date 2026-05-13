import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'

const Cart = () => {
  const { cart, updateQuantity, removeItem, currency } = useCart()

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-6">¡Añade productos para comenzar!</p>
        <Link to="/catalog" className="btn-primary">
          Ver Catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mi Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map(item => {
            const price = currency === 'USD' ? item.priceUSD : item.price
            const itemId = item.product?._id || item.productId

            return (
              <div key={itemId} className="bg-white p-4 rounded-lg shadow-md flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image || item.product?.images?.[0] || '/placeholder.jpg'} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name || item.product?.name}</h3>
                  <p className="text-gray-500 text-sm">Precio unitario: {formatPrice(price, currency)}</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-lg">
                      <button 
                        onClick={() => updateQuantity(itemId, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(itemId, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeItem(itemId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">
                    {formatPrice(price * item.quantity, currency)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">
                {formatPrice(currency === 'USD' ? cart.totalUSD : cart.total, currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Envío</span>
              <span className="font-semibold">Gratis</span>
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">
                {formatPrice(currency === 'USD' ? cart.totalUSD : cart.total, currency)}
              </span>
            </div>
          </div>

          <Link to="/checkout" className="btn-primary w-full text-center block">
            Proceder al Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart