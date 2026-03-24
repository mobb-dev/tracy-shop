import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Account from './pages/Account/Account'
import OrderHistory from './pages/Account/OrderHistory'
import OrderDetail from './pages/Account/OrderDetail'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/confirmation" element={<OrderConfirmation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/account" element={<Account />} />
                <Route path="/account/orders" element={<OrderHistory />} />
                <Route path="/account/orders/:id" element={<OrderDetail />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
