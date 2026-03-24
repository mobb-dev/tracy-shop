import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <h4>Tracy Shop</h4>
          <p>Official merchandise for Tracy fans.</p>
        </div>
        <div className={styles.col}>
          <h4>Shop</h4>
          <Link to="/products">All Products</Link>
          <Link to="/products?category=apparel">Apparel</Link>
          <Link to="/products?category=stickers">Stickers</Link>
          <Link to="/products?category=accessories">Accessories</Link>
        </div>
        <div className={styles.col}>
          <h4>Account</h4>
          <Link to="/login">Sign In</Link>
          <Link to="/register">Register</Link>
          <Link to="/account/orders">Order History</Link>
        </div>
        <div className={styles.col}>
          <h4>Help</h4>
          <p>support@tracyshop.dev</p>
        </div>
      </div>
      <div className={styles.bottom}>
        © {new Date().getFullYear()} Tracy Shop. Demo application.
      </div>
    </footer>
  )
}
