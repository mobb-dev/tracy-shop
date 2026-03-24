import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrder } from '../../api/endpoints'
import styles from './Account.module.css'

export default function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrder(id).then((res) => setOrder(res.data)).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className={styles.loading}>Loading...</div>
  if (!order) return <div className={styles.loading}>Order not found.</div>

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <h3>My Account</h3>
        <nav className={styles.nav}>
          <Link to="/account">Profile</Link>
          <Link to="/account/orders" className={styles.activeLink}>Order History</Link>
        </nav>
      </aside>

      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link to="/account/orders">← Back to Orders</Link>
        </div>
        <h2>Order #{order.orderNumber}</h2>
        <span className={`${styles.status} ${styles[order.status]}`}>{order.status}</span>

        <div className={styles.section}>
          <h4>Items</h4>
          {order.items?.map((item, i) => (
            <div key={i} className={styles.detailItem}>
              <span>{item.productId?.name || 'Product'}</span>
              <span>× {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <h4>Shipping Address</h4>
          <p>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
          <p>{order.shippingAddress?.street}, {order.shippingAddress?.city}</p>
          <p>{order.shippingAddress?.state} {order.shippingAddress?.zip}</p>
        </div>

        <div className={styles.section}>
          <h4>Order Summary</h4>
          <div className={styles.summaryRow}><span>Subtotal</span><span>${order.subtotal?.toFixed(2)}</span></div>
          <div className={styles.summaryRow}><span>Tax</span><span>${order.tax?.toFixed(2)}</span></div>
          <div className={`${styles.summaryRow} ${styles.bolded}`}><span>Total</span><span>${order.total?.toFixed(2)}</span></div>
        </div>
      </main>
    </div>
  )
}
