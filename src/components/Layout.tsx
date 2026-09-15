import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Topbar from './Topbar'
import Footer from './Footer'
import Blobs from './Blobs'
import A11yFab from './A11yFab'
import A11yPanel from './A11yPanel'

/**
 * Kelola scroll: ke atas saat ganti halaman, ke elemen saat ada hash.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <Blobs />
      <a href="#main" className="skip-link">
        Lewati ke konten utama
      </a>
      <Topbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <A11yFab />
      <A11yPanel />
    </>
  )
}