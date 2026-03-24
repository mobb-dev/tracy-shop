# Tracy Shop - Demo E-Commerce Store

## Project Overview

Tracy Shop is a demo e-commerce application that sells Tracy merchandise. This project serves as a demonstration of modern e-commerce functionality without requiring backend infrastructure. All data is stored locally in the browser, making it perfect for showcasing front-end development skills and e-commerce UX patterns.

### Goals
- Demonstrate core e-commerce features and user flows
- Showcase React development best practices
- Provide a fully functional shopping experience without server dependencies
- Create an intuitive and responsive user interface

## Tech Stack

- **Framework**: React
- **State Management**: React Context API / Redux (TBD)
- **Styling**: CSS Modules / Tailwind CSS / Styled Components (TBD)
- **Backend/Database**: Basic Node.js/Express API with MongoDB or PostgreSQL (TBD)
- **Routing**: React Router
- **Build Tool**: Vite / Create React App (TBD)

## Feature Specifications

### 0. Homescreen & Navigation

**Design:**
- Modern, Amazon-like aesthetic with clean, minimal design
- Full-width header with:
  - Logo/branding on left
  - Prominent search bar in center
  - Account/Cart icons on right
  - Secondary navigation menu below (Categories, Deals, etc.)

**Hero Section:**
- Automatic carousel/slider showcasing on-sale products
- Auto-rotates every 5-7 seconds
- Manual navigation arrows on left/right
- Dot indicators for slide position
- High-quality banner images with product overlays
- Call-to-action buttons ("Shop Now" for each promotion)

**Category Section:**
- Grid layout of high-level product categories below hero slider
- Typically 4-6 categories visible
- Each category card displays:
  - Category image/icon
  - Category name
  - "Shop Now" link
- Responsive: 4 columns on desktop, 2 on tablet, 1 on mobile

**Search Functionality:**
- Real-time search suggestions as user types
- Search by product name, category, or description
- Quick access to recently searched items

### 1. Product Catalog
- Display Tracy merchandise with images, descriptions, and prices
- Product categories/filtering
- Search functionality
- Product detail pages
- Product variants (sizes, colors, etc.)

### 2. Shopping Cart
- Add/remove items from cart
- Update item quantities
- View cart summary with subtotal
- Persist cart data in LocalStorage
- Cart badge showing item count

### 3. Account Management
- User registration (stored locally)
- User login/logout
- Profile management (name, email, shipping address)
- Order history
- Saved addresses
- No actual authentication - simulated for demo purposes

### 4. Checkout Process
- Multi-step checkout flow:
  1. Cart review
  2. Shipping information
  3. Payment information (simulated)
  4. Order confirmation
- Form validation
- Order summary
- Generate order confirmation with order number

### 5. Order Management
- View past orders
- Order details page
- Order status tracking (simulated)

## Technical Architecture

### Data Storage Strategy

Data is persisted using a basic REST API backend with the following database schema:

**Backend Stack:**
- Node.js/Express server
- MongoDB or PostgreSQL database
- JWT for session management
- API endpoints for all CRUD operations

**Data Models:**

```javascript
// User Model
{
  "_id": "uuid",
  "email": "user@example.com",
  "password": "hashed",
  "profile": {
    "firstName": "",
    "lastName": "",
    "phone": ""
  },
  "addresses": [
    {
      "id": "uuid",
      "street": "",
      "city": "",
      "state": "",
      "zip": "",
      "country": "",
      "isDefault": false
    }
  ],
  "orders": ["orderId"], // Array of order references
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

// Product Model
{
  "_id": "uuid",
  "name": "",
  "description": "",
  "price": 0,
  "salePrice": 0,
  "isOnSale": false,
  "images": [
    {
      "url": "",
      "alt": ""
    }
  ],
  "category": "uuid", // Reference to Category
  "variants": [
    {
      "name": "size",
      "options": ["S", "M", "L", "XL"]
    }
  ],
  "stock": 0,
  "rating": 0,
  "reviews": ["reviewId"], // Array of review references
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

// Category Model
{
  "_id": "uuid",
  "name": "",
  "description": "",
  "image": "",
  "slug": ""
}

// Order Model
{
  "_id": "uuid",
  "orderNumber": "TRY-2024-001",
  "userId": "uuid", // Reference to User
  "items": [
    {
      "productId": "uuid",
      "quantity": 0,
      "price": 0,
      "variant": {}
    }
  ],
  "shippingAddress": {},
  "subtotal": 0,
  "tax": 0,
  "total": 0,
  "status": "pending", // pending, shipped, delivered, cancelled
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

// Client-side cart (LocalStorage)
{
  "tracy-shop:cart": {
    "items": [
      {
        "productId": "uuid",
        "quantity": 0,
        "variant": {}
      }
    ]
  },
  "tracy-shop:currentUser": "userId or null"
}
```

