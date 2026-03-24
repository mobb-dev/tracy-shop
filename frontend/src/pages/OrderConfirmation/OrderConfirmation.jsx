import { useLocation, Link } from 'react-router-dom'
import styles from './OrderConfirmation.module.css'

export default function OrderConfirmation() {
  const { state } = useLocation()
  const order = state?.order

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>Order Confirmed!</h1>
        <p className={styles.sub}>Thank you for your purchase.</p>

        {order && (
          <>
            <div className={styles.orderNum}>
              Order #{order.orderNumber}
            </div>
            <div className={styles.details}>
              <div className={styles.row}><span>Total</span><span>${order.total?.toFixed(2)}</span></div>
              <div className={styles.row}><span>Status</span><span className={styles.status}>{order.status}</span></div>
            </div>
          </>
        )}

        <p className={styles.note}>
          A confirmation email would be sent in a real store. This is a demo application.
        </p>

        <div className={styles.btnGroup}>
          <Link to="/account/orders" className={styles.ordersBtn}>View Orders</Link>
          <Link to="/products" className={styles.shopBtn}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
