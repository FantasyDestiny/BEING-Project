import { Link } from 'react-router-dom'
import MascotFrame from '../components/MascotFrame'
import QuoteCard from '../components/QuoteCard'
import SectionHead from '../components/SectionHead'
import CommentBox from '../components/CommentBox'
import { useStore } from '../context/StoreContext'
import {
  BellIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  UsersIcon,
  VideoIcon,
} from '../components/icons'

const values = [
  {
    icon: <VideoIcon size={24} color="#C2650C" />,
    bg: '#FCE4D2',
    title: 'Sesi Zoom Mingguan',
    desc: 'Link Zoom baru tiap minggu dari admin, lengkap dengan reminder H-1 biar nggak kelewat.',
  },
  {
    icon: <UsersIcon size={24} color="#3B87B5" />,
    bg: '#E4F2FB',
    title: 'Small Group',
    desc: 'Kelompok kecil maksimal 6 orang, jadi semua dapat giliran ngomong dan kenal satu sama lain.',
  },
  {
    icon: <BellIcon size={24} color="#7A7F1E" />,
    bg: '#EEF0D0',
    title: 'Topik Santai & Terarah',
    desc: 'Dari cerita weekend sampai debat teknologi, dipandu admin supaya obrolan tetap nyambung.',
  },
]

const steps = [
  {
    icon: <CalendarIcon size={26} color="#C2650C" />,
    bg: '#FCE4D2',
    title: '1. Pilih Sesi',
    desc: 'Cek jadwal mingguan dan pilih sesi yang paling cocok buatmu.',
  },
  {
    icon: <VideoIcon size={26} color="#3B87B5" />,
    bg: '#E4F2FB',
    title: '2. Gabung Zoom',
    desc: 'Link muncul otomatis pas sesi dimulai, tinggal klik dan masuk.',
  },
  {
    icon: <ClockIcon size={26} color="#7A7F1E" />,
    bg: '#EEF0D0',
    title: '3. Ngobrol Santai',
    desc: 'Latihan speaking natural sambil ketemu teman baru dari seluruh Indonesia.',
  },
]

