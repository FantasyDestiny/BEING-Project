import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

export type A11yToggles = {
  highContrast: boolean
  dyslexia: boolean
  reduceMotion: boolean
  bigCursor: boolean
  underline: boolean
}

interface A11yContextValue {
  fsScale: number
  changeFontSize: (delta: number) => void
  toggles: A11yToggles
  toggle: (key: keyof A11yToggles) => void
  applyPreset: (keys: (keyof A11yToggles)[]) => void
  resetAll: () => void
  panelOpen: boolean
  openPanel: () => void
  closePanel: () => void
}

const A11yContext = createContext<A11yContextValue | null>(null)

const MIN_FS = 0.85
const MAX_FS = 1.4

const DEFAULT_TOGGLES: A11yToggles = {
  highContrast: false,
  dyslexia: false,
  reduceMotion: false,
  bigCursor: false,
  underline: false,
}

interface A11yStored {
  fsScale?: number
  toggles?: Partial<A11yToggles>
}

export function A11yProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [fsScale, setFsScale] = useState(1)
  const [toggles, setToggles] = useState<A11yToggles>(DEFAULT_TOGGLES)
  const [panelOpen, setPanelOpen] = useState(false)
  const hydrated = useRef(true)

  // Terapkan class ke <body> sesuai toggle (setara vanilla JS di HTML asli)
  useEffect(() => {
    document.body.classList.toggle('high-contrast', toggles.highContrast)
    document.body.classList.toggle('dyslexia-mode', toggles.dyslexia)
    document.body.classList.toggle('big-cursor', toggles.bigCursor)
    document.body.classList.toggle('underline-links', toggles.underline)
  }, [toggles.highContrast, toggles.dyslexia, toggles.bigCursor, toggles.underline])

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', toggles.reduceMotion)
  }, [toggles.reduceMotion])

  // Ukuran teks via CSS custom property
  useEffect(() => {
    document.documentElement.style.setProperty('--fs-scale', String(fsScale))
  }, [fsScale])

  // Prioritaskan aksesibilitas: baca preferensi sistem reduce-motion
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      if (prefersReduced.matches) {
        document.documentElement.classList.add('reduce-motion')
      } else if (!toggles.reduceMotion) {
        // tetap hormati toggle user
      }
    }
    apply()
    prefersReduced.addEventListener?.('change', apply)
    return () => prefersReduced.removeEventListener?.('change', apply)
  }, [toggles.reduceMotion])

  // Muat setting tersimpan untuk user yang sedang login
  useEffect(() => {
    if (!user) {
      hydrated.current = true
      return
    }
    let cancelled = false
    hydrated.current = false
    supabase
      .from('progress')
      .select('a11y')
      .eq('user_id', user.id)
      .maybeSingle()
      .then((res) => {
        if (cancelled) return
        if (res.error) {
          console.warn('Gagal memuat setting aksesibilitas:', res.error)
        } else {
          const stored = (res.data as { a11y?: A11yStored } | null)?.a11y
          if (stored && typeof stored.fsScale === 'number') {
            setFsScale(Math.min(MAX_FS, Math.max(MIN_FS, stored.fsScale)))
          }
          if (stored?.toggles) {
            setToggles({ ...DEFAULT_TOGGLES, ...stored.toggles })
          }
        }
        hydrated.current = true
      })
    return () => {
      cancelled = true
    }
  }, [user])

  // Simpan setting ke akun (debounce biar nggak spam saat ubah ukuran teks)
  useEffect(() => {
    if (!user || !hydrated.current) return
    const t = setTimeout(() => {
      supabase
        .from('progress')
        .upsert(
          { user_id: user.id, a11y: { fsScale, toggles } as never },
          { onConflict: 'user_id' },
        )
        .then((res) => {
          if (res.error) console.warn('Gagal menyimpan setting aksesibilitas:', res.error)
        })
    }, 300)
    return () => clearTimeout(t)
  }, [user, fsScale, toggles])

  const changeFontSize = useCallback((delta: number) => {
    setFsScale((prev) => Math.min(MAX_FS, Math.max(MIN_FS, +(prev + delta).toFixed(2))))
  }, [])

  const toggle = useCallback((key: keyof A11yToggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const applyPreset = useCallback((keys: (keyof A11yToggles)[]) => {
    setToggles((prev) => {
      const next = { ...prev }
      keys.forEach((k) => {
        next[k] = true
      })
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    setFsScale(1)
    setToggles(DEFAULT_TOGGLES)
  }, [])

  const openPanel = useCallback(() => setPanelOpen(true), [])
  const closePanel = useCallback(() => setPanelOpen(false), [])

  // Tutup panel dengan Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && panelOpen) closePanel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [panelOpen, closePanel])

  return (
    <A11yContext.Provider
      value={{
        fsScale,
        changeFontSize,
        toggles,
        toggle,
        applyPreset,
        resetAll,
        panelOpen,
        openPanel,
        closePanel,
      }}
    >
      {children}
    </A11yContext.Provider>
  )
}

export function useA11y() {
  const ctx = useContext(A11yContext)
  if (!ctx) throw new Error('useA11y must be used within A11yProvider')
  return ctx
}