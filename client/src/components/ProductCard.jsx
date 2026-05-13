import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, Star, Zap } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

const PLACEHOLDER = 'https://placehold.co/400x400/e2e8f0/475569?text=TechZone'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
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
    <div 
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug}`}>
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden rounded-t-2xl">
          <img 
            src={imgError ? PLACEHOLDER : (product.images[0] || PLACEHOLDER)} 
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3">
            {product.isFeatured && (
              <span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-accent to-accent-dark text-white text-xs font-medium rounded-full">
                <Zap className="w-3 h-3" />
                Destacado
              </span>
            )}
          </div>
          <div className={`absolute top-3 right-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-gray-400 text-xs">({product.ratings?.length || 0})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl lg:text-2xl font-bold text-gray-900">
              {formatPrice(price, 'PEN')}
            </span>
            {price > 200 && (
              <p className="text-xs text-green-600 font-medium">Envío gratis</p>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isAdding 
                ? 'bg-green-500 text-white' 
                : 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-md hover:shadow-lg hover:shadow-primary/30'
            }`}
          >
            {isAdding ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard