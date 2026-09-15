import { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { useAuth } from '../context/AuthContext'
import { ShieldCheckIcon } from '../components/icons'

export default function AuthPage() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [params] = useSearchParams()
  const next = params.get('next') || '/app'

  useEffect(() => {
    if (user) navigate(next, { replace: true })
  }, [user, next, navigate])

  if (loading) {
    return (
      <div className="wrap" style={{ padding: '80px 0', textAlign: 'center', color: 'var(--ink-soft)' }}>
        Memuat…
      </div>
    )
  }

  return (
    <section className="page-hero">
      <div className="wrap admin-login-wrap">
        <div className="breadcrumb">
          <Link to="/">Beranda</Link> / Masuk
        </div>

        <div className="admin-login-card">
          <div className="admin-login-icon">
            <ShieldCheckIcon size={30} color="var(--secondary-deep)" />
          </div>
          <div className="eyebrow">
            <span className="dot" aria-hidden="true" /> Akun BEING
          </div>
          <h1>Masuk atau buat akun</h1>
          <p className="lead" style={{ marginTop: 8 }}>
            Gunakan Google, email, atau nomor telepon. Dengan masuk, progres dan komentarmu tersimpan otomatis.
          </p>

          <AuthForm />
        </div>
      </div>
    </section>
  )
}