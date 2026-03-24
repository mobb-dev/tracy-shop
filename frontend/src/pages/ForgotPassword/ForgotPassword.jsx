import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Auth.module.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: wire up to POST /api/auth/forgot-password
    await new Promise((resolve) => setTimeout(resolve, 600)) // simulated delay
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Check your email</h1>
          <p className={styles.infoText}>
            If an account exists for <strong>{email}</strong>, you will receive a
            password reset link shortly.
          </p>
          <p className={styles.switchLink}>
            <Link to="/login">Back to Sign In</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Forgot Password</h1>
        <p className={styles.infoText}>
          Enter the email address associated with your account and we&apos;ll send
          you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <p className={styles.switchLink}>
          Remember your password? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
