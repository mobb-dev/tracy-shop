# Tracy Shop

A demo e-commerce store selling Tracy merchandise. Built with React (Vite) + Node.js/Express + MongoDB.

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas free tier)

### 1. Install dependencies
```bash
npm run install:all
```n
### 2. Configure backend
```bash
cp backend/.env.example backend/.env
# Edit backend/.env and set your MONGODB_URI
```n
### 3. Seed the database
```bash
npm run seed
# Creates 8 products, 3 categories, and a demo account
```n
### 4. Run development servers

**Backend** (port 5000):
```bash
npm run dev:backend
```n
**Frontend** (port 3000):
```bash
npm run dev:frontend
```n
Open http://localhost:3000

## Demo Account
- Email: demo@tracyshop.dev
- Password: demo1234
