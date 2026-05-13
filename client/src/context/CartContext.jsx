import { createContext, useContext, useState, useEffect } from 'react'
import { cartAPI } from '../services/api'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0, totalUSD: 0 })
  const [currency, setCurrency] = useState('PEN')
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadCart()
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}')
      setCart(localCart)
    }
  }, [user])

  const loadCart = async () => {
    try {
      const res = await cartAPI.getCart()
      setCart(res.data)
    } catch (error) {
      console.error('Error loading cart:', error)
    }
  }

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}')
      const existingItem = localCart.items.find(i => i.productId === product._id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        localCart.items.push({
          productId: product._id,
          name: product.name,
          image: product.images[0],
          price: product.price,
          priceUSD: product.priceUSD,
          quantity
        })
      }
      localCart.total = localCart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
      localCart.totalUSD = localCart.items.reduce((sum, i) => sum + (i.priceUSD * i.quantity), 0)
      localStorage.setItem('cart', JSON.stringify(localCart))
      setCart(localCart)
      return
    }

    // Optimistic update - update UI immediately
    setCart(prev => {
      const existingItem = prev.items.find(i => i.product?._id === product._id)
      let newItems
      if (existingItem) {
        newItems = prev.items.map(i => 
          i.product?._id === product._id 
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      } else {
        newItems = [...prev.items, {
          _id: `temp-${Date.now()}`,
          product: { _id: product._id, name: product.name, images: product.images },
          name: product.name,
          image: product.images[0],
          price: product.price,
          priceUSD: product.priceUSD,
          quantity
        }]
      }
      const newTotal = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
      const newTotalUSD = newItems.reduce((sum, i) => sum + (i.priceUSD * i.quantity), 0)
      return { ...prev, items: newItems, total: newTotal, totalUSD: newTotalUSD }
    })

    try {
      await cartAPI.addItem({ productId: product._id, quantity })
      await loadCart()
    } catch (error) {
      console.error('Error adding to cart:', error)
      await loadCart()
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}')
      const item = localCart.items.find(i => i.productId === itemId)
      if (item) {
        item.quantity = quantity
        if (quantity <= 0) {
          localCart.items = localCart.items.filter(i => i.productId !== itemId)
        }
      }
      localCart.total = localCart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
      localCart.totalUSD = localCart.items.reduce((sum, i) => sum + (i.priceUSD * i.quantity), 0)
      localStorage.setItem('cart', JSON.stringify(localCart))
      setCart(localCart)
      return
    }

    // Optimistic update - update UI immediately
    setCart(prev => {
      const newItems = prev.items.map(i => {
        if ((i._id?.toString() || i.productId) === itemId) {
          if (quantity <= 0) return null
          return { ...i, quantity }
        }
        return i
      }).filter(Boolean)
      const newTotal = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
      const newTotalUSD = newItems.reduce((sum, i) => sum + (i.priceUSD * i.quantity), 0)
      return { ...prev, items: newItems, total: newTotal, totalUSD: newTotalUSD }
    })

    try {
      await cartAPI.updateItem(itemId, { quantity })
    } catch (error) {
      console.error('Error updating cart:', error)
      await loadCart()
    }
  }

  const removeItem = async (itemId) => {
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}')
      localCart.items = localCart.items.filter(i => i.productId !== itemId)
      localCart.total = localCart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
      localCart.totalUSD = localCart.items.reduce((sum, i) => sum + (i.priceUSD * i.quantity), 0)
      localStorage.setItem('cart', JSON.stringify(localCart))
      setCart(localCart)
      return
    }

    // Optimistic update - update UI immediately
    setCart(prev => {
      const newItems = prev.items.filter(i => (i._id?.toString() || i.productId) !== itemId)
      const newTotal = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
      const newTotalUSD = newItems.reduce((sum, i) => sum + (i.priceUSD * i.quantity), 0)
      return { ...prev, items: newItems, total: newTotal, totalUSD: newTotalUSD }
    })

    try {
      await cartAPI.removeItem(itemId)
    } catch (error) {
      console.error('Error removing from cart:', error)
      await loadCart()
    }
  }

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, itemCount, currency, setCurrency }}>
      {children}
    </CartContext.Provider>
  )
}