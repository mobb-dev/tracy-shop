import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct } from '../../api/endpoints'
import { useCart } from '../../contexts/CartContext'
import styles from './ProductDetail.module.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    getProduct(id)
      .then((res) => setProduct(res.data))
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false))
  }, [id, navigate])

  if (loading) return <div className={styles.loading}>Loading...</div>
  if (!product) return null

  const price = product.isOnSale && product.salePrice ? product.salePrice : product.price

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariants)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.gallery}>
        <img
          src={product.images?.[selectedImage]?.url}
          alt={product.name}
          className={styles.mainImage}
        />
        {product.images?.length > 1 && (
          <div className={styles.thumbs}>
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`${product.name} ${i + 1}`}
                className={`${styles.thumb} ${i === selectedImage ? styles.activeThumb : ''}`}
                onClick={() => setSelectedImage(i)}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.details}>
        <h1 className={styles.name}>{product.name}</h1>

        {product.rating > 0 && (
          <div className={styles.rating}>
            {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
            <span className={styles.ratingNum}>{product.rating.toFixed(1)}</span>
          </div>
        )}

        <div className={styles.priceRow}>
          <span className={styles.price}>${price.toFixed(2)}</span>
          {product.isOnSale && product.salePrice && (
            <>
              <span className={styles.original}>${product.price.toFixed(2)}</span>
              <span className={styles.saveBadge}>
                Save ${(product.price - product.salePrice).toFixed(2)}
              </span>
            </>
          )}
        </div>

        <p className={styles.description}>{product.description}</p>

        {product.variants?.map((variant) => (
          <div key={variant.name} className={styles.variantGroup}>
            <h4 className={styles.variantLabel}>{variant.name.charAt(0).toUpperCase() + variant.name.slice(1)}:</h4>
            <div className={styles.variantOptions}>
              {variant.options.map((opt) => (
                <button
                  key={opt}
                  className={`${styles.variantBtn} ${selectedVariants[variant.name] === opt ? styles.activeVariant : ''}`}
                  onClick={() => setSelectedVariants((v) => ({ ...v, [variant.name]: opt }))}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className={styles.quantityRow}>
          <label>Qty:</label>
          <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}
          </select>
        </div>

        <button className={`${styles.addBtn} ${added ? styles.addedBtn : ''}`} onClick={handleAddToCart}>
          {added ? '✓ Added to Cart!' : 'Add to Cart'}
        </button>
        <button className={styles.buyBtn} onClick={() => { handleAddToCart(); navigate('/cart') }}>
          Buy Now
        </button>

        {product.stock <= 5 && product.stock > 0 && (
          <p className={styles.stockWarn}>Only {product.stock} left in stock!</p>
        )}
      </div>
    </div>
  )
}
