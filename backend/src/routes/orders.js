import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { authenticate, optionalAuth } from '../middleware/auth.js'
import { db } from '../db.js'

const router = express.Router()

const generateOrderNumber = () => {
  const year = new Date().getFullYear()
  const rand = Math.floor(Math.random() * 900000) + 100000
  return `TRY-${year}-${rand}`
}

const populateItems = (order, products) =>
  ({
    ...order,
    items: order.items.map((item) => ({
      ...item,
      productId: products.find((p) => p._id === item.productId) || item.productId,
    })),
  })

// POST /api/orders
router.post('/', optionalAuth, async (req, res) => {
  try {
    await db.read()
    const order = {
      _id: uuidv4(),
      orderNumber: generateOrderNumber(),
      userId: req.user?._id || null,
      ...req.body,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    db.data.orders.push(order)

    // Link order to user if authenticated
    if (req.user) {
      const idx = db.data.users.findIndex((u) => u._id === req.user._id)
      if (idx !== -1) {
        db.data.users[idx].orders.push(order._id)
        db.data.users[idx].updatedAt = new Date().toISOString()
      }
    }

    await db.write()
    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/orders
router.get('/', authenticate, async (req, res) => {
  try {
    await db.read()
    const { orders, products } = db.data
    const userOrders = orders
      .filter((o) => o.userId === req.user._id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((o) => populateItems(o, products))
    res.json(userOrders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/orders/:id
router.get('/:id', authenticate, async (req, res) => {
  try {
    await db.read()
    const { orders, products } = db.data
    const order = orders.find(
      (o) => o._id === req.params.id && o.userId === req.user._id
    )
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(populateItems(order, products))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
