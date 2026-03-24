import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import styles from './Auth.module.css'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      await register(form)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>First Name</label>
            <input value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} required />
          </div>
          <div className={styles.field}>
            <label>Last Name</label>
            <input value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} required />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required />
          </div>
          <div className={styles.field}>
            <label>Confirm Password</label>
            <input type="password" value={form.confirmPassword} onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))} required />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p className={styles.switchLink}>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
