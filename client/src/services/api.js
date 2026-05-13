import axios from 'axios'

const API = axios.create({
  baseURL: '/api'
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data)
}

export const productsAPI = {
  getAll: (params) => API.get('/products', { params }),
  getBySlug: (slug) => API.get(`/products/${slug}`),
  getFeatured: () => API.get('/products/featured')
}

export const cartAPI = {
  getCart: () => API.get('/cart'),
  addItem: (data) => API.post('/cart', data),
  updateItem: (itemId, data) => API.put(`/cart/item/${itemId}`, data),
  removeItem: (itemId) => API.delete(`/cart/item/${itemId}`),
  clearCart: () => API.delete('/cart/clear')
}

export const ordersAPI = {
  create: (data) => API.post('/orders', data),
  getMy: () => API.get('/orders'),
  getById: (id) => API.get(`/orders/${id}`)
}

export const paymentAPI = {
  createCheckout: (data) => API.post('/payment/create-checkout', data)
}

export default API