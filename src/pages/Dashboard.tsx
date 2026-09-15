import { Link, useParams } from 'react-router-dom'
import MascotFrame from '../components/MascotFrame'
import SectionHead from '../components/SectionHead'
import { useOnboarding } from '../context/OnboardingContext'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { useStore } from '../context/StoreContext'
import { getImpairment } from '../data/impairments'
import { BookIcon, MicIcon, UsersIcon, ArrowRightIcon, CheckIcon } from '../components/icons'

const moduleCards = [
  {
    to: '/ielts',
    icon: <BookIcon size={26} color="#7A7F1E" />,
    title: 'Persiapan IELTS',
    desc: 'Latihan 4 skill lengkap dengan simulasi dan skor prediksi.',
  },
  {
    to: '/personal-improvement',
    icon: <MicIcon size={26} color="#B08800" />,
    title: 'Personal Improvement',
    desc: 'Public speaking, pengucapan, dan confidence building.',
  },
  {
    to: '/english-club',
    icon: <UsersIcon size={26} color="#C2650C" />,
    title: 'English Club',
    desc: 'Ngobrol langsung bareng member lain via Zoom mingguan.',
  },
]

export default function Dashboard() {
  const { id } = useParams<{ id: string }>()
  const { impairment } = useOnboarding()
  const { user } = useAuth()
  const { quizLevel, completedModules } = useProgress()
  const active = id ? getImpairment(id) : null

  // Prioritas: route param, lalu dari context onboarding
  const imp = active ?? impairment

  const { modules } = useStore()
  const completedList = completedModules
    .map((cid) => {
      const mod = modules.find((m) => m.id === cid)
      if (!mod) return null
      const route = mod.category === 'personal' ? '/personal-improvement' : '/ielts'
      return { id: cid, title: mod.title, route }
    })
    .filter((c): c is { id: string; title: string; route: string } => c !== null)

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <div>
            <div className="breadcrumb">
              <Link to="/">Beranda</Link> / {imp ? 'Halaman Khusus' : 'Halaman Belajar'}
            </div>
            {imp ? (
              <div className="eyebrow">
                <span className="dot" aria-hidden="true" /> {imp.icon} Disesuaikan untuk {imp.name}
              </div>
            ) : (
              <div className="eyebrow">
                <span className="dot" aria-hidden="true" /> Selamat Datang di Halaman Belajarmu
              </div>
            )}

            <h1>
              {imp ? (
                <>
                  Dibuat nyaman untuk <span className="accent">kebutuhanmu.</span>
                </>
              ) : (
                <>
                  Pilih jalur belajarmu, <span className="accent">BEING siap nemenin.</span>
                </>
              )}
            </h1>

            <p className="lead">
              {imp
                ? `Aksesibilitas sudah aktif (${imp.autoToggles
                    .map((t) => t.replace(/([A-Z])/g, ' $1').toLowerCase())
                    .join(', ')}). Materi disesuaikan agar kamu nyaman belajar.`
                : `Berdasarkan test kemampuanmu, kami sudah siapkan materi sesuai level. Pilih modul dan mulai langkah pertamamu.`}
            </p>

            {imp && (
              <ul className="dashboard-tips">
                {imp.autoToggles.map((t) => (
                  <li key={t}>
                    <CheckIcon size={16} color="var(--olive)" /> {labelToggle(t)} aktif
                  </li>
                ))}
              </ul>
            )}

            <div className="stat-pill-row">
              <div className="stat-pill">
                <b>{imp ? 3 : 3}</b>
                <span>Modul tersedia</span>
              </div>
              <div className="stat-pill">
                <b>{imp ? 'Adaptif' : 'Terukur'}</b>
                <span>Tampilan &amp; materi</span>
              </div>
              <div className="stat-pill">
                <b>Gratis</b>
                <span>Mulai belajar</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <MascotFrame
              pops={[
                { text: imp ? 'Siap belajar? 💪' : 'Halo! Semangat ya ✨' },
                { text: 'Kamu pasti bisa!', style: { bottom: '8%', right: '-8%' } },
              ]}
            >
              <svg viewBox="0 0 300 260" width="100%">
                <rect x="60" y="40" width="180" height="160" rx="24" fill="#EEF0D0" />
                <rect x="84" y="70" width="90" height="12" rx="6" fill="#B1B735" />
                <rect x="84" y="94" width="132" height="8" rx="4" fill="#D8DCAA" />
                <rect x="84" y="110" width="110" height="8" rx="4" fill="#D8DCAA" />
                <rect x="84" y="126" width="124" height="8" rx="4" fill="#D8DCAA" />
                <circle cx="205" cy="160" r="30" fill="#F9A24A" />
                <text x="205" y="166" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="16" fill="white">
                  {imp ? '💛' : 'OK'}
                </text>
              </svg>
            </MascotFrame>
          </div>
        </div>
      </section>

      {/* ===== PROGRES (LOGIN) ===== */}
      {user && (
        <section className="features progress-section">
          <div className="wrap">
            <SectionHead tag="Capaian Belajarmu" title="Progres yang sudah kamu kumpulkan">
              {quizLevel && completedList.length > 0
                ? 'Lanjutkan dari poin terakhirmu. Konsisten = cepat jago.'
                : 'Isi test kemampuan dan tandai modul selesai untuk mulai menghitung progresmu.'}
            </SectionHead>
            <div className="progress-panel">
              <div className="progress-stat">
                <span>Level kemampuan</span>
                <b>{quizLevel ?? 'Belum tes'}</b>
              </div>
              <div className="progress-stat">
                <span>Modul selesai</span>
                <b>
                  {completedList.length} / {modules.length}
                </b>
              </div>
              <div className="progress-stat">
                <span>Status</span>
                <b>{completedList.length === modules.length ? 'All done ✨' : 'On the way 💪'}</b>
              </div>
            </div>
            {completedList.length > 0 && (
              <ul className="progress-modules">
                {completedList.map((c) => (
                  <li key={c.id}>
                    <CheckIcon size={16} color="var(--olive)" />
                    <Link to={c.route}>{c.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* ===== MODUL ===== */}
      <section className="features">
        <div className="wrap">
          <SectionHead tag="Modul Belajar" title="Langsung mulai dari sini">
            Semua modul terbuka. Pilih sesuai tujuanmu hari ini.
          </SectionHead>
          <div className="feature-grid">
            {moduleCards.map((m) => (
              <div className="card" key={m.to}>
                <div className="icon-badge">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <Link to={m.to} className="go">
                  Buka Modul
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function labelToggle(key: string) {
  const map: Record<string, string> = {
    highContrast: 'Kontras tinggi',
    dyslexia: 'Font disleksia',
    reduceMotion: 'Kurangi animasi',
    bigCursor: 'Kursor besar',
    underline: 'Garis bawah tautan',
  }
  return map[key] ?? key
}
