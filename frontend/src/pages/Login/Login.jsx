import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import styles from './Auth.module.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form)
      navigate(-1)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
            />
            {import.meta.env.VITE_EMAIL_CONNECTOR_READY === 'true' && (
              <Link to="/forgot-password" className={styles.forgotLink}>
                Forgot your password?
              </Link>
            )}
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className={styles.switchLink}>
          New to Tracy Shop? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  )
}
