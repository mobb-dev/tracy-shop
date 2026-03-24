import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initDb } from './db.js'

import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import categoryRoutes from './routes/categories.js'
import userRoutes from './routes/users.js'
import orderRoutes from './routes/orders.js'
import searchRoutes from './routes/search.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/search', searchRoutes)

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// Init DB then start server
initDb().then(() => {
  const port = process.env.PORT || 5000
  app.listen(port, () => {
    console.log(`Tracy Shop API running on http://localhost:${port}`)
    console.log('Database: LowDB (db.json)')
  })
}).catch((err) => {
  console.error('Failed to initialize database:', err)
  process.exit(1)
})
