import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'

export default function ModuleDoneToggle({ moduleId }: { moduleId: string }) {
  const { user } = useAuth()
  const { isModuleCompleted, toggleCompletedModule } = useProgress()

  if (!user) return null

  const done = isModuleCompleted(moduleId)

  return (
    <button
      type="button"
      className={`done-toggle${done ? ' done' : ''}`}
      onClick={() => void toggleCompletedModule(moduleId)}
    >
      {done ? '✓ Selesai' : 'Tandai Selesai'}
    </button>
  )
}