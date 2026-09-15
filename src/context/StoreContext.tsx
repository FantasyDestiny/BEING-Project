import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultStore,
  uid,
  type ClubSession,
  type MaterialItem,
  type ModuleCategory,
  type ModuleItem,
  type StoreData,
  type ZoomInvite,
} from '../data/store'
import { supabase } from '../lib/supabase'

interface StoreContextValue {
  ready: boolean
  modules: ModuleItem[]
  sessions: ClubSession[]
  zoomInvite: ZoomInvite
  addModule: (data: Omit<ModuleItem, 'id' | 'materials'>) => ModuleItem
  updateModule: (id: string, data: Partial<Omit<ModuleItem, 'id'>>) => void
  deleteModule: (id: string) => void
  addMaterial: (moduleId: string, data: Omit<MaterialItem, 'id'>) => void
  deleteMaterial: (moduleId: string, materialId: string) => void
  addSession: (data: Omit<ClubSession, 'id'>) => void
  updateSession: (id: string, data: Partial<Omit<ClubSession, 'id'>>) => void
  deleteSession: (id: string) => void
  updateZoomInvite: (data: Partial<ZoomInvite>) => void
  resetStore: () => void
  persistNow: () => Promise<boolean>
}

const StoreContext = createContext<StoreContextValue | null>(null)

// ===== Pemetaan baris DB <-> tipe aplikasi =====

interface ModuleRow {
  id: string
  category: ModuleCategory
  icon_key: string
  bg: string
  accent: string
  title: string
  description: string
  tag: string
  materials: MaterialItem[]
}

interface SessionRow {
  id: string
  day: string
  mon: string
  title: string
  meta: string
  status: string
  status_class: string
  zoom_url: string
}

interface ZoomRow {
  id: string
  meeting_title: string
  date_label: string
  host: string
  banner_text: string
  banner_image: string
  banner_accent: string
  zoom_url: string
}

function toDbModule(m: ModuleItem): ModuleRow {
  return {
    id: m.id,
    category: m.category,
    icon_key: m.iconKey,
    bg: m.bg,
    accent: m.accent,
    title: m.title,
    description: m.desc,
    tag: m.tag,
    materials: m.materials ?? [],
  }
}

function fromDbModule(r: ModuleRow): ModuleItem {
  return {
    id: r.id,
    category: r.category,
    iconKey: r.icon_key,
    bg: r.bg,
    accent: r.accent,
    title: r.title,
    desc: r.description,
    tag: r.tag,
    materials: Array.isArray(r.materials) ? r.materials : [],
  }
}

function toDbSession(s: ClubSession): SessionRow {
  return {
    id: s.id,
    day: s.day,
    mon: s.mon,
    title: s.title,
    meta: s.meta,
    status: s.status,
    status_class: s.statusClass,
    zoom_url: s.zoomUrl,
  }
}

function fromDbSession(r: SessionRow): ClubSession {
  return {
    id: r.id,
    day: r.day,
    mon: r.mon,
    title: r.title,
    meta: r.meta,
    status: r.status,
    statusClass: r.status_class as ClubSession['statusClass'],
    zoomUrl: r.zoom_url,
  }
}

function toDbZoom(z: ZoomInvite): ZoomRow {
  return {
    id: 'main',
    meeting_title: z.meetingTitle,
    date_label: z.dateLabel,
    host: z.host,
    banner_text: z.bannerText,
    banner_image: z.bannerImage ?? '',
    banner_accent: z.bannerAccent,
    zoom_url: z.zoomUrl,
  }
}

function fromDbZoom(r: ZoomRow): ZoomInvite {
  return {
    meetingTitle: r.meeting_title,
    dateLabel: r.date_label,
    host: r.host,
    bannerText: r.banner_text,
    bannerImage: r.banner_image,
    bannerAccent: r.banner_accent,
    zoomUrl: r.zoom_url,
  }
}

// ===== Load dari DB =====

async function loadFromDb(): Promise<StoreData> {
  const seed = defaultStore()
  try {
    const [modulesRes, sessionsRes, zoomRes] = await Promise.all([
      supabase.from('modules').select('*').order('created_at', { ascending: true }),
      supabase.from('sessions').select('*').order('created_at', { ascending: true }),
      supabase.from('zoom_invite').select('*').limit(1),
    ])
    if (modulesRes.error) throw modulesRes.error
    if (sessionsRes.error) throw sessionsRes.error
    if (zoomRes.error) throw zoomRes.error

    const modules = (modulesRes.data ?? []).map(fromDbModule)
    const sessions = (sessionsRes.data ?? []).map(fromDbSession)
    const zoomInvite = zoomRes.data?.[0] ? fromDbZoom(zoomRes.data[0]) : seed.zoomInvite

    const empty = modules.length === 0 && sessions.length === 0
    if (empty) return { modules: seed.modules, sessions: seed.sessions, zoomInvite: seed.zoomInvite }
    return { modules, sessions, zoomInvite }
  } catch (e) {
    console.warn('Gagal memuat data dari Supabase, memakai data awal:', e)
    return seed
  }
}

