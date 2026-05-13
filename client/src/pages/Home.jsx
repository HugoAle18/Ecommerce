import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productsAPI } from '../services/api'
import ProductCard from '../components/ProductCard'
import { Headphones, Cable, Smartphone, Watch, Truck, Shield, RefreshCw, HeadphonesIcon, ArrowRight, Star } from 'lucide-react'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await productsAPI.getAll({ limit: 8 })
        if (res.data?.products && Array.isArray(res.data.products)) {
          setFeaturedProducts(res.data.products)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  const categories = [
    { name: 'Audífonos', slug: 'audifonos', icon: Headphones, color: 'from-purple-500 to-purple-600' },
    { name: 'Cables', slug: 'cables', icon: Cable, color: 'from-blue-500 to-blue-600' },
    { name: 'Accesorios', slug: 'accesorios', icon: Smartphone, color: 'from-green-500 to-green-600' },
    { name: 'Smartwatches', slug: 'smartwatches', icon: Watch, color: 'from-pink-500 to-pink-600' }
  ]

  const benefits = [
    { icon: Truck, title: 'Envío Gratis', desc: 'Pedidos mayores a S/200', color: 'text-green-500' },
    { icon: Shield, title: 'Garantía', desc: '6 meses en productos', color: 'text-blue-500' },
    { icon: RefreshCw, title: 'Devolución', desc: 'Hasta 7 días hábiles', color: 'text-orange-500' },
    { icon: HeadphonesIcon, title: 'Soporte', desc: 'Atención 24/7', color: 'text-purple-500' }
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>Los mejores precios en tecnología</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Tecnología de última generación al{' '}
                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  mejor precio
                </span>
              </h1>
              <p className="text-lg text-gray-300 max-w-xl">
                Descubre nuestra colección de audífonos, cargadores, accesorios y más. 
                Envío rápido a todo el Perú con garantía incluida.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/catalog" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-600 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                >
                  Ver Catálogo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a 
                  href="#categories" 
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition-colors"
                >
                  Explorar
                </a>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-gray-900" />
                  ))}
                </div>
                <span className="text-sm text-gray-300">+1000 clientes satisfechos</span>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <Headphones className="w-16 h-16 text-primary mb-3" />
                    <h3 className="font-semibold">Audio Premium</h3>
                    <p className="text-sm text-gray-300">Calidad de sonido superior</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <Cable className="w-16 h-16 text-blue-400 mb-3" />
                    <h3 className="font-semibold">Carga Rápida</h3>
                    <p className="text-sm text-gray-300">GaN Technology</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <Watch className="w-16 h-16 text-pink-400 mb-3" />
                    <h3 className="font-semibold">Smartwatches</h3>
                    <p className="text-sm text-gray-300">Lo último en wearables</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <Smartphone className="w-16 h-16 text-green-400 mb-3" />
                    <h3 className="font-semibold">Accesorios</h3>
                    <p className="text-sm text-gray-300">Para tu dispositivo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explora Nuestras Categorías
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encuentra exactamente lo que buscas en nuestra amplia variedad de productos electrónicos
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((cat, index) => (
              <Link 
                key={cat.slug} 
                to={`/catalog?category=${cat.slug}`}
                className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 lg:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{cat.name}</h3>
                <div className="flex items-center text-sm text-gray-500 group-hover:text-primary transition-colors">
                  Ver productos
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Productos Destacados
              </h2>
              <p className="text-gray-600">Los productos más populares de nuestra tienda</p>
            </div>
            <Link 
              to="/catalog" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              Ver todos los productos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-4">
                <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 ${benefit.color}`}>
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-500">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-primary-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            ¿Qué esperas para comprar?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Encuentra los mejores productos tecnológicos al mejor precio del mercado peruano
          </p>
          <Link 
            to="/catalog" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Explorar Catálogo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home