import { useState, useCallback } from 'react'
import { productsAPI } from '../services/api'
import ProductCard from '../components/ProductCard'
import { ArrowRight, Sparkles, Star, Package, Headphones, Cable, Smartphone, Watch } from 'lucide-react'

const CATEGORY_NAMES = {
  audifonos: 'Audífonos',
  cables: 'Cables y Cargadores',
  accesorios: 'Accesorios',
  smartwatches: 'Smartwatches'
}

const CATEGORY_IMAGES = {
  audifonos: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
  cables: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=400&fit=crop',
  accesorios: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=400&fit=crop',
  smartwatches: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop'
}

const CATEGORY_ICONS = {
  audifonos: Headphones,
  cables: Cable,
  accesorios: Smartphone,
  smartwatches: Watch
}

const Home = () => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const handleCategoryClick = useCallback(async (slug) => {
    if (slug === activeCategory) return
    setActiveCategory(slug)
    setProducts([])
    setLoading(true)

    try {
      const res = await productsAPI.getAll({ category: slug, limit: 50 })
      if (res.data?.products && Array.isArray(res.data.products)) {
        setProducts(res.data.products)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }

    setTimeout(() => {
      const el = document.getElementById('cat-products')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [activeCategory])

  const categories = ['audifonos', 'cables', 'accesorios', 'smartwatches']

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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-[#0f1117] to-gray-900 text-white">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="absolute top-10 right-10 hidden lg:block">
          <Sparkles className="w-6 h-6 text-yellow-400 animate-wiggle" />
        </div>
        <div className="absolute bottom-20 left-10 hidden lg:block">
          <Star className="w-5 h-5 text-primary-300 animate-float" />
        </div>

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
                <span className="block mt-1 text-primary-300 font-medium">+1000 clientes felices</span>
              </p>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => handleCategoryClick('audifonos')}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-600 rounded-full font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                >
                  Comprar ahora
                  <ArrowRight className="w-4 h-4" />
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

      {/* Apple-style Category Showcase */}
      {!activeCategory && (
        <section className="py-10 lg:py-14 bg-white dark:bg-[#181b2a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Explora nuestras categorías
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Encuentra lo que necesitas
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {categories.map(cat => {
                const Icon = CATEGORY_ICONS[cat]
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="group relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 hover:shadow-fun transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="aspect-[3/1] sm:aspect-[4/1] lg:aspect-[3/1] relative overflow-hidden">
                      <img
                        src={CATEGORY_IMAGES[cat]}
                        alt={CATEGORY_NAMES[cat]}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                      <div className="absolute inset-0 flex items-center">
                        <div className="flex items-center gap-3 px-5 lg:px-8">
                          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Icon className="w-5 h-5 lg:w-5.5 lg:h-5.5 text-white" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg lg:text-xl font-bold text-white">{CATEGORY_NAMES[cat]}</h3>
                            <p className="text-xs text-white/70">Ver productos →</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Selected Category Products */}
      <div id="cat-products">
        {activeCategory && (
          <section className="py-8 lg:py-10 bg-gray-50 dark:bg-[#1a1d27]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-sm">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100">
                    {CATEGORY_NAMES[activeCategory]}
                  </h2>
                  <p className="text-[10px] text-gray-400">
                    {loading ? 'Cargando...' : `${products.length} productos`}
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                  {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="bg-white dark:bg-[#181b2a] rounded-xl h-52 animate-pulse" />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No hay productos en esta categoría</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* CTA */}
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
              onClick={() => handleCategoryClick('audifonos')}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-white text-primary rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Ver productos
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home