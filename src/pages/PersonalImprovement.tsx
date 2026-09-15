import { Link } from 'react-router-dom'
import MascotFrame from '../components/MascotFrame'
import QuoteCard from '../components/QuoteCard'
import SectionHead from '../components/SectionHead'
import ModuleIcon from '../components/ModuleIcon'
import CommentBox from '../components/CommentBox'
import ModuleDoneToggle from '../components/ModuleDoneToggle'
import { useStore, modulesByCategory } from '../context/StoreContext'
import { BellIcon, MicIcon, PlayIcon, RefreshIcon } from '../components/icons'

const steps = [
  {
    icon: <MicIcon size={26} color="#C2650C" />,
    bg: '#FCE4D2',
    title: '1. Rekam',
    desc: 'Ucapkan kata atau kalimat latihan lewat mikrofon perangkatmu.',
  },
  {
    icon: <BellIcon size={26} color="#3B87B5" />,
    bg: '#E4F2FB',
    title: '2. Dengar Feedback',
    desc: 'Lihat skor kemiripan dan bagian mana yang perlu diperbaiki.',
  },
  {
    icon: <RefreshIcon size={26} color="#7A7F1E" />,
    bg: '#EEF0D0',
    title: '3. Ulangi & Improve',
    desc: 'Latihan ulang sampai skormu naik dan terasa lebih natural.',
  },
]

const waveformBars = [
  { height: 14, delay: '0s' },
  { height: 28, delay: '0.1s' },
  { height: 18, delay: '0.2s' },
  { height: 34, delay: '0.3s' },
  { height: 20, delay: '0.4s' },
  { height: 30, delay: '0.5s' },
  { height: 16, delay: '0.6s' },
  { height: 24, delay: '0.7s' },
]

