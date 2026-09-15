import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Quiz from './pages/Quiz'
import Dashboard from './pages/Dashboard'
import IELTS from './pages/IELTS'
import PersonalImprovement from './pages/PersonalImprovement'
import EnglishClub from './pages/EnglishClub'
import AuthPage from './pages/AuthPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { useAdmin } from './context/AdminContext'
import { useAuth } from './context/AuthContext'

function RootRedirect() {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="wrap" style={{ padding: '80px 0', textAlign: 'center', color: 'var(--ink-soft)' }}>
        Memuat…
      </div>
    )
  }
  if (!user) return <Landing />
  return <Navigate to="/app" replace />
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAdmin()
  if (!isAdmin) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) {
    return (
      <div className="wrap" style={{ padding: '80px 0', textAlign: 'center', color: 'var(--ink-soft)' }}>
        Memuat…
      </div>
    )
  }
  if (!user) {
    return <Navigate to={`/masuk?next=${encodeURIComponent(location.pathname)}`} replace />
  }
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/masuk" element={<AuthPage />} />
        <Route
          path="/app"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/app/:id"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/ielts" element={<IELTS />} />
        <Route path="/personal-improvement" element={<PersonalImprovement />} />
        <Route path="/english-club" element={<EnglishClub />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
        <Route path="*" element={<Landing />} />
      </Route>
    </Routes>
  )
}