import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './HeroSlider.module.css'

export default function HeroSlider({ slides }) {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
  }, [slides.length])

  const prev = () => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    if (slides.length < 2) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, slides.length])

  if (!slides || slides.length === 0) return null

  const slide = slides[current]

  return (
    <div className={styles.sliderOuter}>
    <div className={styles.slider}>
      <div
        className={styles.slide}
        style={{ backgroundImage: `url(${slide.images?.[0]?.url ?? slide.imageUrl})` }}
      >
        <div className={styles.overlay}>
          <div className={styles.content}>
            <p className={styles.tag}>Limited Time Offer</p>
            <h2 className={styles.title}>{slide.name}</h2>
            <p className={styles.price}>
              <span className={styles.salePrice}>${slide.salePrice?.toFixed(2)}</span>
              <span className={styles.originalPrice}>${slide.price?.toFixed(2)}</span>
            </p>
            <button
              className={styles.cta}
              onClick={() => navigate(`/products/${slide._id}`)}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev}>&#8249;</button>
          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next}>&#8250;</button>
          <div className={styles.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.activeDot : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
    </div>
  )
}
