import { Link } from 'react-router-dom'
import { ShoppingCart, Star, Zap } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

const PLACEHOLDER = 'https://placehold.co/400x400/e2e8f0/475569?text=TechZone'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [imgError, setImgError] = useState(false)
  const price = product.price
  const rating = Math.round(product.averageRating || 0)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    setIsAdding(true)
    await addToCart(product)
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <Link to={`/product/${product.slug}`}>
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden rounded-t-xl">
          <img
            src={imgError ? PLACEHOLDER : (product.images[0] || PLACEHOLDER)}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.isFeatured && (
            <div className="absolute top-2 left-2">
              <span className="flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-accent to-accent-dark text-white text-[10px] font-medium rounded-md">
                <Zap className="w-2.5 h-2.5" />
                Destacado
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-2.5 lg:p-3">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-medium text-gray-900 text-xs lg:text-sm leading-tight line-clamp-2 hover:text-primary transition-colors mb-1.5">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.ratings?.length || 0})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm lg:text-base font-bold text-gray-900">
              {formatPrice(price, 'PEN')}
            </span>
            {price > 200 && (
              <p className="text-[10px] text-green-600 font-medium">Envío gratis</p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isAdding
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-sm hover:shadow-md hover:shadow-primary/30'
            }`}
          >
            {isAdding ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <ShoppingCart className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard