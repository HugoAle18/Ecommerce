import { Link } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Zap, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const { user, logout } = useAuth()
  const { itemCount } = useCart()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <nav className="bg-white/90 dark:bg-[#0f1117]/90 backdrop-blur-lg shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 lg:h-14">
          <Link to="/" className="flex items-center gap-1.5 group flex-shrink-0">
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 lg:w-4.5 lg:h-4.5 text-white" />
            </div>
            <span className="text-base lg:text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              TechZone
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              title={dark ? 'Modo claro' : 'Modo oscuro'}
            >
              {dark ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-gray-600 group-hover:text-primary" />
              )}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center shadow-sm">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="hidden lg:inline text-xs font-medium text-gray-700 max-w-[80px] truncate">
                    {user.name}
                  </span>
                </button>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#181b2a] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 z-20 overflow-hidden animate-fade-in">
                      <div className="px-3 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b dark:border-gray-700">
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">{user.name}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      <div className="py-1.5">
                        <Link
                          to="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="block px-3 py-2 text-xs text-gray-700 hover:bg-primary-50 hover:text-primary font-medium transition-colors"
                        >
                          Mi Perfil
                        </Link>
                        <button
                          onClick={() => { logout(); setProfileOpen(false) }}
                          className="block w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 font-medium transition-colors"
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
                className="px-3 py-1.5 bg-gradient-to-r from-primary to-primary-600 text-white rounded-full font-medium text-xs lg:text-sm shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
              >
                Ingresar
              </Link>
            )}

            <button
              className="md:hidden p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5 dark:text-gray-300" /> : <Menu className="w-5 h-5 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 animate-slide-up">
            <div className="flex flex-col gap-1">
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-gray-50 font-medium text-gray-700 text-sm">
                Mi Perfil
              </Link>
              {!user && (
                <Link to="/login" onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-gray-50 font-medium text-gray-700 text-sm">
                  Iniciar sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar