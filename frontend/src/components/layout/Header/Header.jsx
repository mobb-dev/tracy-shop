import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { useCart } from '../../../contexts/CartContext'
import { searchProducts } from '../../../api/endpoints'
import styles from './Header.module.css'

export default function Header() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await searchProducts(query)
        setSuggestions(res.data.slice(0, 6))
      } catch {
        setSuggestions([])
      }
    }, 300)
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      setShowSuggestions(false)
      navigate(`/products?search=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.logo}>
          Tracy<span>Shop</span>
        </Link>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Tracy merchandise..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn}>🔍</button>
          {showSuggestions && suggestions.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions.map((p) => (
                <li key={p._id} onMouseDown={() => navigate(`/products/${p._id}`)}>
                  {p.name}
                </li>
              ))}
            </ul>
          )}
        </form>

        <div className={styles.actions}>
          {user ? (
            <div className={styles.accountMenu}>
              <Link to="/account" className={styles.accountLink}>
                👤 {user.profile?.firstName || 'Account'}
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>Sign Out</button>
            </div>
          ) : (
            <Link to="/login" className={styles.accountLink}>👤 Sign In</Link>
          )}
          <Link to="/cart" className={styles.cartLink}>
            🛒
            {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
          </Link>
        </div>
      </div>

      <nav className={styles.navBar}>
        <Link to="/products">All Products</Link>
        <Link to="/products?category=apparel">Apparel</Link>
        <Link to="/products?category=stickers">Stickers</Link>
        <Link to="/products?category=accessories">Accessories</Link>
        <Link to="/products?sale=true" className={styles.dealsLink}>🔥 Deals</Link>
      </nav>
    </header>
  )
}
