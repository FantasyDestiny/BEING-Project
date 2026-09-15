import { NavLink, Link } from 'react-router-dom'
import { useA11y } from '../context/A11yContext'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { A11yIcon } from './icons'

const navItems = [
  { to: '/', label: 'Beranda' },
  { to: '/ielts', label: 'Persiapan IELTS' },
  { to: '/personal-improvement', label: 'Personal Improvement' },
  { to: '/english-club', label: 'English Club' },
]

export default function Topbar() {
  const { openPanel, closePanel, panelOpen } = useA11y()
  const { user, signOut } = useAuth()
  const { quizLevel } = useProgress()

  const initial = (user?.email ?? '?').trim().charAt(0).toUpperCase()
  const showStart = !user || !quizLevel

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <NavLink to="/" className="logo" aria-label="BEING — beranda">
          <span className="mark" aria-hidden="true">
            B
          </span>
          BEING
        </NavLink>

        <nav className="nav-links" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-right">
          {user ? (
            <div className="user-chip" title={user.email ?? undefined}>
              <span className="avatar-circle" aria-hidden="true">
                {initial}
              </span>
              <button className="btn btn-ghost btn-sm" onClick={() => void signOut()}>
                Keluar
              </button>
            </div>
          ) : (
            <Link to="/masuk" className="btn btn-outline btn-sm">
              Masuk
            </Link>
          )}
          <button
            className="a11y-toggle"
            aria-label={panelOpen ? 'Tutup menu aksesibilitas' : 'Buka menu aksesibilitas'}
            title="Menu Aksesibilitas"
            onClick={panelOpen ? closePanel : openPanel}
          >
            <A11yIcon size={22} color="var(--secondary-deep)" />
          </button>
          {showStart && (
            <Link to="/onboarding" className="btn btn-primary">
              Mulai Sekarang
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}