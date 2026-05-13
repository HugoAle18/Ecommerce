import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  name: String,
  image: String,
  price: Number,
  priceUSD: Number,
  quantity: Number
})

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    department: String,
    phone: String,
    reference: String
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash'],
    default: 'card'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentId: String,
  subtotal: Number,
  subtotalUSD: Number,
  shippingCost: {
    type: Number,
    default: 0
  },
  total: Number,
  totalUSD: Number,
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  notes: String
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)