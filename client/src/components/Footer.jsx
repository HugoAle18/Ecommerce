import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TechZone</h3>
            <p className="text-gray-400 text-sm">
              Tu tienda de confianza para productos electrónicos en Perú. 
              Calidad garantizada y envío a todo el país.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/catalog?category=audifonos" className="hover:text-white">Audífonos</Link></li>
              <li><Link to="/catalog?category=cables" className="hover:text-white">Cables y Cargadores</Link></li>
              <li><Link to="/catalog?category=accesorios" className="hover:text-white">Accesorios</Link></li>
              <li><Link to="/catalog?category=smartwatches" className="hover:text-white">Smartwatches</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Atención al Cliente</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="#" className="hover:text-white">Política de envíos</Link></li>
              <li><Link to="#" className="hover:text-white">Política de devoluciones</Link></li>
              <li><Link to="#" className="hover:text-white">Términos y condiciones</Link></li>
              <li><Link to="#" className="hover:text-white">Política de privacidad</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +51 999 999 999
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> contacto@techzone.pe
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Lima, Perú
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-primary"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2024 TechZone. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer