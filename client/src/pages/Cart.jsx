import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'
import { Trash2, Minus, Plus, ShoppingBag, Check } from 'lucide-react'

const PLACEHOLDER = 'https://placehold.co/200x200/e2e8f0/475569?text=TechZone'

const steps = ['Carrito', 'Detalles del pedido', 'Pagar']

const Cart = () => {
  const { cart, updateQuantity, removeItem } = useCart()
  const [selectedIds, setSelectedIds] = useState([])

  const allSelected = cart.items.length > 0 && selectedIds.length === cart.items.length

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([])
    } else {
      const allIds = cart.items.map(item => item._id || item.productId)
      setSelectedIds(allIds)
    }
  }

  const selectedItems = cart.items.filter(item => selectedIds.includes(item._id || item.productId))
  const selectedTotal = selectedItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-6">¡Añade productos para comenzar!</p>
        <Link to="/" className="btn-primary">
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-center gap-2 mb-8 text-sm">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              i === 0 ? 'bg-primary text-white shadow-sm' : 'text-gray-400 dark:text-gray-500'
            }`}>
              {i === 0 && <Check className="w-3 h-3" />}
              {step}
            </div>
            {i < steps.length - 1 && <span className="text-gray-300 dark:text-gray-600 text-xs">{'›'}</span>}
          </div>
        ))}
      </div>

      <h1 className="text-xl lg:text-2xl font-bold mb-5">Mi Carrito ({cart.items.length} productos)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {/* Select All */}
          <div className="bg-white dark:bg-[#181b2a] px-4 py-2.5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <button
              onClick={toggleSelectAll}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                allSelected ? 'bg-primary border-primary' : 'border-gray-300 hover:border-primary'
              }`}
            >
              {allSelected && <Check className="w-3 h-3 text-white" />}
            </button>
            <span className="text-sm font-medium text-gray-700">Seleccionar todo</span>
            <span className="text-xs text-gray-400 ml-auto">
              {selectedIds.length} de {cart.items.length} seleccionados
            </span>
          </div>

          {cart.items.map(item => {
            const price = item.price || 0
            const itemId = item._id || item.productId
            const isSelected = selectedIds.includes(itemId)

            return (
              <div key={itemId} className={`bg-white dark:bg-[#181b2a] p-3 lg:p-4 rounded-lg shadow-sm border transition-colors ${
                isSelected ? 'border-primary/30 bg-primary-50/30 dark:border-primary/40 dark:bg-primary-900/20' : 'border-gray-100 dark:border-gray-800'
              }`}>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleSelect(itemId)}
                    className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-primary border-primary' : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </button>

                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image || item.product?.images?.[0] || PLACEHOLDER} 
                      alt={item.name}
                      onError={(e) => { e.target.src = PLACEHOLDER }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-tight line-clamp-2">{item.name || item.product?.name}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">Unit: {formatPrice(price, 'PEN')}</p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => updateQuantity(itemId, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(itemId, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">
                          {formatPrice(price * item.quantity, 'PEN')}
                        </span>
                        <button 
                          onClick={() => removeItem(itemId)}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div>
          <div className="bg-white dark:bg-[#181b2a] p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 sticky top-20">
            <h3 className="font-bold text-base mb-4 dark:text-gray-100">Resumen del Pedido</h3>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Productos ({selectedItems.length})</span>
                <span className="font-medium">{formatPrice(selectedTotal, 'PEN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span className="font-medium text-green-600">Gratis</span>
              </div>
            </div>

            <div className="border-t pt-3 mb-5">
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-gray-900">{formatPrice(selectedTotal, 'PEN')}</span>
              </div>
            </div>

            <Link
              to={selectedItems.length > 0 ? {
                pathname: '/checkout',
                search: `?items=${selectedIds.join(',')}`
              } : '#'}
              className={`btn-primary w-full text-center block text-sm py-2.5 ${
                selectedItems.length === 0 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              {selectedItems.length > 0 ? `Comprar (${selectedItems.length})` : 'Selecciona productos'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart