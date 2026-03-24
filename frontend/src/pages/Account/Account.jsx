import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { updateProfile } from '../../api/endpoints'
import styles from './Account.module.css'

export default function Account() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '' })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) navigate('/login')
    if (user?.profile) {
      setForm({
        firstName: user.profile.firstName || '',
        lastName: user.profile.lastName || '',
        phone: user.profile.phone || '',
      })
    }
  }, [user, loading, navigate])

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await updateProfile({ profile: form })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      setError('Failed to save profile')
    }
  }

  if (loading) return <div className={styles.loading}>Loading...</div>

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <h3>My Account</h3>
        <nav className={styles.nav}>
          <Link to="/account" className={styles.activeLink}>Profile</Link>
          <Link to="/account/orders">Order History</Link>
        </nav>
      </aside>

      <main className={styles.main}>
        <h2>Account Information</h2>
        <p className={styles.email}>{user?.email}</p>
        <form onSubmit={handleSave} className={styles.form}>
          {[['firstName', 'First Name'], ['lastName', 'Last Name'], ['phone', 'Phone']].map(([f, label]) => (
            <div key={f} className={styles.field}>
              <label>{label}</label>
              <input value={form[f]} onChange={(e) => setForm((p) => ({ ...p, [f]: e.target.value }))} />
            </div>
          ))}
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.saveBtn}>{saved ? '✓ Saved!' : 'Save Changes'}</button>
        </form>
      </main>
    </div>
  )
}
