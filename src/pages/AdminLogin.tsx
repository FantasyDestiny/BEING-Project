import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { useAdmin } from '../context/AdminContext'
import { useAuth } from '../context/AuthContext'
import { ShieldCheckIcon } from '../components/icons'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { isAdmin, adminEmailsLoaded } = useAdmin()

  useEffect(() => {
    if (isAdmin) navigate('/admin', { replace: true })
  }, [isAdmin, navigate])

  return (
    <section className="page-hero">
      <div className="wrap admin-login-wrap">
        <div className="breadcrumb">
          <Link to="/">Beranda</Link> / Masuk Admin
        </div>

        <div className="admin-login-card">
          <div className="admin-login-icon">
            <ShieldCheckIcon size={30} color="var(--secondary-deep)" />
          </div>
          <div className="eyebrow">
            <span className="dot" aria-hidden="true" /> Area Admin
          </div>
          <h1>Masuk ke Dashboard Admin</h1>
          <p className="lead" style={{ marginTop: 8 }}>
            Halaman khusus tim BEING. Hanya email yang terdaftar sebagai admin yang bisa masuk.
          </p>

          {user && adminEmailsLoaded && !isAdmin && (
            <p className="admin-error" style={{ marginBottom: 14 }}>
              Email {user.email} tidak terdaftar sebagai admin.
            </p>
          )}

          <AuthForm adminMode />
        </div>
      </div>
    </section>
  )
}