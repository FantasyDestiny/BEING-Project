import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { A11yProvider } from './context/A11yContext'
import { AuthProvider } from './context/AuthContext'
import { StoreProvider } from './context/StoreContext'
import { CommentsProvider } from './context/CommentsContext'
import { ProgressProvider } from './context/ProgressContext'
import { OnboardingProvider } from './context/OnboardingContext'
import { AdminProvider } from './context/AdminContext'
import { ToastProvider } from './context/ToastContext'
import App from './App'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <A11yProvider>
        <StoreProvider>
          <CommentsProvider>
            <ProgressProvider>
              <OnboardingProvider>
                <AdminProvider>
                  <ToastProvider>
                    <HashRouter>
                      <App />
                    </HashRouter>
                  </ToastProvider>
                </AdminProvider>
              </OnboardingProvider>
            </ProgressProvider>
          </CommentsProvider>
        </StoreProvider>
      </A11yProvider>
    </AuthProvider>
  </StrictMode>,
)