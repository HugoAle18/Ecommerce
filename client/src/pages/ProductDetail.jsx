import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productsAPI } from '../services/api'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'
import { ShoppingCart, Heart, Star, Minus, Plus } from 'lucide-react'

const ProductDetail = () => {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productsAPI.getBySlug(slug)
        setProduct(res.data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [slug])

  if (loading) return <div className="container mx-auto px-4 py-12">Cargando...</div>
  if (!product) return <div className="container mx-auto px-4 py-12">Producto no encontrado</div>

  const price = product.price

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={product.images[0] || '/placeholder.jpg'} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <span className="text-sm text-gray-500 uppercase">{product.category}</span>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5" fill={i < Math.round(product.averageRating) ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span className="text-gray-500">({product.ratings?.length || 0} reseñas)</span>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(price, 'PEN')}
            </span>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            {product.brand && (
              <p className="text-sm"><strong>Marca:</strong> {product.brand}</p>
            )}
            <p className="text-sm"><strong>Stock:</strong> {product.stock > 0 ? `(${product.stock} disponibles)` : 'Agotado'}</p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-100"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="px-4 font-semibold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-100"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <button 
              onClick={() => addToCart(product, quantity)}
              disabled={product.stock <= 0}
              className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingCart className="w-5 h-5" />
              Agregar al Carrito
            </button>

            <button className="p-3 border rounded-lg hover:bg-gray-100">
              <Heart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail