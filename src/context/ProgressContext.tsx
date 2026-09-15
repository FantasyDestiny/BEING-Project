import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

interface ProgressContextValue {
  quizLevel: string | null
  completedModules: string[]
  saveQuizLevel: (level: string) => Promise<void>
  toggleCompletedModule: (moduleId: string) => Promise<void>
  isModuleCompleted: (moduleId: string) => boolean
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

interface ProgressRow {
  user_id: string
  quiz_level: string | null
  completed_modules: string[]
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [quizLevel, setQuizLevel] = useState<string | null>(null)
  const [completedModules, setCompletedModules] = useState<string[]>([])

  useEffect(() => {
    if (!user) {
      setQuizLevel(null)
      setCompletedModules([])
      return
    }
    let cancelled = false
    supabase
      .from('progress')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()
      .then((res) => {
        if (cancelled) return
        if (res.error) {
          console.warn('Gagal memuat progres:', res.error)
          return
        }
        if (res.data) {
          const row = res.data as unknown as ProgressRow
          setQuizLevel(row.quiz_level ?? null)
          setCompletedModules(Array.isArray(row.completed_modules) ? row.completed_modules : [])
        } else {
          setQuizLevel(null)
          setCompletedModules([])
        }
      })
    return () => {
      cancelled = true
    }
  }, [user])

  const saveQuizLevel = useCallback(
    async (level: string) => {
      setQuizLevel(level)
      if (!user) return
      await supabase
        .from('progress')
        .upsert(
          { user_id: user.id, quiz_level: level } as never,
          { onConflict: 'user_id' },
        )
    },
    [user],
  )

  const toggleCompletedModule = useCallback(
    async (moduleId: string) => {
      setCompletedModules((prev) => {
        const next = prev.includes(moduleId) ? prev.filter((m) => m !== moduleId) : [...prev, moduleId]
        if (user) {
          void supabase.from('progress').upsert(
            { user_id: user.id, completed_modules: next } as never,
            { onConflict: 'user_id' },
          )
        }
        return next
      })
    },
    [user],
  )

  const isModuleCompleted = useCallback(
    (moduleId: string) => completedModules.includes(moduleId),
    [completedModules],
  )

  return (
    <ProgressContext.Provider
      value={{
        quizLevel,
        completedModules,
        saveQuizLevel,
        toggleCompletedModule,
        isModuleCompleted,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}