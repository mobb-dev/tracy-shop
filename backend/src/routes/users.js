import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { authenticate } from '../middleware/auth.js'
import { db } from '../db.js'

const router = express.Router()

// GET /api/users/profile
router.get('/profile', authenticate, (req, res) => {
  res.json(req.user)
})

// PUT /api/users/profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    await db.read()
    const { profile } = req.body
    const idx = db.data.users.findIndex((u) => u._id === req.user._id)
    if (idx === -1) return res.status(404).json({ message: 'User not found' })
    db.data.users[idx].profile = { ...db.data.users[idx].profile, ...profile }
    db.data.users[idx].updatedAt = new Date().toISOString()
    await db.write()
    const { password, ...safe } = db.data.users[idx]
    res.json(safe)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/users/addresses
router.get('/addresses', authenticate, (req, res) => {
  res.json(req.user.addresses || [])
})

// POST /api/users/addresses
router.post('/addresses', authenticate, async (req, res) => {
  try {
    await db.read()
    const idx = db.data.users.findIndex((u) => u._id === req.user._id)
    if (idx === -1) return res.status(404).json({ message: 'User not found' })
    const address = { id: uuidv4(), ...req.body }
    db.data.users[idx].addresses.push(address)
    db.data.users[idx].updatedAt = new Date().toISOString()
    await db.write()
    res.status(201).json(db.data.users[idx].addresses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
