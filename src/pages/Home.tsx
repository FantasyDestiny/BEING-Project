import { Link } from 'react-router-dom'
import AvatarStack from '../components/AvatarStack'
import MascotFrame from '../components/MascotFrame'
import QuoteCard from '../components/QuoteCard'
import SectionHead from '../components/SectionHead'
import VerbCycler from '../components/VerbCycler'
import {
  ArrowRightIcon,
  BookIcon,
  BookTextIcon,
  CheckIcon,
  ContrastHalfIcon,
  MicIcon,
  ReduceMotionIcon,
  TextIcon,
  UsersIcon,
} from '../components/icons'

const features = [
  {
    to: '/ielts',
    variant: 'card-ielts',
    icon: <BookIcon size={26} color="#7A7F1E" />,
    title: 'Persiapan IELTS',
    desc: 'Latihan Listening, Reading, Writing, dan Speaking lengkap dengan simulasi ujian dan target skor kamu.',
    tags: ['Try-out mingguan', 'Skor prediksi'],
    cta: 'Mulai persiapan',
  },
  {
    to: '/personal-improvement',
    variant: 'card-personal',
    icon: <MicIcon size={26} color="#B08800" />,
    title: 'Personal Improvement',
    desc: 'Bangun rasa percaya diri lewat latihan public speaking, pengucapan (pronunciation), dan intonasi natural.',
    tags: ['Speaking lab', 'Voice feedback'],
    cta: 'Latihan sekarang',
  },
  {
    to: '/english-club',
    variant: 'card-club',
    icon: <UsersIcon size={26} color="#C2650C" />,
    title: 'English Club',
    desc: 'Ngobrol langsung bareng sesama member lewat sesi Zoom rutin yang dijadwalkan admin tiap minggu.',
    tags: ['Zoom mingguan', 'Small group'],
    cta: 'Lihat jadwal',
  },
]

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Belajar santai, hasil serius
            </div>
            <h1>
              Karena semua orang berhak <span className="accent">lancar</span> berbahasa Inggris.
            </h1>
            <VerbCycler />
            <p className="lead">
              BEING nemenin kamu dari persiapan IELTS, latihan public speaking, sampai ngobrol bareng teman baru
              tiap minggu — dengan cara yang nggak bikin stres.
            </p>
            <div className="hero-cta">
              <a href="#join" className="btn btn-primary">
                Mulai Belajar Gratis
              </a>
              <Link to="/english-club" className="btn btn-outline">
                Lihat Jadwal English Club
              </Link>
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
                { text: 'Good job! 🎉' },
                { text: 'Band 7.5 ✨' },
                { text: 'Halo, teman baru!' },
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
                <circle cx="95" cy="178" r="12" fill="#FBC7A0" opacity="0.8" />
                <circle cx="205" cy="178" r="12" fill="#FBC7A0" opacity="0.8" />
                <path d="M125 190 Q150 212 175 190" stroke="#1C2B3A" strokeWidth="6" fill="none" strokeLinecap="round" />
                <path d="M60 150 Q30 130 22 90" stroke="#F9A24A" strokeWidth="14" fill="none" strokeLinecap="round" />
                <circle cx="20" cy="86" r="12" fill="#F9A24A" />
                <path d="M240 150 Q265 175 250 210" stroke="#F9A24A" strokeWidth="14" fill="none" strokeLinecap="round" />
              </svg>
            </MascotFrame>
          </div>
        </div>
      </section>

      {/* ===== FITUR UTAMA ===== */}
      <section className="features" id="features">
        <div className="wrap">
          <SectionHead tag="Fitur Utama" title="Tiga jalan, satu tujuan: BEING lebih jago">
            Pilih jalur belajarmu sendiri, atau gabungin ketiganya sekalian.
          </SectionHead>
          <div className="feature-grid">
            {features.map((f) => (
              <div className={`card ${f.variant}`} key={f.to}>
                <div className="icon-badge">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="tags">
                  {f.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <Link to={f.to} className="go">
                  {f.cta}
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENGLISH CLUB SPOTLIGHT ===== */}
      <section className="club-spotlight" id="club-spotlight">
        <div className="wrap">
          <div className="club-panel">
            <div>
              <h2>Kelas terasa kecil kalau ngobrolnya rame.</h2>
              <p>
                Tiap minggu, admin BEING upload link Zoom baru buat sesi English Club. Tinggal klik, gabung, dan
                mulai ngobrol santai sama teman-teman dari seluruh Indonesia.
              </p>
              <ul className="club-list">
                <li>
                  <CheckIcon size={18} /> Link Zoom baru tiap minggu dari admin
                </li>
                <li>
                  <CheckIcon size={18} /> Topik obrolan santai &amp; terarah
                </li>
                <li>
                  <CheckIcon size={18} /> Cocok buat semua level
                </li>
              </ul>
              <Link
                to="/english-club#jadwal"
                className="btn"
                style={{ background: 'var(--white)', color: 'var(--secondary-deep)', marginTop: 26 }}
              >
                Gabung Sesi Berikutnya
              </Link>
            </div>

            <div className="club-card">
              <div className="badge-live">
                <span className="ping" aria-hidden="true" /> Sesi berikutnya
              </div>
              <div className="session">
                <div className="date-chip">
                  <div className="day">05</div>
                  <div className="mon">Sep</div>
                </div>
                <div className="session-info">
                  <b>Casual Talk: Weekend Stories</b>
                  <span>Sabtu · 19.00 WIB · via Zoom</span>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', marginBottom: 18 }}>
                Link Zoom akan muncul di sini otomatis begitu diupload admin, lengkap dengan reminder H-1.
              </p>
              <a href="#" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                Set Pengingat Saya
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AKSESIBILITAS ===== */}
      <section className="a11y-strip" id="a11y-strip">
        <div className="wrap a11y-grid">
          <div>
            <div className="section-tag">Ramah Untuk Semua</div>
            <h2>Belajar bahasa Inggris, tanpa hambatan.</h2>
            <p style={{ color: 'var(--ink-soft)', marginTop: 12 }}>
              BEING dirancang supaya siapa pun bisa belajar dengan nyaman. Klik ikon aksesibilitas di pojok kanan
              bawah kapan saja untuk atur tampilan sesuai kebutuhanmu.
            </p>
            <ul className="a11y-list">
              <li>
                <span className="check">
                  <CheckIcon size={14} color="white" strokeWidth={3} />
                </span>
                <div>
                  <b>Ukuran teks fleksibel</b>
                  <span>Perbesar atau perkecil teks sesuai kenyamanan mata.</span>
                </div>
              </li>
              <li>
                <span className="check">
                  <CheckIcon size={14} color="white" strokeWidth={3} />
                </span>
                <div>
                  <b>Mode kontras tinggi</b>
                  <span>Tampilan lebih tegas untuk pengguna low-vision.</span>
                </div>
              </li>
              <li>
                <span className="check">
                  <CheckIcon size={14} color="white" strokeWidth={3} />
                </span>
                <div>
                  <b>Font ramah disleksia</b>
                  <span>Ganti gaya huruf agar lebih mudah dibaca.</span>
                </div>
              </li>
              <li>
                <span className="check">
                  <CheckIcon size={14} color="white" strokeWidth={3} />
                </span>
                <div>
                  <b>Kurangi animasi</b>
                  <span>Matikan gerakan dekoratif untuk kenyamanan sensorik.</span>
                </div>
              </li>
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
                <BookTextIcon size={22} color="#B08800" />
              </div>
              <p>Font Disleksia</p>
            </div>
            <div className="mini-tile">
              <div className="icon-badge">
                <ReduceMotionIcon size={22} color="#C2650C" />
              </div>
              <p>Kurangi Animasi</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONI ===== */}
      <section className="quote-strip">
        <div className="wrap">
          <SectionHead tag="Cerita Mereka" title="Katanya, BEING itu beda." />
          <div className="quote-track">
            <QuoteCard
              initials="R"
              name="Rani A."
              role="Personal Improvement"
              text="Latihan speaking-nya kerasa banget bantu pelafalan aku. Sekarang lebih pede ngomong depan orang."
              color="var(--olive-deep)"
            />
            <QuoteCard
              initials="D"
              name="Dimas P."
              role="Persiapan IELTS"
              text="Try-out mingguannya mirip banget suasana ujian aslinya. Skor aku naik dari 6.0 ke 7.0."
              color="var(--gold-deep)"
            />
            <QuoteCard
              initials="S"
              name="Sinta W."
              role="English Club"
              text="English Club jadi highlight minggu aku. Ketemu teman baru dan sekalian latihan ngobrol."
              color="var(--orange-deep2)"
            />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="join">
        <div className="wrap">
          <div className="cta-banner">
            <h2>Yuk, mulai BEING versi terbaikmu.</h2>
            <p>Gratis untuk mulai. Nggak perlu kartu kredit, cukup niat belajar.</p>
            <a href="#join" className="btn btn-primary">
              Daftar Sekarang
            </a>
          </div>
        </div>
      </section>
    </>
  )
}