import { Link } from 'react-router-dom'
import MascotFrame from '../components/MascotFrame'
import SectionHead from '../components/SectionHead'
import VerbCycler from '../components/VerbCycler'
import AvatarStack from '../components/AvatarStack'
import {
  BookIcon,
  CheckIcon,
  ContrastHalfIcon,
  MicIcon,
  TextIcon,
  UsersIcon,
  ArrowRightIcon,
} from '../components/icons'
import { IMPAIRMENTS } from '../data/impairments'

const features = [
  {
    icon: <BookIcon size={26} color="#7A7F1E" />,
    title: 'Persiapan IELTS',
    desc: 'Latihan Listening, Reading, Writing, dan Speaking lengkap dengan simulasi dan skor prediksi.',
  },
  {
    icon: <MicIcon size={26} color="#B08800" />,
    title: 'Personal Improvement',
    desc: 'Bangun percaya diri lewat public speaking, pengucapan, dan intonasi natural.',
  },
  {
    icon: <UsersIcon size={26} color="#C2650C" />,
    title: 'English Club',
    desc: 'Ngobrol langsung bareng member lain lewat sesi Zoom mingguan.',
  },
]

const steps = [
  { num: '1', title: 'Kenalan Dulu', desc: 'Cerita ke kami, apa kamu butuh dukungan aksesibilitas khusus atau tidak.' },
  { num: '2', title: 'Ukur Level', desc: 'Ikuti test singkat biar materi kami pas dengan kemampuan awalmu.' },
  { num: '3', title: 'Mulai Belajar', desc: 'Masuk ke halaman belajar yang sudah disesuaikan dengan kebutuhanmu.' },
]

export default function Landing() {
  return (
    <>
      {/* ===== HERO / UCAPAN SELAMAT DATANG ===== */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Selamat datang di BEING 👋
            </div>
            <h1>
              Semua orang berhak <span className="accent">lancar</span> berbahasa Inggris.
            </h1>
            <VerbCycler />
            <p className="lead">
              BEING adalah platform belajar bahasa Inggris yang santai sekaligus ramah untuk semua orang — termasuk
              penyandang disabilitas. Aplikasi ini menyesuaikan tampilan dan materi dengan kebutuhanmu.
            </p>
            <div className="hero-cta">
              <Link to="/onboarding" className="btn btn-primary">
                Mulai Sekarang
                <ArrowRightIcon size={18} />
              </Link>
              <a href="#fitur" className="btn btn-outline">
                Lihat Fitur
              </a>
            </div>
            <div className="hero-proof">
              <AvatarStack letters={['A', 'D', 'R', '+']} />
              <p>
                <b>2.400+ pelajar</b> lagi BEING lebih percaya diri
              </p>
            </div>
          </div>

          <div className="hero-visual">
            <MascotFrame
              pops={[
                { text: 'Halo, teman baru! 🎉' },
                { text: 'Belajar jadi mudah ✨' },
                { text: 'Kamu bisa, pasti bisa!' },
              ]}
            >
              <svg viewBox="0 0 300 300" width="100%">
                <ellipse cx="150" cy="270" rx="90" ry="14" fill="rgba(28,43,58,0.08)" />
                <path
                  d="M150 40 C220 40 250 100 250 160 C250 225 205 260 150 260 C95 260 50 225 50 160 C50 100 80 40 150 40Z"
                  fill="#F9A24A"
                />
                <path
                  d="M150 40 C220 40 250 100 250 160 C250 200 230 230 195 248 C215 210 210 150 190 110 C170 72 160 50 150 40Z"
                  fill="#F4C816"
                  opacity="0.55"
                />
                <circle cx="118" cy="150" r="12" fill="#1C2B3A" />
                <circle cx="182" cy="150" r="12" fill="#1C2B3A" />
                <circle cx="122" cy="146" r="3.5" fill="#fff" />
                <circle cx="186" cy="146" r="3.5" fill="#fff" />
                <path d="M125 190 Q150 212 175 190" stroke="#1C2B3A" strokeWidth="6" fill="none" strokeLinecap="round" />
                <path d="M60 150 Q30 130 22 90" stroke="#F9A24A" strokeWidth="14" fill="none" strokeLinecap="round" />
                <circle cx="20" cy="86" r="12" fill="#F9A24A" />
                <path d="M240 150 Q265 175 250 210" stroke="#F9A24A" strokeWidth="14" fill="none" strokeLinecap="round" />
              </svg>
            </MascotFrame>
          </div>
        </div>
      </section>

      {/* ===== FITUR ===== */}
      <section className="features" id="fitur">
        <div className="wrap">
          <SectionHead tag="Fitur Web" title="Tiga jalur belajar, satu tujuan">
            Semua bisa kamu akses setelah mulai. Dipilih sesuai kebutuhanmu.
          </SectionHead>
          <div className="feature-grid">
            {features.map((f) => (
              <div className="card" key={f.title}>
                <div className="icon-badge">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AKSESIBILITAS ===== */}
      <section className="a11y-strip" id="aksesibilitas">
        <div className="wrap a11y-grid">
          <div>
            <div className="section-tag">Ramah Untuk Semua</div>
            <h2>Kenali kebutuhanmu, kami sesuaikan.</h2>
            <p style={{ color: 'var(--ink-soft)', marginTop: 12 }}>
              Saat mulai, kami akan bertanya apakah kamu butuh dukungan aksesibilitas. Kalau iya, kamu pilih jenis
              kebutuhanmu dan aplikasi ini otomatis menyesuaikan tampilan serta materinya.
            </p>
            <ul className="a11y-list">
              {IMPAIRMENTS.slice(0, 4).map((imp) => (
                <li key={imp.id}>
                  <span className="check">
                    <CheckIcon size={14} color="white" strokeWidth={3} />
                  </span>
                  <div>
                    <b>
                      {imp.icon} {imp.name}
                    </b>
                    <span>{imp.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="a11y-visual">
            <div className="mini-tile">
              <div className="icon-badge">
                <TextIcon size={22} color="var(--secondary-deep)" />
              </div>
              <p>Ukuran Teks</p>
            </div>
            <div className="mini-tile">
              <div className="icon-badge">
                <ContrastHalfIcon size={22} color="#7A7F1E" />
              </div>
              <p>Kontras Tinggi</p>
            </div>
            <div className="mini-tile">
              <div className="icon-badge">
                <TextIcon size={22} color="#B08800" />
              </div>
              <p>Font Disleksia</p>
            </div>
            <div className="mini-tile">
              <div className="icon-badge">
                <MicIcon size={22} color="#C2650C" />
              </div>
              <p>Audio &amp; Visual</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CARA KERJA ===== */}
      <section className="features">
        <div className="wrap">
          <SectionHead tag="Cara Kerja" title="Mulai cuma butuh tiga langkah" />
          <div className="timeline">
            {steps.map((s) => (
              <div className="t-step" key={s.num}>
                <div className="t-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="join">
        <div className="wrap">
          <div className="cta-banner">
            <h2>Yuk, mulai BEING versi terbaikmu.</h2>
            <p>Gratis untuk mulai. Cukup niat belajar, sisanya kami sesuaikan.</p>
            <Link to="/onboarding" className="btn btn-primary">
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
