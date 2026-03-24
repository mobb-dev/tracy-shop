import { useCart } from '../../contexts/CartContext'
import { useNavigate, Link } from 'react-router-dom'
import styles from './Cart.module.css'

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/products" className={styles.shopLink}>Start Shopping</Link>
      </div>
    )
  }

  const tax = subtotal * 0.13
  const total = subtotal + tax

  return (
    <div className={styles.page}>
      <div className={styles.items}>
        <h2 className={styles.heading}>Shopping Cart ({itemCount} items)</h2>
        {items.map((item) => {
          const price = item.product?.salePrice || item.product?.price || 0
          return (
            <div key={`${item.productId}-${JSON.stringify(item.variant)}`} className={styles.item}>
              <img
                src={item.product?.images?.[0]?.url}
                alt={item.product?.name}
                className={styles.itemImage}
                onClick={() => navigate(`/products/${item.productId}`)}
              />
              <div className={styles.itemInfo}>
                <h3
                  className={styles.itemName}
                  onClick={() => navigate(`/products/${item.productId}`)}
                >
                  {item.product?.name}
                </h3>
                {Object.entries(item.variant || {}).map(([k, v]) => (
                  <p key={k} className={styles.variant}>{k}: {v}</p>
                ))}
                <div className={styles.itemActions}>
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.productId, Number(e.target.value), item.variant)}
                  >
                    {[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}
                  </select>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.productId, item.variant)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className={styles.itemPrice}>
                ${(price * item.quantity).toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>

      <aside className={styles.summary}>
        <h3 className={styles.summaryTitle}>Order Summary</h3>
        <div className={styles.summaryRow}>
          <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Tax (13%)</span><span>${tax.toFixed(2)}</span>
        </div>
        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
          <span>Total</span><span>${total.toFixed(2)}</span>
        </div>
        <button className={styles.checkoutBtn} onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </button>
        <Link to="/products" className={styles.continueLink}>← Continue Shopping</Link>
      </aside>
    </div>
  )
}
