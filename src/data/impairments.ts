export type A11yToggleKey = 'highContrast' | 'dyslexia' | 'reduceMotion' | 'bigCursor' | 'underline'

export interface Impairment {
  id: string
  name: string
  short: string
  description: string
  /** Aksesibilitas yang otomatis dinyalakan saat gangguan ini dipilih */
  autoToggles: A11yToggleKey[]
  /** Emoji/ikon dekoratif */
  icon: string
  accent: string
}

export const IMPAIRMENTS: Impairment[] = [
  {
    id: 'tunanetra',
    name: 'Tunanetra / Low Vision',
    short: 'Tunanetra',
    description: 'Butuh teks besar, kontras tinggi, dan dukungan pembaca layar.',
    autoToggles: ['highContrast', 'bigCursor'],
    icon: '👁️',
    accent: '#3B87B5',
  },
  {
    id: 'tunarungu',
    name: 'Tunarungu / Gangguan Pendengaran',
    short: 'Tunarungu',
    description: 'Butuh teks pengganti, subtitle, dan konten visual. Tanpa ketergantungan audio.',
    autoToggles: ['underline'],
    icon: '🙉',
    accent: '#7A7F1E',
  },
  {
    id: 'disleksia',
    name: 'Disleksia',
    short: 'Disleksia',
    description: 'Butuh font ramah disleksia dan spasi yang lega agar lebih mudah dibaca.',
    autoToggles: ['dyslexia', 'highContrast'],
    icon: '📖',
    accent: '#B08800',
  },
  {
    id: 'belajar',
    name: 'Kesulitan Belajar (Tunagrahita)',
    short: 'Kesulitan Belajar',
    description: 'Butuh materi lebih sederhana, pelan, dan banyak bantuan visual.',
    autoToggles: ['reduceMotion', 'bigCursor'],
    icon: '🧩',
    accent: '#C2650C',
  },
  {
    id: 'motorik',
    name: 'Gangguan Motorik',
    short: 'Motorik',
    description: 'Butuh target besar, kursor besar, dan navigasi yang mudah ditekan.',
    autoToggles: ['bigCursor'],
    icon: '✋',
    accent: '#8B5E3C',
  },
  {
    id: 'autisme',
    name: 'Autis / Sensori Sensitif',
    short: 'Autis / Sensori',
    description: 'Butuh minim distraksi, gerakan dikurangi, dan struktur yang jelas.',
    autoToggles: ['reduceMotion'],
    icon: '🧠',
    accent: '#6B5B95',
  },
]

export function getImpairment(id: string): Impairment | undefined {
  return IMPAIRMENTS.find((i) => i.id === id)
}
