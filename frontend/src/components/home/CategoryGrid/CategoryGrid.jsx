import { useNavigate } from 'react-router-dom'
import styles from './CategoryGrid.module.css'

export default function CategoryGrid({ categories }) {
  const navigate = useNavigate()

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Shop by Category</h2>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <div
            key={cat._id}
            className={styles.card}
            onClick={() => navigate(`/products?category=${cat.slug}`)}
          >
            <div className={styles.imageWrap}>
              <img src={cat.image} alt={cat.name} className={styles.image} />
            </div>
            <div className={styles.label}>
              <h3>{cat.name}</h3>
              <span className={styles.shopLink}>Shop Now →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
