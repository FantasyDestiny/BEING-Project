import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

interface AdminContextValue {
  isAdmin: boolean
  adminEmailsLoaded: boolean
  logout: () => Promise<void>
}

const AdminContext = createContext<AdminContextValue | null>(null)

export function AdminProvider({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth()
  const [adminEmails, setAdminEmails] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!user) {
      setAdminEmails([])
      setLoaded(true)
      return
    }
    let cancelled = false
    supabase
      .from('admins')
      .select('email')
      .then((res) => {
        if (cancelled) return
        if (res.error) {
          console.warn('Gagal memuat daftar admin:', res.error)
        } else {
          setAdminEmails((res.data ?? []).map((r) => (r as { email: string }).email.toLowerCase()))
        }
        setLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [user])

  const isAdmin =
    !!user &&
    !!user.email &&
    adminEmails.includes(user.email.toLowerCase())

  const logout = useCallback(async () => {
    await signOut()
  }, [signOut])

  return (
    <AdminContext.Provider value={{ isAdmin, adminEmailsLoaded: loaded, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}