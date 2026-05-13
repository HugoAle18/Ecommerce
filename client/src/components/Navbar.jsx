import { Link } from 'react-router-dom'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { itemCount, currency, setCurrency } = useCart()

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            TechZone
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary">Inicio</Link>
            <Link to="/catalog" className="hover:text-primary">Catálogo</Link>
            <button 
              onClick={() => setCurrency(currency === 'PEN' ? 'USD' : 'PEN')}
              className="text-sm bg-gray-100 px-2 py-1 rounded"
            >
              {currency === 'PEN' ? 'S/' : '$'}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  <User className="w-6 h-6" />
                  <span className="hidden sm:inline text-sm">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Mi Perfil</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-sm hover:text-primary">Iniciar sesión</Link>
            )}

            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link to="/" className="block py-2">Inicio</Link>
            <Link to="/catalog" className="block py-2">Catálogo</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar