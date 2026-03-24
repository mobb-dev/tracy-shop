import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'

const router = express.Router()

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

const safeUser = (user) => {
  const { password, ...rest } = user
  return rest
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' })
    await db.read()
    const existing = db.data.users.find((u) => u.email === email)
    if (existing) return res.status(409).json({ message: 'Email already in use' })
    const hashed = await bcrypt.hash(password, 10)
    const user = {
      _id: uuidv4(),
      email,
      password: hashed,
      profile: { firstName: firstName || '', lastName: lastName || '' },
      addresses: [],
      orders: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    db.data.users.push(user)
    await db.write()
    const token = signToken(user._id)
    res.status(201).json({ token, user: safeUser(user) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' })
    await db.read()
    const user = db.data.users.find((u) => u.email === email)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    const token = signToken(user._id)
    res.json({ token, user: safeUser(user) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/auth/logout (stateless, just acknowledge)
router.post('/logout', (req, res) => res.json({ message: 'Logged out' }))

export default router
