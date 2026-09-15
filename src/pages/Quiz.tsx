import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { useProgress } from '../context/ProgressContext'
import { ArrowRightIcon, ArrowLeftIcon } from '../components/icons'

interface Question {
  prompt: string
  options: { label: string; score: number }[]
}

const questions: Question[] = [
  {
    prompt: 'How comfortable are you introducing yourself in English?',
    options: [
      { label: 'Masih sangat gugup & susah nemuin kata', score: 1 },
      { label: 'Bisa sedikit-sedikit, sering macet', score: 2 },
      { label: 'Cukup lancar, kadang salah grammar', score: 3 },
      { label: 'Lancar dan percaya diri', score: 4 },
    ],
  },
  {
    prompt: '"I ______ to school every day." — pilih yang benar.',
    options: [
      { label: 'go', score: 4 },
      { label: 'goes', score: 2 },
      { label: 'going', score: 1 },
      { label: 'gone', score: 1 },
    ],
  },
  {
    prompt: 'Seberapa sering kamu ngerti percakapan bahasa Inggris tanpa subtitle?',
    options: [
      { label: 'Hampir nggak pernah', score: 1 },
      { label: 'Kalau pelan-pelan bisa', score: 2 },
      { label: 'Sering ngerti intinya', score: 3 },
      { label: 'Hampir selalu paham', score: 4 },
    ],
  },
  {
    prompt: 'Apa yang paling kamu cari dari BEING?',
    options: [
      { label: 'Mulai dari nol', score: 1 },
      { label: 'Latihan terarah biar makin pede', score: 2 },
      { label: 'Siapin ujian seperti IELTS', score: 3 },
      { label: 'Asah kemampuan sampai lancar', score: 4 },
    ],
  },
]

function levelLabel(total: number) {
  const max = questions.length * 4
  const pct = total / max
  if (pct >= 0.8) return { name: 'Lancar', desc: 'Kamu siap tantangan lanjutan.' }
  if (pct >= 0.55) return { name: 'Menengah', desc: 'Bagus! Fokus perkuat bagian yang masih ragu.' }
  if (pct >= 0.3) return { name: 'Dasar', desc: 'Ayo mulai dari pondasi dasar.' }
  return { name: 'Pemula', desc: 'Nggak masalah, semua mulai dari sini.' }
}

export default function Quiz() {
  const navigate = useNavigate()
  const { isDisability, impairmentId } = useOnboarding()
  const { saveQuizLevel } = useProgress()
  const [index, setIndex] = useState(0)
  const [total, setTotal] = useState(0)
  const [done, setDone] = useState(false)

  const question = questions[index]
  const isLast = index === questions.length - 1
  const level = done ? levelLabel(total) : null

  useEffect(() => {
    if (done && level) void saveQuizLevel(level.name)
  }, [done, level, saveQuizLevel])

  const answer = (score: number) => {
    const newTotal = total + score
    if (isLast) {
      setTotal(newTotal)
      setDone(true)
      return
    }
    setTotal(newTotal)
    setIndex((i) => i + 1)
  }

  const goToApp = () => {
    const base = isDisability && impairmentId ? `/app/${impairmentId}` : '/app'
    navigate(base)
  }

  const restart = () => {
    setIndex(0)
    setTotal(0)
    setDone(false)
  }

  return (
    <section className="page-hero">
      <div className="wrap onboarding-wrap">
        <div className="breadcrumb">
          <Link to={isDisability ? '/onboarding' : '/'}>Beranda</Link> / Test Kemampuan
        </div>

        {!done ? (
          <>
            <div className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Pertanyaan {index + 1} dari {questions.length}
            </div>
            <h1 style={{ maxWidth: 680 }}>{question.prompt}</h1>

            <div className="quiz-meter">
              <span style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
            </div>

            <div className="quiz-options">
              {question.options.map((opt) => (
                <button className="quiz-option" key={opt.label} onClick={() => answer(opt.score)}>
                  <span>{opt.label}</span>
                  <ArrowRightIcon size={16} />
                </button>
              ))}
            </div>

            {index > 0 && (
              <button className="text-btn" onClick={() => setIndex((i) => i - 1)}>
                <ArrowLeftIcon size={16} /> Sebelumnya
              </button>
            )}
          </>
        ) : (
          <div className="quiz-result">
            <div className="eyebrow">
              <span className="dot" aria-hidden="true" /> Hasil Test
            </div>
            <h1>Level awal kamu: {level?.name}</h1>
            <p className="lead" style={{ maxWidth: 560 }}>
              {level?.desc} {isDisability ? 'Materi dan aksesibilitas sudah disesuaikan dengan kebutuhanmu.' : 'Materi akan kami sesuaikan dengan levelmu.'}
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={goToApp}>
                Masuk ke Halaman Belajar
                <ArrowRightIcon size={18} />
              </button>
              <button className="btn btn-outline" onClick={restart}>
                Ulangi Test
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
