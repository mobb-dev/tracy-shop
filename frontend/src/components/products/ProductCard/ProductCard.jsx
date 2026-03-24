import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../contexts/CartContext'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addItem } = useCart()

  const price = product.salePrice || product.price
  const hasDiscount = product.isOnSale && product.salePrice

  return (
    <div className={styles.card} onClick={() => navigate(`/products/${product._id}`)}>
      <div className={styles.imageWrap}>
        {hasDiscount && <span className={styles.saleBadge}>SALE</span>}
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.priceRow}>
          <span className={styles.price}>${price.toFixed(2)}</span>
          {hasDiscount && (
            <span className={styles.original}>${product.price.toFixed(2)}</span>
          )}
        </div>
        {product.rating > 0 && (
          <div className={styles.rating}>
            {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
            <span className={styles.ratingNum}>({product.rating.toFixed(1)})</span>
          </div>
        )}
        <button
          className={styles.addBtn}
          onClick={(e) => {
            e.stopPropagation()
            addItem(product)
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
