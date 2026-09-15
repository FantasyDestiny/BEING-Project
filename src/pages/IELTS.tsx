import { Link } from 'react-router-dom'
import MascotFrame from '../components/MascotFrame'
import QuoteCard from '../components/QuoteCard'
import SectionHead from '../components/SectionHead'
import ModuleIcon from '../components/ModuleIcon'
import CommentBox from '../components/CommentBox'
import ModuleDoneToggle from '../components/ModuleDoneToggle'
import { useStore, modulesByCategory } from '../context/StoreContext'

const phases = [
  { num: '1', title: 'Diagnostic Test', desc: 'Cari tahu skor awal dan skill mana yang perlu diperkuat.' },
  { num: '2', title: 'Skill Building', desc: 'Latihan intensif per-modul sesuai kelemahan masing-masing.' },
  { num: '3', title: 'Simulasi Penuh', desc: 'Try-out 4 skill sekaligus dalam kondisi menyerupai ujian asli.' },
  { num: '4', title: 'Final Review', desc: 'Perbaikan terakhir sebelum hari-H, plus tips teknis ujian.' },
]

export default function IELTS() {
  const { modules } = useStore()
  const skills = modulesByCategory(modules, 'ielts')
  return (
    <>
      {/* ===== PAGE HERO ===== */}
      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <div>
            <div className="breadcrumb">
              <Link to="/">Beranda</Link> / Persiapan IELTS
            </div>
            <div className="eyebrow">
              <span className="dot" aria-hidden="true" /> Modul Persiapan IELTS
            </div>
            <h1>
              Kenal struktur ujiannya, <span className="accent">bukan cuma latihan soal.</span>
            </h1>
            <p className="lead">
              Empat skill, satu target skor. BEING bantu kamu latihan Listening, Reading, Writing, dan Speaking
              dengan simulasi yang mirip ujian asli — lengkap dengan skor prediksi tiap minggu.
            </p>
            <div className="hero-cta">
              <a href="#join" className="btn btn-primary">
                Mulai Try-Out Gratis
              </a>
              <a href="#rencana" className="btn btn-outline">
                Lihat Rencana Belajar
              </a>
            </div>
            <div className="stat-pill-row">
              <div className="stat-pill">
                <b>+1.2</b>
                <span>Rata-rata kenaikan band</span>
              </div>
              <div className="stat-pill">
                <b>40+</b>
                <span>Paket try-out</span>
              </div>
              <div className="stat-pill">
                <b>8 mgg</b>
                <span>Rencana belajar terarah</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <MascotFrame pops={[{ text: 'Band Target 7.0 🎯', style: { top: '8%', left: '-6%' } }, { text: 'Simulasi selesai ✓', style: { bottom: '10%', right: '-8%' } }]}>
              <svg viewBox="0 0 300 260" width="100%">
                <rect x="40" y="40" width="220" height="170" rx="24" fill="#EEF0D0" />
                <rect x="64" y="70" width="120" height="12" rx="6" fill="#B1B735" />
                <rect x="64" y="94" width="172" height="8" rx="4" fill="#D8DCAA" />
                <rect x="64" y="110" width="150" height="8" rx="4" fill="#D8DCAA" />
                <rect x="64" y="126" width="165" height="8" rx="4" fill="#D8DCAA" />
                <circle cx="205" cy="168" r="30" fill="#F9A24A" />
                <text x="205" y="174" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="18" fill="white">
                  7.0
                </text>
              </svg>
            </MascotFrame>
          </div>
        </div>
      </section>

      {/* ===== 4 MODUL SKILL ===== */}
      <section className="features">
        <div className="wrap">
          <SectionHead tag="Empat Modul Inti" title="Latihan per-skill, biar fokus lebih tajam">
            Setiap modul dilengkapi materi, latihan soal, dan pembahasan.
          </SectionHead>
          <div className="grid-4">
            {skills.map((s) => (
              <div className="module-card" key={s.id}>
                <div className="icon-badge" style={{ background: s.bg }}>
                  <ModuleIcon iconKey={s.iconKey} size={24} color={s.accent} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="mini-tag" style={{ color: s.accent }}>
                  {s.tag}
                </span>
                {s.materials.length > 0 && (
                  <ul className="material-dots">
                    {s.materials.map((m) => (
                      <li key={m.id}>
                        <a href={m.dataUrl || m.url} target="_blank" rel="noreferrer">
                          {m.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <ModuleDoneToggle moduleId={s.id} />
                <CommentBox targetType="module" targetId={s.id} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RENCANA BELAJAR 8 MINGGU ===== */}
      <section id="rencana">
        <div className="wrap">
          <SectionHead tag="Rencana Belajar 8 Minggu" title="Empat fase menuju band target">
            Urutan ini dirancang supaya progresmu terukur dari minggu ke minggu.
          </SectionHead>
          <div className="timeline">
            {phases.map((p) => (
              <div className="t-step" key={p.num}>
                <div className="t-num">{p.num}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONI ===== */}
      <section className="quote-strip">
        <div className="wrap">
          <SectionHead tag="Cerita Mereka" title="Naik band, bukan cuma naik semangat" />
          <div className="quote-track">
            <QuoteCard
              initials="D"
              name="Dimas P."
              role="Band 7.0, target tercapai"
              text="Try-out mingguannya mirip banget suasana ujian aslinya. Skor aku naik dari 6.0 ke 7.0."
              color="var(--gold-deep)"
            />
            <QuoteCard
              initials="N"
              name="Nadia K."
              role="Task 2, revisi 3x"
              text="Koreksi Writing-nya detail, bukan cuma dikasih nilai. Jadi ngerti letak salahnya di mana."
              color="var(--olive-deep)"
            />
            <QuoteCard
              initials="F"
              name="Farhan T."
              role="Band 6.5"
              text="Simulasi Speaking bareng tutor beneran bantu ngilangin gugup pas interview asli."
              color="var(--orange-deep2)"
            />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="join">
        <div className="wrap">
          <div className="cta-banner">
            <h2>Siap tahu skor awal kamu?</h2>
            <p>Diagnostic test gratis, hasil langsung keluar, tanpa perlu kartu kredit.</p>
            <a href="#join" className="btn btn-primary">
              Mulai Diagnostic Test
            </a>
          </div>
        </div>
      </section>
    </>
  )
}