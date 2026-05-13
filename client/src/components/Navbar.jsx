import { Link } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Zap } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, logout } = useAuth()
  const { itemCount, currency, setCurrency } = useCart()

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              TechZone
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary font-medium transition-colors relative group"
            >
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              to="/catalog" 
              className="text-gray-600 hover:text-primary font-medium transition-colors relative group"
            >
              Catálogo
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <button 
              onClick={() => setCurrency(currency === 'PEN' ? 'USD' : 'PEN')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full text-amber-700 font-medium text-sm hover:shadow-md transition-all"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {currency === 'PEN' ? 'S/' : '$'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/cart" 
              className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center shadow-sm">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden lg:inline text-sm font-medium text-gray-700 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 overflow-hidden animate-fade-in">
                      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                        <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary font-medium transition-colors"
                        >
                          Mi Perfil
                        </Link>
                        <button
                          onClick={() => { logout(); setProfileOpen(false) }}
                          className="block w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 font-medium transition-colors"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 bg-gradient-to-r from-primary to-primary-600 text-white rounded-full font-medium text-sm shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
              >
                Iniciar sesión
              </Link>
            )}

            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100" 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slide-up">
            <div className="flex flex-col gap-2">
              <Link to="/" className="px-4 py-3 rounded-xl hover:bg-gray-50 font-medium text-gray-700">
                Inicio
              </Link>
              <Link to="/catalog" className="px-4 py-3 rounded-xl hover:bg-gray-50 font-medium text-gray-700">
                Catálogo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar