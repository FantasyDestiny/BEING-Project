import { useEffect, useRef } from 'react'
import { useA11y, type A11yToggles } from '../context/A11yContext'
import {
  BellIcon,
  BookTextIcon,
  CloseIcon,
  ContrastIcon,
  CursorIcon,
  ReduceMotionIcon,
  TextIcon,
  UnderlineIcon,
} from './icons'

function SwitchRow({
  label,
  icon,
  on,
  onToggle,
}: {
  label: string
  icon: React.ReactNode
  on: boolean
  onToggle: () => void
}) {
  const btnRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const el = btnRef.current
    if (el) el.setAttribute('aria-checked', String(on))
  }, [on])
  return (
    <div className="a11y-row">
      <div className="a11y-row-label">
        <div className="a11y-icon-sm">{icon}</div>
        <span>{label}</span>
      </div>
      <button
        ref={btnRef}
        className={`switch${on ? ' on' : ''}`}
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={onToggle}
      />
    </div>
  )
}

const toggleMeta: {
  key: keyof A11yToggles
  label: string
  icon: React.ReactNode
}[] = [
  { key: 'highContrast', label: 'Kontras Tinggi', icon: <ContrastIcon size={16} color="#7A7F1E" /> },
  { key: 'dyslexia', label: 'Font Disleksia', icon: <BookTextIcon size={16} color="#B08800" /> },
  { key: 'reduceMotion', label: 'Kurangi Animasi', icon: <ReduceMotionIcon size={16} color="#C2650C" /> },
  { key: 'bigCursor', label: 'Kursor Besar', icon: <CursorIcon size={16} color="var(--secondary-deep)" /> },
  { key: 'underline', label: 'Garis Bawah Tautan', icon: <UnderlineIcon size={16} color="#7A7F1E" /> },
]

export default function A11yPanel() {
  const { panelOpen, closePanel, fsScale, changeFontSize, toggles, toggle, resetAll } = useA11y()
  const panelRef = useRef<HTMLDivElement>(null)

  // Tutup saat klik di luar panel & FAB
  useEffect(() => {
    if (!panelOpen) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        !(target as Element).closest?.('.a11y-fab')
      ) {
        closePanel()
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [panelOpen, closePanel])

  return (
    <div
      ref={panelRef}
      className={`a11y-panel${panelOpen ? ' open' : ''}`}
      role="dialog"
      aria-label="Menu Aksesibilitas"
      aria-hidden={!panelOpen}
    >
      <div className="a11y-panel-head">
        <h3>Aksesibilitas</h3>
        <button aria-label="Tutup menu aksesibilitas" onClick={closePanel}>
          <CloseIcon size={15} color="var(--ink)" strokeWidth={2.5} />
        </button>
      </div>

      <div className="a11y-row">
        <div className="a11y-row-label">
          <div className="a11y-icon-sm">
            <TextIcon size={16} color="var(--secondary-deep)" />
          </div>
          <span>Ukuran Teks</span>
        </div>
        <div className="step-control">
          <button onClick={() => changeFontSize(-0.1)} aria-label="Perkecil teks">
            A−
          </button>
          <span className="val">{Math.round(fsScale * 100)}%</span>
          <button onClick={() => changeFontSize(0.1)} aria-label="Perbesar teks">
            A+
          </button>
        </div>
      </div>

      {toggleMeta.map(({ key, label, icon }) => (
        <SwitchRow key={key} label={label} icon={icon} on={toggles[key]} onToggle={() => toggle(key)} />
      ))}

      <div className="a11y-row">
        <div className="a11y-row-label">
          <div className="a11y-icon-sm">
            <BellIcon size={16} color="var(--secondary-deep)" />
          </div>
          <span>Profil Aksesibilitas</span>
        </div>
        <span className="val" style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--ink-soft)' }}>
          Segera
        </span>
      </div>

      <button className="a11y-reset" onClick={resetAll}>
        Atur Ulang Semua
      </button>
    </div>
  )
}