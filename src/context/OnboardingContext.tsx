import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { useA11y } from './A11yContext'
import { type Impairment, getImpairment } from '../data/impairments'

interface OnboardingContextValue {
  isDisability: boolean
  impairmentId: string | null
  impairment: Impairment | null
  onBoarded: boolean
  setDisability: (value: boolean) => void
  setImpairment: (id: string) => void
  finishOnboarding: () => void
  resetOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const { applyPreset } = useA11y()
  const [isDisability, setIsDisability] = useState(false)
  const [impairmentId, setImpairmentId] = useState<string | null>(null)
  const [onBoarded, setOnBoarded] = useState(false)

  const impairment = impairmentId ? getImpairment(impairmentId) ?? null : null

  // Setelah gangguan dipilih, nyalakan aksesibilitas otomatis sesuai kebutuhan
  useEffect(() => {
    if (impairmentId) {
      const imp = getImpairment(impairmentId)
      if (imp) applyPreset(imp.autoToggles)
    }
  }, [impairmentId, applyPreset])

  const setDisability = useCallback((value: boolean) => {
    setIsDisability(value)
  }, [])

  const setImpairment = useCallback((id: string) => {
    setImpairmentId(id)
  }, [])

  const finishOnboarding = useCallback(() => setOnBoarded(true), [])
  const resetOnboarding = useCallback(() => {
    setIsDisability(false)
    setImpairmentId(null)
    setOnBoarded(false)
  }, [])

  return (
    <OnboardingContext.Provider
      value={{
        isDisability,
        impairmentId,
        impairment,
        onBoarded,
        setDisability,
        setImpairment,
        finishOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider')
  return ctx
}
