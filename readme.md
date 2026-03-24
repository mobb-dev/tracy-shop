# Tracy Shop

A demo e-commerce store selling Tracy merchandise. Built with React (Vite) + Node.js/Express + LowDB.

## Quick Start

### Prerequisites
- Node.js 18+

### 1. Install dependencies
```bash
npm run install:all
```

### 2. Configure backend
```bash
cp backend/.env.example backend/.env
# Edit backend/.env and set JWT_SECRET
```

### 3. Seed the database
```bash
npm run seed
# Creates 8 products, 3 categories, and a demo account
```

### 4. Run development servers

```bash
npm run dev
```

This starts both the backend (port 5080) and frontend (port 3000) concurrently.

Open http://localhost:3000

## Demo Account
- Email: demo@tracyshop.dev
- Password: demo1234
