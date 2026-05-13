import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product')

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], total: 0, totalUSD: 0 })
    }

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    let cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], total: 0, totalUSD: 0 })
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        priceUSD: product.priceUSD
      })
    }

    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    cart.totalUSD = cart.items.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0)

    await cart.save()
    cart = await Cart.findById(cart._id).populate('items.product')

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' })
    }

    const item = cart.items.find(i => i._id.toString() === req.params.itemId)
    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' })
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(i => i._id.toString() !== req.params.itemId)
    } else {
      item.quantity = quantity
    }

    cart.total = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
    cart.totalUSD = cart.items.reduce((sum, i) => sum + (i.priceUSD * i.quantity), 0)

    await cart.save()
    cart = await Cart.findById(cart._id).populate('items.product')

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' })
    }

    cart.items = cart.items.filter(i => i._id.toString() !== req.params.itemId)

    cart.total = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
    cart.totalUSD = cart.items.reduce((sum, i) => sum + (i.priceUSD * i.quantity), 0)

    await cart.save()
    cart = await Cart.findById(cart._id).populate('items.product')

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], total: 0, totalUSD: 0 },
      { new: true }
    )
    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}