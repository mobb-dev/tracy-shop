import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

const CART_KEY = 'tracy-shop:cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product, quantity = 1, variant = {}) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === product._id && JSON.stringify(i.variant) === JSON.stringify(variant)
      )
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { productId: product._id, product, quantity, variant }]
    })
  }

  const removeItem = (productId, variant = {}) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && JSON.stringify(i.variant) === JSON.stringify(variant))
      )
    )
  }

  const updateQuantity = (productId, quantity, variant = {}) => {
    if (quantity <= 0) return removeItem(productId, variant)
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && JSON.stringify(i.variant) === JSON.stringify(variant)
          ? { ...i, quantity }
          : i
      )
    )
  }

  const clearCart = () => setItems([])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => {
    const price = i.product?.salePrice || i.product?.price || 0
    return sum + price * i.quantity
  }, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
