import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productsAPI } from '../services/api'
import ProductCard from '../components/ProductCard'
import { ArrowRight, Star } from 'lucide-react'

const CATEGORY_NAMES = {
  audifonos: 'Audífonos',
  cables: 'Cables y Cargadores',
  accesorios: 'Accesorios',
  smartwatches: 'Smartwatches'
}

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(null)

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
      {/* Navbar Categories (sticky below main nav) */}
      <div className="bg-gray-50 border-b border-gray-100 sticky top-12 lg:top-14 z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {CATEGORY_NAMES[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero - compact */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs backdrop-blur-sm mb-4">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span>Los mejores precios en tecnología</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-3">
                Tecnología al{' '}
                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  mejor precio
                </span>
              </h1>
              <p className="text-sm text-gray-300 max-w-xl mx-auto lg:mx-0 mb-5">
                Audífonos, cargadores, accesorios y smartwatches. Envío rápido a todo Perú.
              </p>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => document.getElementById('cat-audifonos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-600 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                >
                  Comprar ahora
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-gray-900" />
                ))}
              </div>
              <span className="text-xs text-gray-300">+1000 clientes satisfechos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products by Category */}
      {loading ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-white rounded-xl h-56 animate-pulse" />
            ))}
          </div>
        </div>
      ) : (
        categories.map(cat => {
          const catProducts = grouped[cat]
          if (!catProducts || catProducts.length === 0) return null
          return (
            <section key={cat} id={`cat-${cat}`} className="py-8 lg:py-10 bg-white even:bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                      {CATEGORY_NAMES[cat]}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">{catProducts.length} productos</p>
                  </div>
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

      {/* CTA */}
      <section className="py-10 lg:py-14 bg-gradient-to-r from-primary to-primary-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            ¿Qué esperas para comprar?
          </h2>
          <p className="text-white/80 mb-5 text-sm">
            Encuentra los mejores productos tecnológicos al mejor precio del mercado peruano
          </p>
          <button
            onClick={() => document.getElementById('cat-audifonos')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-primary rounded-full font-bold text-sm hover:shadow-xl hover:scale-105 transition-all"
          >
            Ver productos
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home