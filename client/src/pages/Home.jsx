import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productsAPI } from '../services/api'
import ProductCard from '../components/ProductCard'
import { Headphones, Cable, Smartphone, Watch, Truck, Shield, RefreshCw, HeadphonesIcon } from 'lucide-react'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await productsAPI.getFeatured()
        if (Array.isArray(res.data)) {
          setFeaturedProducts(res.data)
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
    { name: 'Audífonos', slug: 'audifonos', icon: Headphones },
    { name: 'Cables', slug: 'cables', icon: Cable },
    { name: 'Accesorios', slug: 'accesorios', icon: Smartphone },
    { name: 'Smartwatches', slug: 'smartwatches', icon: Watch }
  ]

  const benefits = [
    { icon: Truck, title: 'Envío Gratis', desc: 'En pedidos mayores a S/200' },
    { icon: Shield, title: 'Garantía', desc: 'Todos nuestros productos' },
    { icon: RefreshCw, title: 'Devolución', desc: 'Hasta 7 días hábiles' },
    { icon: HeadphonesIcon, title: 'Soporte', desc: 'Atención 24/7' }
  ]

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Los Mejores Electrónicos al Mejor Precio
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Encuentra audífonos, cargadores, accesorios y más. 
              Envío rápido a todo el Perú.
            </p>
            <div className="flex gap-4">
              <Link to="/catalog" className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Ver Catálogo
              </Link>
              <a href="#benefits" className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary">
                Más información
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(cat => (
              <Link 
                key={cat.slug} 
                to={`/catalog?category=${cat.slug}`}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <cat.icon className="w-12 h-12 mx-auto text-primary mb-3" />
                <h3 className="font-semibold">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Productos Destacados</h2>
          {loading ? (
            <div className="text-center py-12">Cargando...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/catalog" className="btn-primary inline-block">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <benefit.icon className="w-10 h-10 mx-auto text-primary mb-3" />
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home