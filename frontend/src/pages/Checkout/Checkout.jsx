import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { createOrder } from '../../api/endpoints'
import styles from './Checkout.module.css'

const STEPS = ['Cart Review', 'Shipping', 'Payment', 'Confirm']

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [shipping, setShipping] = useState({
    firstName: user?.profile?.firstName || '',
    lastName: user?.profile?.lastName || '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'CA',
  })
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvv: '', name: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const tax = subtotal * 0.13
  const total = subtotal + tax

  const validateShipping = () => {
    const e = {}
    if (!shipping.firstName) e.firstName = 'Required'
    if (!shipping.lastName) e.lastName = 'Required'
    if (!shipping.street) e.street = 'Required'
    if (!shipping.city) e.city = 'Required'
    if (!shipping.state) e.state = 'Required'
    if (!shipping.zip) e.zip = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validatePayment = () => {
    const e = {}
    if (!payment.cardNumber || payment.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter valid card number'
    if (!payment.expiry) e.expiry = 'Required'
    if (!payment.cvv || payment.cvv.length < 3) e.cvv = 'Invalid CVV'
    if (!payment.name) e.name = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePlaceOrder = async () => {
    setSubmitting(true)
    try {
      const orderData = {
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.product?.salePrice || i.product?.price,
          variant: i.variant,
        })),
        shippingAddress: shipping,
        subtotal,
        tax,
        total,
      }
      const res = await createOrder(orderData)
      clearCart()
      navigate('/checkout/confirmation', { state: { order: res.data } })
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to place order. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0 && step < 4) {
    navigate('/cart')
    return null
  }

  return (
    <div className={styles.page}>
      <div className={styles.steps}>
        {STEPS.map((s, i) => (
          <div key={s} className={`${styles.step} ${i + 1 === step ? styles.activeStep : ''} ${i + 1 < step ? styles.doneStep : ''}`}>
            <span className={styles.stepNum}>{i + 1 < step ? '✓' : i + 1}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div className={styles.body}>
        <div className={styles.form}>
          {step === 1 && (
            <div>
              <h2>Review Your Cart</h2>
              {items.map((item) => (
                <div key={item.productId} className={styles.reviewItem}>
                  <img src={item.product?.images?.[0]?.url} alt={item.product?.name} />
                  <div>
                    <p className={styles.reviewName}>{item.product?.name}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <p>${((item.product?.salePrice || item.product?.price) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <button className={styles.nextBtn} onClick={() => setStep(2)}>Continue to Shipping</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Shipping Information</h2>
              <div className={styles.grid2}>
                {['firstName', 'lastName'].map((f) => (
                  <div key={f} className={styles.field}>
                    <label>{f === 'firstName' ? 'First Name' : 'Last Name'}</label>
                    <input value={shipping[f]} onChange={(e) => setShipping((s) => ({ ...s, [f]: e.target.value }))} />
                    {errors[f] && <span className={styles.err}>{errors[f]}</span>}
                  </div>
                ))}
              </div>
              {[['street', 'Street Address'], ['city', 'City'], ['state', 'Province/State'], ['zip', 'Postal/ZIP Code']].map(([f, label]) => (
                <div key={f} className={styles.field}>
                  <label>{label}</label>
                  <input value={shipping[f]} onChange={(e) => setShipping((s) => ({ ...s, [f]: e.target.value }))} />
                  {errors[f] && <span className={styles.err}>{errors[f]}</span>}
                </div>
              ))}
              <div className={styles.btnRow}>
                <button className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                <button className={styles.nextBtn} onClick={() => validateShipping() && setStep(3)}>Continue to Payment</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>Payment Information</h2>
              <p className={styles.demoNote}>🔒 Demo mode — no real charges will be made</p>
              {[['cardNumber', 'Card Number', '1234 5678 9012 3456'], ['name', 'Name on Card', 'John Doe'], ['expiry', 'Expiry (MM/YY)', '12/28'], ['cvv', 'CVV', '123']].map(([f, label, placeholder]) => (
                <div key={f} className={styles.field}>
                  <label>{label}</label>
                  <input
                    placeholder={placeholder}
                    value={payment[f]}
                    onChange={(e) => setPayment((p) => ({ ...p, [f]: e.target.value }))}
                    type={f === 'cvv' ? 'password' : 'text'}
                    maxLength={f === 'cvv' ? 4 : undefined}
                  />
                  {errors[f] && <span className={styles.err}>{errors[f]}</span>}
                </div>
              ))}
              <div className={styles.btnRow}>
                <button className={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
                <button className={styles.nextBtn} onClick={() => validatePayment() && setStep(4)}>Review Order</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2>Confirm Your Order</h2>
              <div className={styles.confirmSection}>
                <h4>Shipping to:</h4>
                <p>{shipping.firstName} {shipping.lastName}</p>
                <p>{shipping.street}, {shipping.city}, {shipping.state} {shipping.zip}</p>
              </div>
              {errors.submit && <p className={styles.err}>{errors.submit}</p>}
              <div className={styles.btnRow}>
                <button className={styles.backBtn} onClick={() => setStep(3)}>← Back</button>
                <button className={styles.placeBtn} onClick={handlePlaceOrder} disabled={submitting}>
                  {submitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className={styles.summary}>
          <h3>Order Summary</h3>
          {items.map((item) => (
            <div key={item.productId} className={styles.summaryItem}>
              <span>{item.product?.name} × {item.quantity}</span>
              <span>${((item.product?.salePrice || item.product?.price) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className={styles.summaryRow}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className={styles.summaryRow}><span>Tax (13%)</span><span>${tax.toFixed(2)}</span></div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}><span>Total</span><span>${total.toFixed(2)}</span></div>
        </aside>
      </div>
    </div>
  )
}
