import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useComments, type CommentTargetType } from '../context/CommentsContext'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

function formatTime(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function CommentBox({ targetType, targetId }: { targetType: CommentTargetType; targetId: string }) {
  const { commentsFor, addComment } = useComments()
  const { toast } = useToast()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [busy, setBusy] = useState(false)

  const items = commentsFor(targetType, targetId)

  const submit = async () => {
    if (!user) {
      toast('error', 'Silakan masuk dulu untuk berkomentar.')
      return
    }
    if (!body.trim()) {
      toast('error', 'Komentar tidak boleh kosong.')
      return
    }
    setBusy(true)
    const ok = await addComment({
      target_type: targetType,
      target_id: targetId,
      author: name.trim() || user.email?.split('@')[0] || 'Pengguna',
      body: body.trim(),
    })
    if (ok) {
      toast('success', 'Komentar terkirim.')
      setBody('')
    } else {
      toast('error', 'Gagal mengirim komentar.')
    }
    setBusy(false)
  }

  const loginLink = `/masuk?next=${encodeURIComponent(window.location.pathname)}`

  return (
    <div className="comment-box">
      <button
        type="button"
        className={`comment-toggle${open ? ' active' : ''}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        💬 Komentar ({items.length})
      </button>

      {open && (
        <div className="comment-thread">
          <div className="comment-list">
            {items.length === 0 ? (
              <p className="comment-empty">Belum ada komentar. Jadi yang pertama!</p>
            ) : (
              items.map((c) => (
                <div className="comment-item" key={c.id}>
                  <div className="comment-head">
                    <b>{c.author}</b>
                    <span>{formatTime(c.created_at)}</span>
                  </div>
                  <p>{c.body}</p>
                </div>
              ))
            )}
          </div>
          {!user ? (
            <p className="comment-login-note">
              Silakan <Link to={loginLink}>masuk</Link> untuk ikut berkomentar.
            </p>
          ) : (
            <div className="comment-form">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama tampilan (opsional)"
                maxLength={40}
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tulis komentar…"
                rows={2}
                maxLength={500}
              />
              <button type="button" className="btn btn-sm" onClick={submit} disabled={busy}>
                {busy ? 'Mengirim…' : 'Kirim Komentar'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}