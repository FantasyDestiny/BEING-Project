import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import { useStore } from '../context/StoreContext'
import { useComments, type CommentItem } from '../context/CommentsContext'
import { useToast, type ToastType } from '../context/ToastContext'
import ModuleIcon from '../components/ModuleIcon'
import { PlusIcon, TrashIcon, ShuffleIcon } from './adminIcons'
import { ClockIcon, PlayIcon, VideoIcon } from '../components/icons'
import {
  MODULE_ICONS,
  type ClubSession,
  type MaterialItem,
  type ModuleCategory,
  type ModuleItem,
  type ModuleIconKey,
} from '../data/store'

const CATEGORY_LABELS: Record<ModuleCategory, string> = {
  ielts: 'IELTS',
  personal: 'Personal Improvement',
  club: 'English Club',
}

const KIND_LABELS: Record<MaterialItem['kind'], string> = {
  pdf: 'PDF',
  video: 'Video',
  audio: 'Audio',
  link: 'Tautan',
}

type Notify = (type: ToastType, msg: string) => void

function AdminTab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button className={`admin-tab${active ? ' active' : ''}`} onClick={onClick}>
      {label}
    </button>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {children}
    </label>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { logout, isAdmin } = useAdmin()
  const store = useStore()
  const { toast } = useToast()
  const [tab, setTab] = useState<'modules' | 'materials' | 'club' | 'comments'>('modules')

  if (!isAdmin) {
    navigate('/admin/login', { replace: true })
  }

  const notify: Notify = (type, msg) => toast(type, msg)

  return (
    <section className="page-hero">
      <div className="wrap admin-dash">
        <div className="admin-head">
          <div>
            <div className="breadcrumb">
              <Link to="/">Beranda</Link> / Dashboard Admin
            </div>
            <div className="eyebrow">
              <span className="dot" aria-hidden="true" /> Panel Kontrol
            </div>
            <h1>Dashboard Admin</h1>
            <p className="lead" style={{ marginTop: 8 }}>
              Kelola materi &amp; kelas, upload materi, atur undangan Zoom English Club, dan moderasi komentar.
            </p>
          </div>
          <button className="btn btn-outline" onClick={logout}>
            Keluar
          </button>
        </div>

        <div className="admin-tabs">
          <AdminTab active={tab === 'modules'} onClick={() => setTab('modules')} label="🛠 Modul &amp; Kelas" />
          <AdminTab active={tab === 'materials'} onClick={() => setTab('materials')} label="📁 Upload Materi" />
          <AdminTab active={tab === 'club'} onClick={() => setTab('club')} label="🎥 English Club &amp; Zoom" />
          <AdminTab active={tab === 'comments'} onClick={() => setTab('comments')} label="💬 Komentar" />
        </div>

        <div className="admin-body">
          {tab === 'modules' && <ModulesTab store={store} notify={notify} />}
          {tab === 'materials' && <MaterialsTab store={store} notify={notify} />}
          {tab === 'club' && <ClubTab store={store} notify={notify} />}
          {tab === 'comments' && <CommentsTab store={store} notify={notify} />}
        </div>
      </div>
    </section>
  )
}

/* ================= MODUL & KELAS ================= */

