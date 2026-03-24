import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getOrders } from '../../api/endpoints'
import styles from './Account.module.css'

export default function OrderHistory() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && !user) navigate('/login')
    if (user) {
      getOrders()
        .then((res) => setOrders(res.data))
        .catch(console.error)
        .finally(() => setFetching(false))
    }
  }, [user, loading, navigate])

  if (loading || fetching) return <div className={styles.loading}>Loading...</div>

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
        <h2>Order History</h2>
        {orders.length === 0 ? (
          <div className={styles.empty}>
            <p>No orders yet.</p>
            <Link to="/products" className={styles.shopBtn}>Start Shopping</Link>
          </div>
        ) : (
          <div className={styles.orderList}>
            {orders.map((order) => (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <span className={styles.orderNum}>#{order.orderNumber}</span>
                  <span className={`${styles.status} ${styles[order.status]}`}>{order.status}</span>
                  <span className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className={styles.orderItems}>
                  {order.items?.map((item, i) => (
                    <span key={i} className={styles.orderItemName}>
                      {item.productId?.name || 'Item'} × {item.quantity}
                    </span>
                  ))}
                </div>
                <div className={styles.orderFooter}>
                  <span className={styles.orderTotal}>Total: ${order.total?.toFixed(2)}</span>
                  <Link to={`/account/orders/${order._id}`} className={styles.viewLink}>View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
