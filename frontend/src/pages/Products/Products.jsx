import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts, getCategories } from '../../api/endpoints'
import ProductCard from '../../components/products/ProductCard/ProductCard'
import styles from './Products.module.css'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const category = searchParams.get('category') || ''
  const search = searchParams.get('search') || ''
  const sale = searchParams.get('sale') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 12

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getProducts({ category, search, sale, page, limit }),
      getCategories(),
    ])
      .then(([prodRes, catRes]) => {
        const data = prodRes.data
        setProducts(data.products || data)
        setTotal(data.total || (data.products || data).length)
        setCategories(catRes.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [category, search, sale, page])

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    next.delete('page')
    setSearchParams(next)
  }

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <h3>Categories</h3>
        <ul className={styles.catList}>
          <li
            className={!category ? styles.active : ''}
            onClick={() => setFilter('category', '')}
          >
            All
          </li>
          {categories.map((c) => (
            <li
              key={c._id}
              className={category === c.slug ? styles.active : ''}
              onClick={() => setFilter('category', c.slug)}
            >
              {c.name}
            </li>
          ))}
        </ul>

        <div className={styles.filterGroup}>
          <h3>Filter</h3>
          <label className={styles.checkLabel}>
            <input
              type="checkbox"
              checked={sale === 'true'}
              onChange={(e) => setFilter('sale', e.target.checked ? 'true' : '')}
            />
            On Sale
          </label>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <h2 className={styles.heading}>
            {search ? `Results for "${search}"` : category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
          </h2>
          <span className={styles.count}>{total} items</span>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : products.length === 0 ? (
          <div className={styles.empty}>No products found.</div>
        ) : (
          <div className={styles.grid}>
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}

        {total > limit && (
          <div className={styles.pagination}>
            {page > 1 && (
              <button onClick={() => setFilter('page', String(page - 1))}>← Prev</button>
            )}
            <span>Page {page} of {Math.ceil(total / limit)}</span>
            {page < Math.ceil(total / limit) && (
              <button onClick={() => setFilter('page', String(page + 1))}>Next →</button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
