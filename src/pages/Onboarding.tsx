import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { CheckIcon, ArrowRightIcon, ArrowLeftIcon } from '../components/icons'
import { IMPAIRMENTS } from '../data/impairments'

export default function Onboarding() {
  const navigate = useNavigate()
  const { isDisability, setDisability, setImpairment, finishOnboarding } = useOnboarding()
  const [step, setStep] = useState<'select' | 'impair'>('select')
  const [selected, setSelected] = useState<string | null>(null)

  const handleNotDisability = () => {
    setDisability(false)
    finishOnboarding()
    navigate('/quiz')
  }

  const handleDisability = () => {
    setDisability(true)
    setStep('impair')
  }

  const handlePick = (id: string) => {
    setSelected(id)
    setImpairment(id)
  }

  const handleNext = () => {
    if (!selected) return
    finishOnboarding()
    navigate('/quiz')
  }

  const selectableImps = isDisability ? IMPAIRMENTS : []

  return (
    <section className="page-hero">
      <div className="wrap onboarding-wrap">
        <div className="breadcrumb">
          <Link to="/">Beranda</Link> / Kenalan Dulu
        </div>

        {step === 'select' ? (
          <>
            <div className="eyebrow">
              <span className="dot" aria-hidden="true" /> Langkah 1 dari 2
            </div>
            <h1>Pernahkah kamu butuh dukungan aksesibilitas?</h1>
            <p className="lead" style={{ maxWidth: 640 }}>
              Jawaban jujur bantu kami menyesuaikan tampilan dan materi. Nggak ada jawaban yang salah — semua
              pilihan diterima baik-baik saja.
            </p>

            <div className="onboard-choices">
              <button className="onboard-choice" onClick={handleNotDisability}>
                <span className="onboard-emote">🙋</span>
                <div>
                  <b>Tidak butuh dukungan khusus</b>
                  <span>Langsung lanjut ke test penyesuaian kemampuan.</span>
                </div>
                <ArrowRightIcon size={20} />
              </button>

              <button className="onboard-choice" onClick={handleDisability}>
                <span className="onboard-emote">🤝</span>
                <div>
                  <b>Ya, saya penyandang disabilitas</b>
                  <span>Kami akan sesuaikan aksesibilitas dan materi khusus.</span>
                </div>
                <ArrowRightIcon size={20} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="onboard-back">
              <button className="text-btn" onClick={() => setStep('select')}>
                <ArrowLeftIcon size={16} /> Kembali
              </button>
            </div>
            <div className="eyebrow">
              <span className="dot" aria-hidden="true" /> Langkah 2 dari 2
            </div>
            <h1>Pilih kebutuhan yang paling sesuai</h1>
            <p className="lead" style={{ maxWidth: 640 }}>
              Pilih jenis gangguan yang sesuai. Kami akan menyiapkan halaman khusus dan menyalakan aksesibilitas yang
              kamu butuhkan.
            </p>

            <div className="onboard-impair-grid">
              {selectableImps.map((imp) => {
                const active = selected === imp.id
                return (
                  <button
                    key={imp.id}
                    className={`onboard-impair${active ? ' active' : ''}`}
                    onClick={() => handlePick(imp.id)}
                    style={active ? { borderColor: imp.accent } : undefined}
                  >
                    <div className="impair-icon" style={{ background: `${imp.accent}1A`, color: imp.accent }}>
                      {imp.icon}
                    </div>
                    <b>{imp.name}</b>
                    <span>{imp.description}</span>
                    {active && (
                      <span className="impair-check">
                        <CheckIcon size={14} color="white" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <button className="btn btn-primary onboard-next" onClick={handleNext} disabled={!selected}>
              Lanjut ke Test Kemampuan
              <ArrowRightIcon size={18} />
            </button>
          </>
        )}
      </div>
    </section>
  )
}
