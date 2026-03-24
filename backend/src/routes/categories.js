import express from 'express'
import { db } from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    await db.read()
    res.json(db.data.categories)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
