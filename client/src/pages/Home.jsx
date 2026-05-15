import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productsAPI } from '../services/api'
import ProductCard from '../components/ProductCard'
import { ArrowRight, Star, Zap, Sparkles, MessageCircle, Heart } from 'lucide-react'

const CATEGORY_NAMES = {
  audifonos: 'Audífonos',
  cables: 'Cables y Cargadores',
  accesorios: 'Accesorios',
  smartwatches: 'Smartwatches'
}

const testimonials = [
  { text: 'Llegó en 2 días, excelente calidad!', user: 'María G.', x: '10%', y: '15%', delay: 'animate-float' },
  { text: 'Me encantó, sonido increíble 🎧', user: 'Carlos R.', x: '70%', y: '25%', delay: 'animate-float-delayed' },
  { text: 'Súper recomendado, volveré a comprar', user: 'Lucía M.', x: '15%', y: '55%', delay: 'animate-float-slow' },
  { text: 'El mejor precio que encontré!', user: 'Pedro L.', x: '72%', y: '60%', delay: 'animate-float' },
]

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(null)
  const [showComments, setShowComments] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('category')
    if (cat) setActiveCategory(cat)
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productsAPI.getAll({ limit: 50 })
        if (res.data?.products && Array.isArray(res.data.products)) {
          setProducts(res.data.products)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const categories = ['audifonos', 'cables', 'accesorios', 'smartwatches']
  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = products.filter(p => p.category === cat)
    return acc
  }, {})

  const handleCategoryClick = (slug) => {
    setActiveCategory(slug)
    const el = document.getElementById(`cat-${slug}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="animate-fade-in">
      {/* Sticky Categories */}
      <div className="bg-gray-50 dark:bg-[#1a1d27] border-b border-gray-100 dark:border-gray-800 sticky top-12 lg:top-14 z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {CATEGORY_NAMES[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Playful Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-[#0f1117] to-gray-900 text-white">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="absolute top-10 right-10 hidden lg:block">
          <Sparkles className="w-6 h-6 text-yellow-400 animate-wiggle" />
        </div>
        <div className="absolute bottom-20 left-10 hidden lg:block">
          <Star className="w-5 h-5 text-primary-300 animate-float" />
        </div>

        {/* Floating comments - desktop only */}
        {showComments && (
          <div className="hidden lg:block">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`floating-comment ${i % 2 === 0 ? '' : 'right'} ${t.delay}`}
                style={{ left: t.x, top: t.y }}
              >
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed">{t.text}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 font-medium">{t.user}</p>
              </div>
            ))}
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs backdrop-blur-sm mb-4 animate-fade-in">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                <span>Nuevos productos cada semana</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-3">
                Tecnología que{' '}
                <span className="bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  te encantará
                </span>
              </h1>
              <p className="text-sm text-gray-300 max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed">
                Audífonos, cargadores, accesorios y smartwatches. 
                Envío rápido a todo Perú con garantía incluida. 
                <span className="block mt-1 text-primary-300 font-medium">+1000 clientes felices ✨</span>
              </p>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => document.getElementById('cat-audifonos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-600 rounded-full font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                >
                  Comprar ahora
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="p-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                  title="Comentarios"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-gray-900 flex items-center justify-center text-[10px] font-bold text-white">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-300">Calificado por +1000 clientes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products by Category */}
      {loading ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-white dark:bg-[#181b2a] rounded-xl h-52 animate-pulse" />
            ))}
          </div>
        </div>
      ) : (
        categories.map(cat => {
          const catProducts = grouped[cat]
          if (!catProducts || catProducts.length === 0) return null
          return (
            <section key={cat} id={`cat-${cat}`} className={`py-8 lg:py-10 ${cat === 'audifonos' ? 'bg-white dark:bg-[#181b2a]' : 'bg-gray-50 dark:bg-[#1a1d27]'} even:bg-gray-50 dark:even:bg-[#1a1d27]`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-sm">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100">
                        {CATEGORY_NAMES[cat]}
                      </h2>
                      <p className="text-[10px] text-gray-400">{catProducts.length} productos</p>
                    </div>
                  </div>
                  <Link
                    to={`/?category=${cat}`}
                    className="text-xs text-primary hover:text-primary-600 font-medium flex items-center gap-1 group"
                  >
                    Ver todo
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                  {catProducts.slice(0, 8).map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          )
        })
      )}

      {/* Fun CTA */}
      <section className="relative overflow-hidden py-10 lg:py-14 bg-gradient-to-r from-primary via-primary-600 to-purple-600">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-300/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs backdrop-blur-sm mb-4">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span className="text-white/90">Ofertas exclusivas online</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            ¿Listo para tu nuevo gadget?
          </h2>
          <p className="text-white/80 mb-5 text-sm max-w-lg mx-auto">
            Los mejores precios en tecnología, envío gratis en pedidos mayores a S/200 y garantía de 6 meses.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => document.getElementById('cat-audifonos')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-white text-primary rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Ver productos
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-white/30 text-white rounded-full text-xs font-medium hover:bg-white/10 transition-colors"
            >
              <Heart className="w-3.5 h-3.5" />
              Testimonios
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home