### Component Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   └── Badge/
│   ├── layout/          # Layout components
│   │   ├── Header/
│   │   │   ├── SearchBar/
│   │   │   ├── NavigationMenu/
│   │   │   └── CartIcon/
│   │   ├── Footer/
│   │   └── Navigation/
│   ├── home/            # Homescreen components
│   │   ├── HeroSlider/
│   │   │   ├── SlideItem/
│   │   │   ├── SlideControls/
│   │   │   └── SlideDots/
│   │   └── CategoryGrid/
│   │       └── CategoryCard/
│   ├── products/        # Product-related components
│   │   ├── ProductCard/
│   │   ├── ProductList/
│   │   ├── ProductDetail/
│   │   └── ProductFilter/
│   ├── cart/            # Cart components
│   │   ├── CartItem/
│   │   ├── CartSummary/
│   │   └── CartPage/
│   ├── checkout/        # Checkout flow
│   │   ├── CheckoutForm/
│   │   ├── ShippingForm/
│   │   ├── PaymentForm/
│   │   └── OrderConfirmation/
│   └── account/         # Account management
│       ├── Login/
│       ├── Register/
│       ├── Profile/
│       └── OrderHistory/
├── contexts/            # React Context providers
│   ├── AuthContext.js
│   ├── CartContext.js
│   └── ProductContext.js
├── hooks/               # Custom React hooks
│   ├── useAuth.js
│   ├── useCart.js
│   ├── useLocalStorage.js
│   └── useApi.js
├── api/                 # API client and utilities
│   ├── client.js        # Axios/Fetch wrapper
│   ├── endpoints.js     # API endpoint definitions
│   └── auth.js          # Authentication API calls
├── utils/               # Utility functions
│   ├── validation.js
│   ├── formatters.js
│   └── constants.js
├── pages/               # Page components
│   ├── Home/
│   ├── Products/
│   ├── ProductDetail/
│   ├── Cart/
│   ├── Checkout/
│   ├── Account/
│   └── OrderConfirmation/
└── App.js
```

### State Management Approach

- **Global State**: Use React Context API for user authentication, cart, and products
- **Local State**: Component-level state for forms and UI interactions
- **Persistence**: Custom hooks to sync state with LocalStorage

### Routing Structure

```
/                          # Home page
/products                  # Product catalog
/products/:id              # Product detail
/cart                      # Shopping cart
/checkout                  # Checkout flow
/checkout/shipping         # Shipping information
/checkout/payment          # Payment information
/checkout/confirmation     # Order confirmation
/account                   # Account dashboard
/account/profile           # Profile management
/account/orders            # Order history
/account/orders/:id        # Order detail
/login                     # Login page
/register                  # Registration page
```

## Development Guidelines

### Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

### Coding Standards

- Use functional components with hooks
- Follow React best practices and naming conventions
- Keep components small and focused (Single Responsibility Principle)
- Use PropTypes or TypeScript for type checking
- Write self-documenting code with clear variable names
- Add comments for complex logic only

### Local Storage Management

- Always handle LocalStorage errors gracefully (quota exceeded, disabled storage)
- Provide fallback for environments where LocalStorage is unavailable
- Clear sensitive data on logout
- Use a consistent key naming convention (e.g., `tracy-shop:users`)

### Demo Data

- Product images are ready in the `/assets` folder — use these directly for seeding
- The following catalog assets are available:

| File | Product |
|------|---------|
| `catalog-man-hoodie.jpg` | Men's Tracy Hoodie |
| `catalog-man-tshirt.jpg` | Men's Tracy T-Shirt |
| `catalog-woman-hoodie.jpg` | Women's Tracy Hoodie |
| `catalog-woman-tshirt.jpg` | Women's Tracy T-Shirt |
| `catalog-sticker-mobb.jpg` | Mobb Sticker Pack |
| `catalog-sticker-mobbtracy.jpg` | Mobb Tracy Sticker Pack |
| `catalog-sticker-timemachine.jpg` | Time Machine Sticker |
| `catalog-tracy-keycaps.jpg` | Tracy Keycaps Set |

- Seed the database with these 8 products across categories (Apparel, Stickers, Accessories)
- Consider pre-populating a demo account for quick testing

### Testing Considerations

- Test all LocalStorage interactions
- Verify cart persistence across page refreshes
- Test form validations
- Ensure responsive design on mobile/tablet/desktop
- Test with LocalStorage disabled

### Future Enhancements (Optional)

- Product reviews and ratings
- Wishlist functionality
- Promo codes/discounts
- Product recommendations
- Enhanced search with filters
- Multiple payment method simulations
- Export order data
- Dark mode theme

## Backend API Structure

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

### Product Endpoints
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - Get all categories
- `GET /api/products/onSale` - Get products on sale (for hero slider)

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/addresses` - Get saved addresses
- `POST /api/users/addresses` - Add new address

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

### Search Endpoint
- `GET /api/search` - Full-text search products

## Notes

- This is a **demo application** - no real payment processing
- Authentication is simulated (JWT tokens for session management)
- No actual email confirmations or communications
- Backend provides persistent data storage across sessions
- Focus on UX and realistic e-commerce flows