// ===== Simpan ke DB (ganti-total agar menghapus baris yang tak lagi ada) =====

async function saveToDb(d: StoreData): Promise<boolean> {
  try {
    await supabase.from('modules').delete().neq('id', '')
    await supabase.from('sessions').delete().neq('id', '')
    const moduleRows = d.modules.map(toDbModule)
    const sessionRows = d.sessions.map(toDbSession)
    if (moduleRows.length) {
      const res = await supabase.from('modules').insert(moduleRows)
      if (res.error) throw res.error
    }
    if (sessionRows.length) {
      const res = await supabase.from('sessions').insert(sessionRows)
      if (res.error) throw res.error
    }
    const zoomRes = await supabase.from('zoom_invite').upsert(toDbZoom(d.zoomInvite), { onConflict: 'id' })
    if (zoomRes.error) throw zoomRes.error
    return true
  } catch (e) {
    console.warn('Gagal menyimpan ke Supabase:', e)
    return false
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoreData>(defaultStore)
  const [ready, setReady] = useState(false)
  const loadedRef = useRef(false)
  const dataRef = useRef(data)

  useEffect(() => {
    dataRef.current = data
  }, [data])

  useEffect(() => {
    let cancelled = false
    loadFromDb().then((loaded) => {
      if (cancelled) return
      loadedRef.current = true
      setData(loaded)
      setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const saveStore = useCallback((d: StoreData) => {
    void saveToDb(d)
  }, [])

  const persistNow = useCallback(async () => {
    return saveToDb(dataRef.current)
  }, [])

  useEffect(() => {
    if (!loadedRef.current) return
    const t = setTimeout(() => saveStore(data), 400)
    return () => clearTimeout(t)
  }, [data, saveStore])

  const addModule = useCallback((mod: Omit<ModuleItem, 'id' | 'materials'>) => {
    const full: ModuleItem = { ...mod, id: uid(), materials: [] }
    setData((d) => ({ ...d, modules: [...d.modules, full] }))
    return full
  }, [])

  const updateModule = useCallback((id: string, patch: Partial<Omit<ModuleItem, 'id'>>) => {
    setData((d) => ({ ...d, modules: d.modules.map((m) => (m.id === id ? { ...m, ...patch } : m)) }))
  }, [])

  const deleteModule = useCallback((id: string) => {
    setData((d) => ({ ...d, modules: d.modules.filter((m) => m.id !== id) }))
  }, [])

  const addMaterial = useCallback((moduleId: string, mat: Omit<MaterialItem, 'id'>) => {
    const material: MaterialItem = { ...mat, id: uid() }
    setData((d) => ({
      ...d,
      modules: d.modules.map((m) => (m.id === moduleId ? { ...m, materials: [...m.materials, material] } : m)),
    }))
  }, [])

  const deleteMaterial = useCallback((moduleId: string, materialId: string) => {
    setData((d) => ({
      ...d,
      modules: d.modules.map((m) =>
        m.id === moduleId ? { ...m, materials: m.materials.filter((x) => x.id !== materialId) } : m,
      ),
    }))
  }, [])

  const addSession = useCallback((s: Omit<ClubSession, 'id'>) => {
    setData((d) => ({ ...d, sessions: [...d.sessions, { ...s, id: uid() }] }))
  }, [])

  const updateSession = useCallback((id: string, patch: Partial<Omit<ClubSession, 'id'>>) => {
    setData((d) => ({ ...d, sessions: d.sessions.map((s) => (s.id === id ? { ...s, ...patch } : s)) }))
  }, [])

  const deleteSession = useCallback((id: string) => {
    setData((d) => ({ ...d, sessions: d.sessions.filter((s) => s.id !== id) }))
  }, [])

  const updateZoomInvite = useCallback((patch: Partial<ZoomInvite>) => {
    setData((d) => ({ ...d, zoomInvite: { ...d.zoomInvite, ...patch } }))
  }, [])

  const resetStore = useCallback(() => {
    setData(defaultStore())
  }, [])

  return (
    <StoreContext.Provider
      value={{
        ready,
        modules: data.modules,
        sessions: data.sessions,
        zoomInvite: data.zoomInvite,
        addModule,
        updateModule,
        deleteModule,
        addMaterial,
        deleteMaterial,
        addSession,
        updateSession,
        deleteSession,
        updateZoomInvite,
        resetStore,
        persistNow,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

export function modulesByCategory(modules: ModuleItem[], category: ModuleCategory) {
  return modules.filter((m) => m.category === category)
}