import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Zap, Shield, Truck, CreditCard } from 'lucide-react'

const Footer = () => {
  const benefits = [
    { icon: Truck, title: 'Envío Gratis', desc: 'En pedidos mayores a S/200' },
    { icon: Shield, title: 'Garantía', desc: '6 meses en todos los productos' },
    { icon: CreditCard, title: 'Pago Seguro', desc: 'Stripe y Pago contra entrega' },
    { icon: Zap, title: 'Soporte 24/7', desc: 'Atención inmediata' },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{benefit.title}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-8 border-t border-white/10">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">TechZone</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu tienda de confianza para productos electrónicos en Perú. 
              Calidad garantizada, precios justos y envío rápido a todo el país.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/50 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/50 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/50 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Categorías</h4>
            <ul className="space-y-2.5">
              <li><Link to="/?category=audifonos" className="text-gray-400 hover:text-white text-sm transition-colors">Audífonos</Link></li>
              <li><Link to="/?category=cables" className="text-gray-400 hover:text-white text-sm transition-colors">Cables y Cargadores</Link></li>
              <li><Link to="/?category=accesorios" className="text-gray-400 hover:text-white text-sm transition-colors">Accesorios</Link></li>
              <li><Link to="/?category=smartwatches" className="text-gray-400 hover:text-white text-sm transition-colors">Smartwatches</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Ayuda</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Estado del pedido</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Política de envíos</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Devoluciones</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Términos y condiciones</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+51 999 999 999</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>contacto@techzone.pe</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Lima, Perú</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2024 TechZone. Todos los derechos reservados.</p>
          <p className="text-gray-500 text-xs">Hecho con ❤️ en Perú</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer