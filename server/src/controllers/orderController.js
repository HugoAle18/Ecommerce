import Order from '../models/Order.js'
import Cart from '../models/Cart.js'

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, notes, items: selectedItems } = req.body

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío' })
    }

    let cartItems = cart.items
    if (selectedItems && selectedItems.length > 0) {
      cartItems = cart.items.filter(item =>
        selectedItems.includes(item.product._id.toString())
      )
      if (cartItems.length === 0) {
        return res.status(400).json({ message: 'No hay productos seleccionados' })
      }
    }

    const orderItems = cartItems.map(item => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.images[0],
      price: item.price,
      priceUSD: item.priceUSD,
      quantity: item.quantity
    }))

    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      subtotalUSD: subtotal,
      shippingCost: 0,
      total: subtotal,
      totalUSD: subtotal,
      notes
    })

    const purchasedIds = orderItems.map(item => item.product.toString())
    const remainingItems = cart.items.filter(item =>
      !purchasedIds.includes(item.product._id.toString())
    )
    const newTotal = remainingItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: remainingItems, total: newTotal, totalUSD: newTotal }
    )

    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' })
    }

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado' })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}