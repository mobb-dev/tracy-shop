import express from 'express'
import { db } from '../db.js'

const router = express.Router()

// GET /api/search?q=...
router.get('/', async (req, res) => {
  try {
    const { q } = req.query
    if (!q?.trim()) return res.json([])

    await db.read()
    const { products, categories } = db.data
    const query = q.toLowerCase()

    const results = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
      .slice(0, 10)
      .map((p) => ({
        ...p,
        category: categories.find((c) => c._id === p.category) || p.category,
      }))

    res.json(results)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
