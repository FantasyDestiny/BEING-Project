import { useEffect, useState } from 'react'
import { useA11y } from '../context/A11yContext'

const VERBS = ['BEING fluent.', 'BEING confident.', 'BEING understood.', 'BEING ready.']

export default function VerbCycler() {
  const { toggles } = useA11y()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (toggles.reduceMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % VERBS.length), 2600)
    return () => clearInterval(id)
  }, [toggles.reduceMotion])

  return (
    <div className="conjugator">
      <span className="pronoun">I am / You are / We are</span>
      <span className="verb-slot" aria-live="polite">
        <span>{VERBS[index]}</span>
      </span>
    </div>
  )
}