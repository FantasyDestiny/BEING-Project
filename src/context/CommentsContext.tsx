import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { supabase } from '../lib/supabase'

export type CommentTargetType = 'module' | 'session'

export interface CommentItem {
  id: string
  target_type: CommentTargetType
  target_id: string
  author: string
  body: string
  hidden: boolean
  created_at: string
}

interface CommentsContextValue {
  ready: boolean
  comments: CommentItem[]
  commentsFor: (type: CommentTargetType, id: string) => CommentItem[]
  addComment: (data: {
    target_type: CommentTargetType
    target_id: string
    author: string
    body: string
  }) => Promise<boolean>
  deleteComment: (id: string) => Promise<boolean>
  setCommentHidden: (id: string, hidden: boolean) => Promise<boolean>
}

const CommentsContext = createContext<CommentsContextValue | null>(null)

export function CommentsProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<CommentItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: true })
      .then((res) => {
        if (cancelled) return
        if (res.error) {
          console.warn('Gagal memuat komentar:', res.error)
        } else {
          setComments(res.data ?? [])
        }
        setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const commentsFor = useCallback(
    (type: CommentTargetType, id: string) =>
      comments.filter((c) => c.target_type === type && c.target_id === id && !c.hidden),
    [comments],
  )

  const addComment = useCallback(
    async (data: { target_type: CommentTargetType; target_id: string; author: string; body: string }) => {
      const res = await supabase.from('comments').insert(data).select().single()
      if (res.error) {
        console.warn('Gagal menambah komentar:', res.error)
        return false
      }
      setComments((prev) => [...prev, res.data])
      return true
    },
    [],
  )

  const deleteComment = useCallback(async (id: string) => {
    const res = await supabase.from('comments').delete().eq('id', id)
    if (res.error) {
      console.warn('Gagal menghapus komentar:', res.error)
      return false
    }
    setComments((prev) => prev.filter((c) => c.id !== id))
    return true
  }, [])

  const setCommentHidden = useCallback(async (id: string, hidden: boolean) => {
    const res = await supabase.from('comments').update({ hidden }).eq('id', id)
    if (res.error) {
      console.warn('Gagal mengubah status komentar:', res.error)
      return false
    }
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, hidden } : c)))
    return true
  }, [])

  return (
    <CommentsContext.Provider
      value={{ ready, comments, commentsFor, addComment, deleteComment, setCommentHidden }}
    >
      {children}
    </CommentsContext.Provider>
  )
}

export function useComments() {
  const ctx = useContext(CommentsContext)
  if (!ctx) throw new Error('useComments must be used within CommentsProvider')
  return ctx
}