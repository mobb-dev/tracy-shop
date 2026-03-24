import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { db, initDb } from './db.js'

// Base URL for catalog images — publicDir serves ../assets at root /
const IMG = (file) => `/${file}`

const now = () => new Date().toISOString()

const categories = [
  { _id: uuidv4(), name: 'Apparel', slug: 'apparel', description: 'Tracy branded clothing', image: IMG('catalog-man-hoodie.jpg') },
  { _id: uuidv4(), name: 'Stickers', slug: 'stickers', description: 'Tracy sticker packs', image: IMG('catalog-sticker-mobb.jpg') },
  { _id: uuidv4(), name: 'Accessories', slug: 'accessories', description: 'Tracy accessories', image: IMG('catalog-tracy-keycaps.jpg') },
]

const buildProducts = (cats) => {
  const apparel = cats.find((c) => c.slug === 'apparel')._id
  const stickers = cats.find((c) => c.slug === 'stickers')._id
  const accessories = cats.find((c) => c.slug === 'accessories')._id

  return [
    {
      _id: uuidv4(),
      name: "Men's Tracy Hoodie",
      description: "Stay cozy and represent Tracy with this premium men's hoodie. Features the iconic Tracy logo on the chest.",
      price: 59.99,
      salePrice: 44.99,
      isOnSale: true,
      images: [{ url: IMG('catalog-man-hoodie.jpg'), alt: "Men's Tracy Hoodie" }],
      category: apparel,
      variants: [{ name: 'size', options: ['S', 'M', 'L', 'XL', 'XXL'] }],
      stock: 50,
      rating: 4.7,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      _id: uuidv4(),
      name: "Men's Tracy T-Shirt",
      description: "Comfortable everyday t-shirt with the Tracy branding. Made from 100% cotton.",
      price: 29.99,
      salePrice: null,
      isOnSale: false,
      images: [{ url: IMG('catalog-man-tshirt.jpg'), alt: "Men's Tracy T-Shirt" }],
      category: apparel,
      variants: [{ name: 'size', options: ['S', 'M', 'L', 'XL'] }],
      stock: 80,
      rating: 4.5,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      _id: uuidv4(),
      name: "Women's Tracy Hoodie",
      description: "Stylish women's hoodie featuring the Tracy logo. Perfect for casual wear.",
      price: 59.99,
      salePrice: 49.99,
      isOnSale: true,
      images: [{ url: IMG('catalog-woman-hoodie.jpg'), alt: "Women's Tracy Hoodie" }],
      category: apparel,
      variants: [{ name: 'size', options: ['XS', 'S', 'M', 'L', 'XL'] }],
      stock: 45,
      rating: 4.8,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      _id: uuidv4(),
      name: "Women's Tracy T-Shirt",
      description: "Lightweight and stylish women's t-shirt with Tracy branding.",
      price: 29.99,
      salePrice: null,
      isOnSale: false,
      images: [{ url: IMG('catalog-woman-tshirt.jpg'), alt: "Women's Tracy T-Shirt" }],
      category: apparel,
      variants: [{ name: 'size', options: ['XS', 'S', 'M', 'L'] }],
      stock: 70,
      rating: 4.6,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      _id: uuidv4(),
      name: 'Mobb Sticker Pack',
      description: 'A collection of high-quality vinyl stickers featuring the Mobb design. Weatherproof and long-lasting.',
      price: 9.99,
      salePrice: 6.99,
      isOnSale: true,
      images: [{ url: IMG('catalog-sticker-mobb.jpg'), alt: 'Mobb Sticker Pack' }],
      category: stickers,
      variants: [],
      stock: 200,
      rating: 4.9,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      _id: uuidv4(),
      name: 'Mobb Tracy Sticker Pack',
      description: 'Exclusive Mobb Tracy collaboration sticker set. Limited edition vinyl stickers.',
      price: 12.99,
      salePrice: null,
      isOnSale: false,
      images: [{ url: IMG('catalog-sticker-mobbtracy.jpg'), alt: 'Mobb Tracy Sticker Pack' }],
      category: stickers,
      variants: [],
      stock: 150,
      rating: 4.8,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      _id: uuidv4(),
      name: 'Time Machine Sticker',
      description: 'The iconic Tracy Time Machine sticker. A must-have for any Tracy fan.',
      price: 4.99,
      salePrice: null,
      isOnSale: false,
      images: [{ url: IMG('catalog-sticker-timemachine.jpg'), alt: 'Time Machine Sticker' }],
      category: stickers,
      variants: [],
      stock: 300,
      rating: 5.0,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      _id: uuidv4(),
      name: 'Tracy Keycaps Set',
      description: 'Custom Tracy-themed keycaps for mechanical keyboards. PBT material, OEM profile. Fits standard layouts.',
      price: 39.99,
      salePrice: 29.99,
      isOnSale: true,
      images: [{ url: IMG('catalog-tracy-keycaps.jpg'), alt: 'Tracy Keycaps Set' }],
      category: accessories,
      variants: [{ name: 'layout', options: ['ANSI', 'ISO'] }],
      stock: 40,
      rating: 4.9,
      createdAt: now(),
      updatedAt: now(),
    },
  ]
}

async function seed() {
  await initDb()

  // Clear products, categories (preserve existing users/orders)
  db.data.categories = categories
  console.log(`Seeded ${categories.length} categories`)

  const products = buildProducts(categories)
  db.data.products = products
  console.log(`Seeded ${products.length} products`)

  // Create / replace demo user
  const demoIdx = db.data.users.findIndex((u) => u.email === 'demo@tracyshop.dev')
  const demoUser = {
    _id: demoIdx !== -1 ? db.data.users[demoIdx]._id : uuidv4(),
    email: 'demo@tracyshop.dev',
    password: await bcrypt.hash('demo1234', 10),
    profile: { firstName: 'Demo', lastName: 'User' },
    addresses: [],
    orders: [],
    createdAt: now(),
    updatedAt: now(),
  }
  if (demoIdx !== -1) {
    db.data.users[demoIdx] = demoUser
  } else {
    db.data.users.push(demoUser)
  }
  console.log('Created demo user: demo@tracyshop.dev / demo1234')

  await db.write()
  console.log('Seeding complete! db.json written.')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
