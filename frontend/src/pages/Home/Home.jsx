import { useState, useEffect } from 'react'
import { getOnSaleProducts, getCategories, getProducts } from '../../api/endpoints'
import HeroSlider from '../../components/home/HeroSlider/HeroSlider'
import CategoryGrid from '../../components/home/CategoryGrid/CategoryGrid'
import ProductCard from '../../components/products/ProductCard/ProductCard'
import styles from './Home.module.css'

export default function Home() {
  const [saleProducts, setSaleProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getOnSaleProducts(), getCategories(), getProducts({ limit: 8 })])
      .then(([saleRes, catRes, prodRes]) => {
        setSaleProducts(saleRes.data)
        setCategories(catRes.data)
        setFeatured(prodRes.data.products || prodRes.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.home}>
      <HeroSlider slides={saleProducts} />

      <CategoryGrid categories={categories} />

      <section className={styles.featured}>
        <div className={styles.featuredInner}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <div className={styles.productGrid}>
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
