import { useA11y } from '../context/A11yContext'
import { A11yIcon } from './icons'

export default function A11yFab() {
  const { panelOpen, closePanel, openPanel } = useA11y()
  return (
    <button
      className="a11y-fab"
      aria-label={panelOpen ? 'Tutup menu aksesibilitas' : 'Buka menu aksesibilitas'}
      aria-expanded={panelOpen}
      onClick={panelOpen ? closePanel : openPanel}
    >
      <A11yIcon size={26} color="white" />
    </button>
  )
}