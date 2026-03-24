import jwt from 'jsonwebtoken'
import { db } from '../db.js'

const getUser = async (id) => {
  await db.read()
  const user = db.data.users.find((u) => u._id === id)
  if (!user) return null
  const { password, ...safe } = user
  return safe
}

export const authenticate = async (req, res, next) => {
  try {
    const auth = req.headers.authorization
    if (!auth?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }
    const token = auth.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await getUser(decoded.id)
    if (!user) return res.status(401).json({ message: 'User not found' })
    req.user = user
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export const optionalAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization
    if (auth?.startsWith('Bearer ')) {
      const token = auth.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await getUser(decoded.id)
    }
  } catch { /* proceed without user */ }
  next()
}
