import Product from '../models/Product.js'

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, brand, minPrice, maxPrice, search, sort } = req.query

    const query = { isActive: true }

    if (category) query.category = category
    if (brand) query.brand = brand
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }
    if (search) {
      query.$text = { $search: search }
    }

    let sortOption = { createdAt: -1 }
    if (sort === 'price_asc') sortOption = { price: 1 }
    if (sort === 'price_desc') sortOption = { price: -1 }
    if (sort === 'name') sortOption = { name: 1 }

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit))

    const total = await Product.countDocuments(query)

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true })
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true, isFeatured: true }).limit(8)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Producto eliminado' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}