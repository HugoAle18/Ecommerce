import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productsAPI } from '../services/api'
import ProductCard from '../components/ProductCard'
import { Filter, X } from 'lucide-react'

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 })
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || ''
  })

  useEffect(() => {
    fetchProducts()
  }, [searchParams])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = Object.fromEntries(searchParams)
      const res = await productsAPI.getAll(params)
      setProducts(res.data.products)
      setPagination({ totalPages: res.data.totalPages, currentPage: res.data.currentPage })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    const newParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) newParams.set(key, value)
    })
    setSearchParams(newParams)
    setFiltersOpen(false)
  }

  const clearFilters = () => {
    setFilters({ category: '', minPrice: '', maxPrice: '', sort: '' })
    setSearchParams({})
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg md:hidden"
        >
          <Filter className="w-5 h-5" /> Filtros
        </button>
      </div>

      <div className="flex gap-8">
        <aside className={`w-64 ${filtersOpen ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <div className="flex justify-between items-center mb-4 md:hidden">
              <h3 className="font-semibold">Filtros</h3>
              <button onClick={() => setFiltersOpen(false)}><X /></button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Categoría</h4>
                <select 
                  className="w-full p-2 border rounded"
                  value={filters.category}
                  onChange={e => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">Todas</option>
                  <option value="audifonos">Audífonos</option>
                  <option value="cables">Cables y Cargadores</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="smartwatches">Smartwatches</option>
                </select>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Precio</h4>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    placeholder="Mín" 
                    className="w-full p-2 border rounded"
                    value={filters.minPrice}
                    onChange={e => setFilters({ ...filters, minPrice: e.target.value })}
                  />
                  <input 
                    type="number" 
                    placeholder="Máx" 
                    className="w-full p-2 border rounded"
                    value={filters.maxPrice}
                    onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Ordenar por</h4>
                <select 
                  className="w-full p-2 border rounded"
                  value={filters.sort}
                  onChange={e => setFilters({ ...filters, sort: e.target.value })}
                >
                  <option value="">Más recientes</option>
                  <option value="price_asc">Precio: menor a mayor</option>
                  <option value="price_desc">Precio: mayor a menor</option>
                  <option value="name">Nombre A-Z</option>
                </select>
              </div>

              <button onClick={applyFilters} className="btn-primary w-full">
                Aplicar Filtros
              </button>
              <button onClick={clearFilters} className="btn-secondary w-full">
                Limpiar
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          {loading ? (
            <div className="text-center py-12">Cargando productos...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron productos</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams)
                        params.set('page', i + 1)
                        setSearchParams(params)
                      }}
                      className={`px-4 py-2 rounded ${
                        pagination.currentPage === i + 1 
                          ? 'bg-primary text-white' 
                          : 'bg-white border'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Catalog