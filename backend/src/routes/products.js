import express from 'express'
import { db } from '../db.js'

const router = express.Router()

const withCategory = (product, categories) => ({
  ...product,
  category: categories.find((c) => c._id === product.category) || product.category,
})

// GET /api/products/onSale  (must be before /:id)
router.get('/onSale', async (req, res) => {
  try {
    await db.read()
    const { products, categories } = db.data
    const result = products
      .filter((p) => p.isOnSale)
      .slice(0, 6)
      .map((p) => withCategory(p, categories))
    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/products
router.get('/', async (req, res) => {
  try {
    await db.read()
    const { products, categories } = db.data
    const { category, search, sale, page = 1, limit = 12 } = req.query

    let filtered = [...products]

    if (category) {
      const cat = categories.find((c) => c.slug === category)
      if (cat) filtered = filtered.filter((p) => p.category === cat._id)
    }

    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    if (sale === 'true') filtered = filtered.filter((p) => p.isOnSale)

    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    const total = filtered.length
    const skip = (Number(page) - 1) * Number(limit)
    const paginated = filtered
      .slice(skip, skip + Number(limit))
      .map((p) => withCategory(p, categories))

    res.json({ products: paginated, total, page: Number(page), limit: Number(limit) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    await db.read()
    const { products, categories } = db.data
    const product = products.find((p) => p._id === req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(withCategory(product, categories))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
