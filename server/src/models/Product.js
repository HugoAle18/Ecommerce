import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  priceUSD: {
    type: Number,
    required: true
  },
  images: [{
    type: String
  }],
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 0
  },
  specs: {
    type: Map,
    of: String
  },
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

productSchema.index({ name: 'text', description: 'text' })

export default mongoose.model('Product', productSchema)