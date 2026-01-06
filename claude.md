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
- **Local Storage**: Browser LocalStorage API
- **Routing**: React Router
- **Build Tool**: Vite / Create React App (TBD)

## Feature Specifications

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

All data is stored in browser LocalStorage with the following structure:

```javascript
// User data
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "password": "hashed", // Simple encoding for demo
      "profile": {
        "firstName": "",
        "lastName": "",
        "phone": ""
      },
      "addresses": [],
      "orders": []
    }
  ],
  "currentUser": "userId or null"
}

// Product catalog (could be hardcoded or in LocalStorage)
{
  "products": [
    {
      "id": "uuid",
      "name": "",
      "description": "",
      "price": 0,
      "images": [],
      "category": "",
      "variants": []
    }
  ]
}

// Shopping cart
{
  "cart": {
    "items": [
      {
        "productId": "",
        "quantity": 0,
        "variant": {}
      }
    ]
  }
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
│   │   └── Modal/
│   ├── layout/          # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Navigation/
│   ├── products/        # Product-related components
│   │   ├── ProductCard/
│   │   ├── ProductList/
│   │   ├── ProductDetail/
│   │   └── ProductFilter/
│   ├── cart/            # Cart components
│   │   ├── CartItem/
│   │   ├── CartSummary/
│   │   └── CartIcon/
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
│   ├── useLocalStorage.js
│   ├── useAuth.js
│   └── useCart.js
├── utils/               # Utility functions
│   ├── storage.js
│   ├── validation.js
│   └── formatters.js
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

- Include seed data for products (at least 10-15 Tracy merchandise items)
- Provide mock product images (can use placeholders initially)
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

## Notes

- This is a **demo application** - no real payment processing or user authentication
- All passwords are stored locally (use simple encoding, not production-grade security)
- No actual email confirmations or communications
- Product inventory is not tracked (items never go out of stock)
- Focus on UX and frontend functionality over backend simulation