export default function EnglishClub() {
  const { sessions, zoomInvite } = useStore()

  return (
    <>
      {/* ===== PAGE HERO ===== */}
      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <div>
            <div className="breadcrumb">
              <Link to="/">Beranda</Link> / English Club
            </div>
            <div className="eyebrow">
              <span className="dot" aria-hidden="true" /> Ngobrol Bareng, Belajar Bareng
            </div>
            <h1>
              Kelas terasa kecil kalau <span className="accent">ngobrolnya rame.</span>
            </h1>
            <p className="lead">
              Sesuap obrolan santai tiap minggu lewat Zoom, bareng member BEING dari semua level. Datang,
              ngobrol, pulang bawa teman baru — dan pelafalan yang makin pede.
            </p>
            <div className="hero-cta">
              <a href="#jadwal" className="btn btn-primary">
                Lihat Jadwal Sesinya
              </a>
              <a href="#cara-kerja" className="btn btn-outline">
                Gimana Cara Kerjanya
              </a>
            </div>
            <div className="stat-pill-row">
              <div className="stat-pill">
                <b>2.400+</b>
                <span>Member aktif</span>
              </div>
              <div className="stat-pill">
                <b>Setiap</b>
                <span>Sabtu malam</span>
              </div>
              <div className="stat-pill">
                <b>6</b>
                <span>Orang per group</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <MascotFrame
              pops={[
                { text: 'Halo, teman baru! 👋', style: { top: '6%', left: '-8%' } },
                { text: 'Sesi zoom hari Sabtu', style: { bottom: '8%', right: '-10%' } },
              ]}
            >
              <svg viewBox="0 0 300 260" width="100%">
                <ellipse cx="150" cy="232" rx="96" ry="14" fill="rgba(28,43,58,0.08)" />
                <rect x="60" y="40" width="104" height="72" rx="18" fill="#FCE4D2" />
                <circle cx="88" cy="70" r="10" fill="#F9A24A" />
                <circle cx="118" cy="70" r="10" fill="#F9A24A" />
                <path d="M88 88 Q103 102 118 88" stroke="#C2650C" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M164 76 l18 -12 v26z" fill="#C2650C" />
                <rect x="150" y="160" width="104" height="72" rx="18" fill="#E4F2FB" />
                <circle cx="178" cy="190" r="10" fill="#7A9CCB" />
                <circle cx="208" cy="190" r="10" fill="#7A9CCB" />
                <path d="M178 208 Q193 222 208 208" stroke="#3B87B5" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M254 196 l18 -12 v26z" fill="#3B87B5" />
              </svg>
            </MascotFrame>
          </div>
        </div>
      </section>

      {/* ===== KEUNGGULAN ===== */}
      <section className="features">
        <div className="wrap">
          <SectionHead tag="Kenapa English Club" title="Bukan sekadar zoom-an biasa">
            Tiap elemen dirancang supaya semua orang ikut ngomong, bukan cuma nonton.
          </SectionHead>
          <div className="value-grid">
            {values.map((v) => (
              <div className="value-card" key={v.title}>
                <div className="icon-badge" style={{ background: v.bg }}>
                  {v.icon}
                </div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UNDANGAN ZOOM ===== */}
      <section>
        <div className="wrap">
          <div
            className="zoom-banner"
            style={{
              backgroundImage: zoomInvite.bannerImage
                ? `linear-gradient(135deg, ${zoomInvite.bannerAccent}, rgba(0,0,0,0.25)), url(${zoomInvite.bannerImage})`
                : `linear-gradient(135deg, ${zoomInvite.bannerAccent}, #e8791e)`,
            }}
          >
            <div className="zoom-banner-inner">
              <div className="eyebrow light">
                <span className="dot" aria-hidden="true" /> Undangan Zoom Resmi
              </div>
              <h2>{zoomInvite.meetingTitle}</h2>
              <p className="zoom-banner-text">{zoomInvite.bannerText}</p>
              <div className="zoom-meta">
                <ClockIcon size={18} color="white" />
                <span>{zoomInvite.dateLabel}</span>
              </div>
              <div className="zoom-meta">
                <VideoIcon size={18} color="white" />
                <span>Host: {zoomInvite.host}</span>
              </div>
              {zoomInvite.zoomUrl ? (
                <a className="btn btn-light" href={zoomInvite.zoomUrl} target="_blank" rel="noreferrer">
                  Gabung Zoom
                </a>
              ) : (
                <span className="btn btn-light disabled">Link segera diupload</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== JADWAL ===== */}
      <section id="jadwal">
        <div className="wrap">
          <SectionHead tag="Jadwal Mingguan" title="Pilih sesi yang paling pas">
            Semua sesi mulai jam 19.00 WIB. Link Zoom muncul otomatis begitu sesi dibuka.
          </SectionHead>
          <div>
            {sessions.map((s) => (
              <div className="session-block" key={s.id}>
                <div className="session-row">
                  <div className="date-chip">
                    <div className="day">{s.day}</div>
                    <div className="mon">{s.mon}</div>
                  </div>
                  <div className="s-info">
                    <b>{s.title}</b>
                    <span>{s.meta}</span>
                  </div>
                  <span className={`s-status ${s.statusClass}`}>{s.status}</span>
                  {s.zoomUrl && (
                    <a className="btn btn-sm" href={s.zoomUrl} target="_blank" rel="noreferrer">
                      Gabung
                    </a>
                  )}
                </div>
                <CommentBox targetType="session" targetId={s.id} />
              </div>
            ))}
          </div>
          <p style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ink-soft)', fontSize: '0.86rem', marginTop: 16 }}>
            <CheckIcon size={16} color="var(--olive)" /> Link Zoom diupload admin H-1 dan muncul kembali saat sesi dimulai.
          </p>
        </div>
      </section>

      {/* ===== CARA KERJA ===== */}
      <section className="features" id="cara-kerja">
        <div className="wrap">
          <SectionHead tag="Cara Kerja" title="Tiga langkah dari jadwal ke ngobrol" />
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
          <SectionHead tag="Cerita Mereka" title="Ketemu teman baru tiap minggu" />
          <div className="quote-track">
            <QuoteCard
              initials="S"
              name="Sinta W."
              role="English Club"
              text="English Club jadi highlight minggu aku. Ketemu teman baru dan sekalian latihan ngobrol."
              color="var(--orange-deep2)"
            />
            <QuoteCard
              initials="B"
              name="Bimo R."
              role="Member sejak Maret"
              text="Awalnya gugup, sekarang jadi nungguin Sabtu. Group kecil bikin semua orang diajak ngomong."
              color="var(--gold-deep)"
            />
            <QuoteCard
              initials="T"
              name="Tasya M."
              role="Level Beginner"
              text="Nggak pernah ngerasa di-judge. Topik santai dan admin selalu bantu narik obrolan."
              color="var(--olive-deep)"
            />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="join">
        <div className="wrap">
          <div className="cta-banner">
            <h2>Siap ketemu teman baru?</h2>
            <p>Gabung English Club gratis dan cicipi sesi Sabtu malam tanpa komitmen.</p>
            <a href="#jadwal" className="btn btn-primary">
              Daftar ke Sesi Berikutnya
            </a>
          </div>
        </div>
      </section>
    </>
  )
}