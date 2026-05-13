import { Link } from 'react-router-dom'
import { ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

const ProductCard = ({ product }) => {
  const { addToCart, currency } = useCart()
  const price = currency === 'USD' ? product.priceUSD : product.price

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.slug}`}>
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          <img 
            src={product.images[0] || '/placeholder.jpg'} 
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 hover:text-primary">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-500 text-sm">
            {'★'.repeat(Math.round(product.averageRating || 0))}
          </span>
          <span className="text-gray-400 text-sm">({product.ratings?.length || 0})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(price, currency)}
            </span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <Heart className="w-5 h-5" />
            </button>
            <button 
              onClick={() => addToCart(product)}
              className="p-2 bg-primary text-white rounded-full hover:bg-blue-700"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard