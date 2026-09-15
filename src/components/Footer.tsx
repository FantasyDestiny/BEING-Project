import { Link } from 'react-router-dom'

const belajarLinks = [
  { to: '/ielts', label: 'Persiapan IELTS' },
  { to: '/personal-improvement', label: 'Personal Improvement' },
  { to: '/english-club', label: 'English Club' },
]

const bantuanLinks = [
  { to: '/#a11y-strip', label: 'Aksesibilitas' },
  { to: '/', label: 'Pusat Bantuan' },
  { to: '/', label: 'Hubungi Admin' },
]

const perusahaanLinks = [
  { to: '/', label: 'Tentang BEING' },
  { to: '/', label: 'Karier' },
  { to: '/', label: 'Kebijakan Privasi' },
]

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link to="/" className="logo" style={{ marginBottom: 14 }} aria-label="BEING — beranda">
              <span className="mark" aria-hidden="true">
                B
              </span>
              BEING
            </Link>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', maxWidth: 280 }}>
              Platform belajar bahasa Inggris yang santai, personal, dan ramah untuk semua orang.
            </p>
          </div>
          <FooterColumn title="Belajar" links={belajarLinks} />
          <FooterColumn title="Bantuan" links={bantuanLinks} />
          <FooterColumn title="Perusahaan" links={perusahaanLinks} />
        </div>
        <div className="footer-bottom">
          <span>© 2026 BEING. Semua hak dilindungi.</span>
          <span>
            <Link to="/admin" className="footer-admin">
              Admin
            </Link>
            · Dibuat dengan 💛 untuk semua pembelajar
          </span>
        </div>
      </div>
    </footer>
  )
}