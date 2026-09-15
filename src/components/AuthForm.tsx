import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function AuthForm({ adminMode = false }: { adminMode?: boolean }) {
  const { signInEmail, signUp, signInGoogle, sendPhoneOtp, verifyPhoneOtp } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || (adminMode ? '/admin' : '/app')

  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn')
  const [phoneActive, setPhoneActive] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [token, setToken] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  const onEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setInfo('')
    setBusy(true)
    const res: { ok: boolean; error?: string; confirmEmail?: boolean } =
      mode === 'signIn' ? await signInEmail(email, password) : await signUp(email, password)
    setBusy(false)
    if (!res.ok) {
      setError(res.error ?? 'Terjadi kesalahan.')
      return
    }
    if (res.confirmEmail) {
      setInfo('Akun terdaftar. Cek email kamu untuk konfirmasi sebelum masuk.')
      return
    }
    toast('success', 'Berhasil masuk, selamat belajar!')
    navigate(next, { replace: true })
  }

  const onGoogle = async () => {
    setBusy(true)
    const res = await signInGoogle()
    setBusy(false)
    if (!res.ok) {
      setError(res.error ?? 'Gagal membuka Google.')
      return
    }
    setInfo('Mengarahkan ke Google…')
  }

  const onSendCode = async () => {
    if (!phone.trim()) {
      setError('Nomor telepon tidak boleh kosong.')
      return
    }
    setBusy(true)
    const res = await sendPhoneOtp(phone.trim())
    setBusy(false)
    if (!res.ok) {
      setError(res.error ?? 'Gagal mengirim kode. Pastikan login via telepon sudah diaktifkan.')
      return
    }
    setCodeSent(true)
    setInfo('Kode OTP terkirim via SMS. Masukkan kode untuk masuk.')
  }

  const onVerify = async () => {
    if (!token.trim()) {
      setError('Masukkan kode OTP.')
      return
    }
    setBusy(true)
    const res = await verifyPhoneOtp(phone.trim(), token.trim())
    setBusy(false)
    if (!res.ok) {
      setError(res.error ?? 'Kode salah atau kedaluwarsa.')
      return
    }
    toast('success', 'Berhasil masuk, selamat belajar!')
    navigate(next, { replace: true })
  }

  const switchMode = (m: 'signIn' | 'signUp') => {
    setMode(m)
    setPhoneActive(false)
    setError('')
    setInfo('')
  }

  return (
    <div>
      {!phoneActive ? (
        <>
          <div className="auth-tabs" role="tablist">
            <button className={`auth-tab${mode === 'signIn' ? ' active' : ''}`} onClick={() => switchMode('signIn')}>
              Masuk
            </button>
            <button className={`auth-tab${mode === 'signUp' ? ' active' : ''}`} onClick={() => switchMode('signUp')}>
              Daftar
            </button>
          </div>

          <form onSubmit={onEmailSubmit} className="admin-form">
            <label>
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                autoComplete="email"
                required
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'}
                minLength={6}
                required
              />
            </label>
            {error && <p className="admin-error">{error}</p>}
            {info && <p className="auth-info">{info}</p>}
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? 'Memproses…' : mode === 'signIn' ? 'Masuk' : 'Buat Akun'}
            </button>
          </form>

          <div className="divider-or">
            <span>atau</span>
          </div>

          <button className="btn btn-outline" onClick={onGoogle} disabled={busy}>
            <GoogleIcon /> Masuk dengan Google
          </button>

          <button className="text-btn" style={{ marginTop: 14 }} onClick={() => setPhoneActive(true)}>
            Masuk dengan nomor telepon
          </button>
        </>
      ) : (
        <>
          <div className="eyebrow">
            <span className="dot" aria-hidden="true" /> Masuk dengan Telepon
          </div>
          {!codeSent ? (
            <div className="admin-form">
              <label>
                <span>Nomor Telepon</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="cth: +6281234567890"
                  autoComplete="tel"
                />
              </label>
              {error && <p className="admin-error">{error}</p>}
              {info && <p className="auth-info">{info}</p>}
              <button type="button" className="btn btn-primary" onClick={onSendCode} disabled={busy}>
                {busy ? 'Mengirim…' : 'Kirim Kode OTP'}
              </button>
            </div>
          ) : (
            <div className="admin-form">
              <label>
                <span>Kode OTP</span>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="6 digit"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              </label>
              {error && <p className="admin-error">{error}</p>}
              {info && <p className="auth-info">{info}</p>}
              <button type="button" className="btn btn-primary" onClick={onVerify} disabled={busy}>
                {busy ? 'Memeriksa…' : 'Verifikasi & Masuk'}
              </button>
            </div>
          )}
          <button className="text-btn" style={{ marginTop: 14 }} onClick={() => { setPhoneActive(false); setCodeSent(false); setError(''); setInfo(''); }}>
            Kembali ke email / Google
          </button>
        </>
      )}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}