export default function PersonalImprovement() {
  const { modules } = useStore()
  const moduleList = modulesByCategory(modules, 'personal')
  return (
    <>
      {/* ===== PAGE HERO ===== */}
      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <div>
            <div className="breadcrumb">
              <Link to="/">Beranda</Link> / Personal Improvement
            </div>
            <div className="eyebrow">
              <span className="dot" aria-hidden="true" /> Speaking &amp; Confidence
            </div>
            <h1>
              Suaramu didengar, <span className="accent">kepercayaan dirimu tumbuh.</span>
            </h1>
            <p className="lead">
              Latihan public speaking dan pengucapan yang fokus ke progres kamu sendiri — rekam, dengar feedback,
              dan ulangi sampai terasa natural.
            </p>
            <div className="hero-cta">
              <a href="#join" className="btn btn-primary">
                Coba Latihan Pertama
              </a>
              <a href="#lab" className="btn btn-outline">
                Lihat Pronunciation Lab
              </a>
            </div>
            <div className="stat-pill-row">
              <div className="stat-pill">
                <b>4</b>
                <span>Modul latihan</span>
              </div>
              <div className="stat-pill">
                <b>1-on-1</b>
                <span>Feedback tutor</span>
              </div>
              <div className="stat-pill">
                <b>Rekam</b>
                <span>Dengar progresmu</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <MascotFrame
              pops={[
                { text: 'Nice pace! 👍', style: { top: '6%', left: '-8%' } },
                { text: 'Confidence +12%', style: { bottom: '8%', right: '-10%' } },
              ]}
            >
              <svg viewBox="0 0 300 260" width="100%">
                <rect x="60" y="30" width="60" height="100" rx="30" fill="#F9A24A" />
                <rect x="82" y="130" width="16" height="30" fill="#C2650C" />
                <ellipse cx="90" cy="168" rx="46" ry="10" fill="#C2650C" opacity="0.5" />
                <path d="M60 70 Q30 70 30 100" stroke="#F4C816" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M120 70 Q150 70 150 100" stroke="#F4C816" strokeWidth="8" fill="none" strokeLinecap="round" />
                <g transform="translate(150,50)">
                  <rect x="0" y="0" width="4" height="20" rx="2" fill="#9CCBED" />
                  <rect x="10" y="-10" width="4" height="40" rx="2" fill="#9CCBED" />
                  <rect x="20" y="5" width="4" height="10" rx="2" fill="#9CCBED" />
                  <rect x="30" y="-15" width="4" height="50" rx="2" fill="#9CCBED" />
                  <rect x="40" y="0" width="4" height="20" rx="2" fill="#9CCBED" />
                </g>
              </svg>
            </MascotFrame>
          </div>
        </div>
      </section>

      {/* ===== 4 MODUL ===== */}
      <section className="features">
        <div className="wrap">
          <SectionHead tag="Empat Modul Latihan" title="Dari suara pelan sampai pede di depan orang" />
          <div className="grid-4">
            {moduleList.map((m) => (
              <div className="module-card" key={m.id}>
                <div className="icon-badge" style={{ background: m.bg }}>
                  <ModuleIcon iconKey={m.iconKey} size={24} color={m.accent} />
                </div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <span className="mini-tag" style={{ color: m.accent }}>
                  {m.tag}
                </span>
                {m.materials.length > 0 && (
                  <ul className="material-dots">
                    {m.materials.map((mat) => (
                      <li key={mat.id}>
                        <a href={mat.dataUrl || mat.url} target="_blank" rel="noreferrer">
                          {mat.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <ModuleDoneToggle moduleId={m.id} />
                <CommentBox targetType="module" targetId={m.id} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRONUNCIATION LAB PREVIEW ===== */}
      <section id="lab">
        <div className="wrap">
          <SectionHead tag="Coba Rasakan" title="Begini tampilan Pronunciation Lab">
            Rekam pengucapanmu, sistem bandingkan dengan pelafalan native, kasih skor kemiripan.
          </SectionHead>
          <div className="lab-card">
            <div className="play-btn">
              <PlayIcon size={22} color="white" />
            </div>
            <div>
              <div className="lab-word">"comfortable"</div>
              <div className="waveform">
                {waveformBars.map((bar, i) => (
                  <span key={i} style={{ height: bar.height, animationDelay: bar.delay }} />
                ))}
              </div>
              <div className="meter">
                <span style={{ width: '87%', background: 'var(--olive)' }} />
              </div>
            </div>
            <div className="lab-score">
              <div className="ring">
                <span>87%</span>
              </div>
              <p>Kemiripan</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CARA KERJA ===== */}
      <section className="features">
        <div className="wrap">
          <SectionHead tag="Cara Kerja" title="Tiga langkah sederhana" />
          <div className="steps-row">
            {steps.map((s) => (
              <div className="step-item" key={s.title}>
                <div className="step-icon" style={{ background: s.bg }}>
                  {s.icon}
                </div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONI ===== */}
      <section className="quote-strip">
        <div className="wrap">
          <SectionHead tag="Cerita Mereka" title="Dari canggung jadi lancar" />
          <div className="quote-track">
            <QuoteCard
              initials="R"
              name="Rani A."
              role="Public Speaking Bootcamp"
              text="Latihan speaking-nya kerasa banget bantu pelafalan aku. Sekarang lebih pede ngomong depan orang."
              color="var(--olive-deep)"
            />
            <QuoteCard
              initials="Y"
              name="Yoga S."
              role="Pronunciation Lab"
              text="Pronunciation Lab bikin aku sadar kata-kata yang selama ini salah ucap. Skornya juga bikin termotivasi."
              color="var(--gold-deep)"
            />
            <QuoteCard
              initials="M"
              name="Maya L."
              role="Confidence Building"
              text="Latihan pernapasan sebelum presentasi beneran ngurangin grogi aku pas rapat kantor."
              color="var(--orange-deep2)"
            />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="join">
        <div className="wrap">
          <div className="cta-banner">
            <h2>Waktunya suaramu didengar.</h2>
            <p>Coba modul pertama gratis, rekam suara pertamamu hari ini.</p>
            <a href="#join" className="btn btn-primary">
              Mulai Latihan Gratis
            </a>
          </div>
        </div>
      </section>
    </>
  )
}