function ModulesTab({ store, notify }: { store: ReturnType<typeof useStore>; notify: Notify }) {
  const [category, setCategory] = useState<ModuleCategory>('ielts')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [tag, setTag] = useState('')
  const [iconKey, setIconKey] = useState<ModuleIconKey>(MODULE_ICONS[0])

  const submit = async () => {
    if (!title.trim()) {
      notify('error', 'Judul modul wajib diisi.')
      return
    }
    const palette: Record<ModuleCategory, { bg: string; accent: string }> = {
      ielts: { bg: '#EEF0D0', accent: '#7A7F1E' },
      personal: { bg: '#FCE4D2', accent: '#C2650C' },
      club: { bg: '#E4F2FB', accent: '#3B87B5' },
    }
    store.addModule({
      category,
      iconKey,
      title: title.trim(),
      desc: desc.trim() || 'Belum ada deskripsi untuk modul ini.',
      tag: tag.trim() || 'Materi baru',
      bg: palette[category].bg,
      accent: palette[category].accent,
    })
    setTitle('')
    setDesc('')
    setTag('')
    const ok = await store.persistNow()
    notify(ok ? 'success' : 'error', ok ? 'Modul berhasil ditambahkan.' : 'Gagal menyimpan modul ke database.')
  }

  const removeModule = async (id: string) => {
    store.deleteModule(id)
    const ok = await store.persistNow()
    notify(ok ? 'success' : 'error', ok ? 'Modul telah dihapus.' : 'Gagal menghapus modul.')
  }

  return (
    <div className="admin-panel">
      <div className="admin-section-head">
        <h3>Tambah Modul / Kelas Baru</h3>
        <p>Modul muncul di halaman sesuai kategorinya (IELTS / Personal / English Club).</p>
      </div>

      <div className="admin-form-row">
        <Field label="Kategori">
          <select value={category} onChange={(e) => setCategory(e.target.value as ModuleCategory)}>
            {(Object.keys(CATEGORY_LABELS) as ModuleCategory[]).map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Ikon">
          <select value={iconKey} onChange={(e) => setIconKey(e.target.value as ModuleIconKey)}>
            {MODULE_ICONS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Judul">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="cth: Listening" />
        </Field>
        <Field label="Tag / info singkat">
          <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="cth: 10 paket audio" />
        </Field>
        <Field label="Deskripsi">
          <textarea
            rows={2}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Jelaskan isi modul ini…"
          />
        </Field>
        <div className="admin-form-actions">
          <button className="btn btn-primary" onClick={submit}>
            <PlusIcon size={16} /> Tambah Modul
          </button>
        </div>
      </div>

      <div className="admin-section-head" style={{ marginTop: 40 }}>
        <h3>Daftar Modul &amp; Kelas ({store.modules.length})</h3>
        <p>Klik ikon sampah untuk menghapus modul beserta materinya.</p>
      </div>

      <div className="admin-module-list">
        {(['ielts', 'personal', 'club'] as ModuleCategory[]).map((cat) => {
          const items = store.modules.filter((m) => m.category === cat)
          if (items.length === 0) return null
          return (
            <div className="admin-module-group" key={cat}>
              <div className="admin-module-group-title">{CATEGORY_LABELS[cat]}</div>
              {items.map((m) => (
                <div className="admin-module-row" key={m.id}>
                  <div className="icon-badge" style={{ background: m.bg }}>
                    <ModuleIcon iconKey={m.iconKey} size={22} color={m.accent} />
                  </div>
                  <div className="admin-module-info">
                    <b>{m.title}</b>
                    <span>{m.desc}</span>
                    <small style={{ color: 'var(--ink-faint)' }}>
                      {m.tag} · {m.materials.length} materi
                    </small>
                  </div>
                  <button
                    className="icon-btn danger"
                    aria-label={`Hapus ${m.title}`}
                    onClick={() => void removeModule(m.id)}
                  >
                    <TrashIcon size={17} />
                  </button>
                </div>
              ))}
            </div>
          )
        })}
        {store.modules.length === 0 && <p className="admin-empty">Belum ada modul. Tambahkan yang pertama!</p>}
      </div>
    </div>
  )
}

/* ================= UPLOAD MATERI ================= */

function MaterialsTab({ store, notify }: { store: ReturnType<typeof useStore>; notify: Notify }) {
  const [moduleId, setModuleId] = useState(store.modules[0]?.id ?? '')
  const [title, setTitle] = useState('')
  const [kind, setKind] = useState<MaterialItem['kind']>('pdf')
  const [url, setUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [settledFile, setSettledFile] = useState('')

  const selected: ModuleItem | undefined = store.modules.find((m) => m.id === moduleId)

  const onFile = (file: File | undefined) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setSettledFile(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const submit = async () => {
    if (!selected) {
      notify('error', 'Pilih modul tujuan dulu.')
      return
    }
    if (!title.trim()) {
      notify('error', 'Nama materi wajib diisi.')
      return
    }
    if (kind !== 'link' && !settledFile) {
      notify('error', 'Pilih file untuk diunggah dulu.')
      return
    }
    store.addMaterial(selected.id, {
      title: title.trim(),
      kind,
      url: url.trim(),
      fileName: kind === 'link' ? '' : title.trim(),
      dataUrl: settledFile || undefined,
    })
    setTitle('')
    setUrl('')
    setSettledFile('')
    if (fileInputRef.current) fileInputRef.current.value = ''
    const ok = await store.persistNow()
    notify(ok ? 'success' : 'error', ok ? 'Materi berhasil diunggah & tersimpan.' : 'Gagal menyimpan materi. Coba ukuran file lebih kecil.')
  }

  const removeMaterial = async (mId: string, matId: string) => {
    store.deleteMaterial(mId, matId)
    const ok = await store.persistNow()
    notify(ok ? 'success' : 'error', ok ? 'Materi telah dihapus.' : 'Gagal menghapus materi.')
  }

  return (
    <div className="admin-panel">
      <div className="admin-section-head">
        <h3>Upload Materi ke Modul</h3>
        <p>Materi bisa berupa file (PDF/video/audio) atau tautan. Materi muncul di kartu modul di halaman publik.</p>
      </div>

      <div className="admin-form-row">
        <Field label="Pilih Modul / Kelas">
          <select value={moduleId} onChange={(e) => setModuleId(e.target.value)}>
            {store.modules.length === 0 && <option value="">Belum ada modul</option>}
            {store.modules.map((m) => (
              <option key={m.id} value={m.id}>
                {CATEGORY_LABELS[m.category]} — {m.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Jenis Materi">
          <select value={kind} onChange={(e) => setKind(e.target.value as MaterialItem['kind'])}>
            {(Object.keys(KIND_LABELS) as MaterialItem['kind'][]).map((k) => (
              <option key={k} value={k}>
                {KIND_LABELS[k]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Nama Materi">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="cth: Modul Listening 1 (PDF)" />
        </Field>
        {kind === 'link' ? (
          <Field label="Tautan">
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" />
          </Field>
        ) : (
          <Field label="File">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.mp4,.mp3,.webm,.png,.jpg"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
            {settledFile && (
              <small style={{ color: 'var(--olive-deep)' }}>✓ File siap diunggah</small>
            )}
          </Field>
        )}
        <div className="admin-form-actions">
          <button className="btn btn-primary" onClick={submit} disabled={!selected}>
            <PlusIcon size={16} /> Tambah Materi
          </button>
        </div>
      </div>

      <div className="admin-section-head" style={{ marginTop: 40 }}>
        <h3>Materi per Modul</h3>
      </div>

      {store.modules.map((m) => (
        <div className="admin-module-group" key={m.id}>
          <div className="admin-module-group-title">
            {CATEGORY_LABELS[m.category]} — {m.title}
          </div>
          {m.materials.length === 0 && <p className="admin-empty">Belum ada materi.</p>}
          {m.materials.map((mat) => (
            <div className="admin-material-row" key={mat.id}>
              <span className={`kind-chip kind-${mat.kind}`}>{KIND_LABELS[mat.kind]}</span>
              <div className="admin-module-info">
                <b>
                  {mat.dataUrl ? (
                    <a href={mat.dataUrl} target="_blank" rel="noreferrer">
                      {mat.title}
                    </a>
                  ) : mat.url ? (
                    <a href={mat.url} target="_blank" rel="noreferrer">
                      {mat.title}
                    </a>
                  ) : (
                    mat.title
                  )}
                </b>
                <small style={{ color: 'var(--ink-faint)' }}>
                  {mat.dataUrl ? '(file tersimpan di database)' : mat.url ? mat.url : 'menunggu tautan'}
                </small>
              </div>
              <button
                className="icon-btn danger"
                aria-label={`Hapus materi ${mat.title}`}
                onClick={() => void removeMaterial(m.id, mat.id)}
              >
                <TrashIcon size={17} />
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ================= ENGLISH CLUB & ZOOM ================= */

function ClubTab({ store, notify }: { store: ReturnType<typeof useStore>; notify: Notify }) {
  const z = store.zoomInvite
  const [session, setSession] = useState<Omit<ClubSession, 'id'>>({
    day: '01',
    mon: 'Okt',
    title: '',
    meta: 'Sabtu · 19.00 WIB · via Zoom',
    status: 'Segera',
    statusClass: 'status-soon',
    zoomUrl: '',
  })
  const bannerInput = useRef<HTMLInputElement>(null)
  const [bannerBusy, setBannerBusy] = useState(false)

  const onBanner = (file: File | undefined) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      store.updateZoomInvite({ bannerImage: reader.result as string })
      setBannerBusy(true)
      const ok = await store.persistNow()
      setBannerBusy(false)
      notify(ok ? 'success' : 'error', ok ? 'Gambar banner berhasil diunggah.' : 'Gagal mengunggah gambar banner.')
    }
    reader.readAsDataURL(file)
  }

  const removeBanner = async () => {
    store.updateZoomInvite({ bannerImage: '' })
    if (bannerInput.current) bannerInput.current.value = ''
    const ok = await store.persistNow()
    notify(ok ? 'success' : 'error', ok ? 'Gambar banner dihapus.' : 'Gagal menyimpan perubahan.')
  }

  const addSession = async () => {
    if (!session.title.trim()) {
      notify('error', 'Judul sesi wajib diisi.')
      return
    }
    store.addSession({ ...session, title: session.title.trim() })
    setSession((s) => ({ ...s, title: '', zoomUrl: '' }))
    const ok = await store.persistNow()
    notify(ok ? 'success' : 'error', ok ? 'Sesi berhasil ditambahkan.' : 'Gagal menyimpan sesi ke database.')
  }

  const removeSession = async (id: string) => {
    store.deleteSession(id)
    const ok = await store.persistNow()
    notify(ok ? 'success' : 'error', ok ? 'Sesi telah dihapus.' : 'Gagal menghapus sesi.')
  }

  const resetAll = async () => {
    if (!window.confirm('Kembalikan semua data ke kondisi awal?')) return
    store.resetStore()
    const ok = await store.persistNow()
    notify(ok ? 'success' : 'error', ok ? 'Data dikembalikan ke kondisi awal.' : 'Gagal mereset data.')
  }

  return (
    <div className="admin-panel">
      {/* ---------- UNDANGAN ZOOM ---------- */}
      <div className="admin-section-head">
        <h3>Undangan Zoom (English Club)</h3>
        <p>Banner dan info ini tampil di halaman English Club.</p>
      </div>

      <div className="admin-form-row">
        <Field label="Judul Rapat">
          <input value={z.meetingTitle} onChange={(e) => store.updateZoomInvite({ meetingTitle: e.target.value })} />
        </Field>
        <Field label="Keterangan Waktu / Tanggal">
          <input value={z.dateLabel} onChange={(e) => store.updateZoomInvite({ dateLabel: e.target.value })} />
        </Field>
        <Field label="Host">
          <input value={z.host} onChange={(e) => store.updateZoomInvite({ host: e.target.value })} />
        </Field>
        <Field label="Link Zoom">
          <input
            value={z.zoomUrl}
            onChange={(e) => store.updateZoomInvite({ zoomUrl: e.target.value })}
            placeholder="https://zoom.us/j/…"
          />
        </Field>
        <Field label="Teks Banner">
          <textarea
            rows={2}
            value={z.bannerText}
            onChange={(e) => store.updateZoomInvite({ bannerText: e.target.value })}
          />
        </Field>
        <Field label="Warna Aksen Banner">
          <div className="color-input">
            <input
              type="color"
              value={z.bannerAccent}
              onChange={(e) => store.updateZoomInvite({ bannerAccent: e.target.value })}
            />
            <span>{z.bannerAccent}</span>
          </div>
        </Field>
        <Field label="Gambar Banner (opsional)">
          <div className="file-row">
            <input ref={bannerInput} type="file" accept="image/*" onChange={(e) => onBanner(e.target.files?.[0])} />
            {bannerBusy && <small style={{ color: 'var(--ink-faint)' }}>Mengunggah…</small>}
            {z.bannerImage && (
              <button className="text-btn" onClick={() => void removeBanner()}>
                Hapus gambar
              </button>
            )}
          </div>
        </Field>
        <div className="admin-form-actions">
          <button
            className="btn btn-secondary"
            onClick={() =>
              navigator.clipboard
                .writeText(z.zoomUrl || '')
                .then(() => notify('success', 'Link Zoom disalin ke clipboard.'))
                .catch(() => notify('error', 'Gagal menyalin link.'))
            }
          >
            <PlayIcon size={14} /> Salin Link Zoom
          </button>
        </div>
      </div>

      <div className="admin-section-head" style={{ marginTop: 34 }}>
        <h3>Pratinjau Banner</h3>
      </div>
      <div
        className="zoom-banner preview"
        style={{
          backgroundImage: z.bannerImage
            ? `linear-gradient(135deg, ${z.bannerAccent}, rgba(0,0,0,0.25)), url(${z.bannerImage})`
            : `linear-gradient(135deg, ${z.bannerAccent}, #e8791e)`,
        }}
      >
        <div className="zoom-banner-inner">
          <div className="eyebrow light">
            <span className="dot" aria-hidden="true" /> Undangan Zoom Resmi
          </div>
          <h2>{z.meetingTitle || 'Judul rapat'}</h2>
          <p className="zoom-banner-text">{z.bannerText}</p>
          <div className="zoom-meta">
            <ClockIcon size={18} color="white" />
            <span>{z.dateLabel}</span>
          </div>
          <div className="zoom-meta">
            <VideoIcon size={18} color="white" />
            <span>Host: {z.host}</span>
          </div>
        </div>
      </div>

      {/* ---------- SESI ---------- */}
      <div className="admin-section-head" style={{ marginTop: 44 }}>
        <h3>Sesi English Club ({store.sessions.length})</h3>
        <p>Tambah jadwal sesi Zoom mingguan. Link bisa dikosongkan dulu dan diisi belakangan.</p>
      </div>

      <div className="admin-form-row">
        <Field label="Tanggal (angka)">
          <input value={session.day} onChange={(e) => setSession((s) => ({ ...s, day: e.target.value }))} />
        </Field>
        <Field label="Bulan">
          <input value={session.mon} onChange={(e) => setSession((s) => ({ ...s, mon: e.target.value }))} />
        </Field>
        <Field label="Judul Sesi">
          <input value={session.title} onChange={(e) => setSession((s) => ({ ...s, title: e.target.value }))} />
        </Field>
        <Field label="Meta (hari/jam/platform)">
          <input value={session.meta} onChange={(e) => setSession((s) => ({ ...s, meta: e.target.value }))} />
        </Field>
        <Field label="Link Zoom">
          <input value={session.zoomUrl} onChange={(e) => setSession((s) => ({ ...s, zoomUrl: e.target.value }))} />
        </Field>
        <Field label="Status">
          <select
            value={session.statusClass}
            onChange={(e) =>
              setSession((s) => ({
                ...s,
                statusClass: e.target.value as ClubSession['statusClass'],
                status: e.target.value === 'status-open' ? 'Kelas berjalan' : 'Segera',
              }))
            }
          >
            <option value="status-open">Terbuka (Kelas berjalan)</option>
            <option value="status-soon">Segera / penuh</option>
          </select>
        </Field>
        <div className="admin-form-actions">
          <button className="btn btn-primary" onClick={addSession}>
            <PlusIcon size={16} /> Tambah Sesi
          </button>
        </div>
      </div>

      <div className="admin-module-group" style={{ marginTop: 20 }}>
        <div className="admin-module-group-title">Daftar Sesi</div>
        {store.sessions.map((s) => (
          <div className="admin-material-row" key={s.id}>
            <span className={`kind-chip ${s.statusClass}`}>{s.status}</span>
            <div className="admin-module-info">
              <b>
                {s.title} ({s.day} {s.mon})
              </b>
              <small style={{ color: 'var(--ink-faint)' }}>
                {s.meta}
                {s.zoomUrl ? ` · ${s.zoomUrl}` : ' · belum ada link'}
              </small>
            </div>
            <div className="admin-row-actions">
              {s.zoomUrl && (
                <a className="btn btn-sm" href={s.zoomUrl} target="_blank" rel="noreferrer">
                  Buka
                </a>
              )}
              <button className="icon-btn danger" aria-label={`Hapus sesi ${s.title}`} onClick={() => void removeSession(s.id)}>
                <TrashIcon size={17} />
              </button>
            </div>
          </div>
        ))}
        {store.sessions.length === 0 && <p className="admin-empty">Belum ada sesi.</p>}
      </div>

      <div className="admin-reset">
        <button className="btn btn-ghost" onClick={() => void resetAll()}>
          <ShuffleIcon size={15} /> Reset Data ke Awal
        </button>
      </div>
    </div>
  )
}

/* ================= KOMENTAR ================= */

function CommentsTab({ store, notify }: { store: ReturnType<typeof useStore>; notify: Notify }) {
  const { comments, deleteComment, setCommentHidden } = useComments()

  const targetLabel = (c: CommentItem) => {
    const name =
      c.target_type === 'module'
        ? store.modules.find((m) => m.id === c.target_id)?.title
        : store.sessions.find((s) => s.id === c.target_id)?.title
    return `${c.target_type === 'module' ? 'Modul' : 'Sesi'} — ${name ?? c.target_id}`
  }

  const fmt = (iso: string) => {
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const toggleHidden = async (c: CommentItem) => {
    const res = await setCommentHidden(c.id, !c.hidden)
    notify(
      res ? 'success' : 'error',
      res ? (c.hidden ? 'Komentar dipulihkan.' : 'Komentar di-take down (disembunyikan).') : 'Gagal memperbarui komentar.',
    )
  }

  const remove = async (c: CommentItem) => {
    if (!window.confirm(`Hapus komentar dari ${c.author} secara permanen?`)) return
    const res = await deleteComment(c.id)
    notify(res ? 'success' : 'error', res ? 'Komentar telah dihapus.' : 'Gagal menghapus komentar.')
  }

  return (
    <div className="admin-panel">
      <div className="admin-section-head">
        <h3>Komentar Pengguna ({comments.length})</h3>
        <p>
          <strong>Take down</strong> menyembunyikan komentar dari halaman publik · <strong>Hapus</strong>{' '}
          menghilangkannya secara permanen.
        </p>
      </div>

      {comments.length === 0 && <p className="admin-empty">Belum ada komentar dari pengguna.</p>}

      {comments.map((c) => (
        <div className={`admin-material-row${c.hidden ? ' comment-hidden' : ''}`} key={c.id}>
          <div className="admin-module-info">
            <b>
              {c.author}
              {c.hidden && <span className="kind-chip kind-flag">Take down</span>}
            </b>
            <span>{targetLabel(c)}</span>
            <small style={{ color: 'var(--ink-faint)' }}>{c.body}</small>
            <small className="comment-time">{fmt(c.created_at)}</small>
          </div>
          <div className="admin-row-actions">
            <button className="btn btn-sm" onClick={() => void toggleHidden(c)}>
              {c.hidden ? 'Pulihkan' : 'Take Down'}
            </button>
            <button className="btn btn-sm btn-danger" onClick={() => void remove(c)}>
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}