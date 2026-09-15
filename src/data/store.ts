// ===== Tipe data inti =====

export type ModuleCategory = 'ielts' | 'personal' | 'club'

export interface MaterialItem {
  id: string
  title: string
  kind: 'pdf' | 'video' | 'audio' | 'link'
  url: string
  fileName?: string
  dataUrl?: string
}

export interface ModuleItem {
  id: string
  category: ModuleCategory
  iconKey: string
  bg: string
  accent: string
  title: string
  desc: string
  tag: string
  materials: MaterialItem[]
}

export interface ClubSession {
  id: string
  day: string
  mon: string
  title: string
  meta: string
  status: string
  statusClass: 'status-open' | 'status-soon'
  zoomUrl: string
}

export interface ZoomInvite {
  meetingTitle: string
  dateLabel: string
  host: string
  bannerText: string
  bannerImage?: string
  bannerAccent: string
  zoomUrl: string
}

export interface StoreData {
  modules: ModuleItem[]
  sessions: ClubSession[]
  zoomInvite: ZoomInvite
}

// ===== Generator id =====

export function uid() {
  return Math.random().toString(36).slice(2, 10)
}

// ===== Data awal (seed) =====

export function defaultStore(): StoreData {
  return {
    modules: [
      {
        id: 'ielts-listening',
        category: 'ielts',
        iconKey: 'headphones',
        bg: '#E4F2FB',
        accent: '#3B87B5',
        title: 'Listening',
        desc: 'Latihan dengar audio real-test dengan aksen beragam, dari percakapan santai sampai kuliah akademik.',
        tag: '10 paket audio',
        materials: [],
      },
      {
        id: 'ielts-reading',
        category: 'ielts',
        iconKey: 'book',
        bg: '#EEF0D0',
        accent: '#7A7F1E',
        title: 'Reading',
        desc: 'Teks akademik dan strategi skimming-scanning supaya nggak kehabisan waktu di ruang ujian.',
        tag: '12 teks latihan',
        materials: [],
      },
      {
        id: 'ielts-writing',
        category: 'ielts',
        iconKey: 'pencil',
        bg: '#FCF1CE',
        accent: '#B08800',
        title: 'Writing',
        desc: 'Task 1 & 2 dengan template struktur dan koreksi tertulis dari tutor, bukan cuma nilai angka.',
        tag: 'Koreksi manual',
        materials: [],
      },
      {
        id: 'ielts-speaking',
        category: 'ielts',
        iconKey: 'mic',
        bg: '#FCE4D2',
        accent: '#C2650C',
        title: 'Speaking',
        desc: 'Simulasi interview 1-on-1 sama tutor, plus rekaman buat kamu dengar ulang progresmu.',
        tag: 'Simulasi live',
        materials: [],
      },
      {
        id: 'personal-bootcamp',
        category: 'personal',
        iconKey: 'camera',
        bg: '#FCE4D2',
        accent: '#C2650C',
        title: 'Public Speaking Bootcamp',
        desc: 'Latihan struktur presentasi, artikulasi, dan bahasa tubuh di depan kamera.',
        tag: '6 sesi',
        materials: [],
      },
      {
        id: 'personal-pronunciation',
        category: 'personal',
        iconKey: 'mic',
        bg: '#E4F2FB',
        accent: '#3B87B5',
        title: 'Pronunciation Lab',
        desc: 'Latihan bunyi yang sering ketuker, dibantu contoh audio dan skor kemiripan.',
        tag: '80+ kata sulit',
        materials: [],
      },
      {
        id: 'personal-intonation',
        category: 'personal',
        iconKey: 'radio',
        bg: '#FCF1CE',
        accent: '#B08800',
        title: 'Intonasi & Ritme',
        desc: 'Latihan naik-turun nada supaya kalimat kedengaran natural, bukan datar.',
        tag: 'Latihan berpasangan',
        materials: [],
      },
      {
        id: 'personal-confidence',
        category: 'personal',
        iconKey: 'heart',
        bg: '#EEF0D0',
        accent: '#7A7F1E',
        title: 'Confidence Building',
        desc: 'Latihan mental & pernapasan buat kurangin gugup sebelum ngomong.',
        tag: 'Mindful speaking',
        materials: [],
      },
    ],
    sessions: [
      {
        id: 'sess-01',
        day: '05',
        mon: 'Sep',
        title: 'Casual Talk: Weekend Stories',
        meta: 'Sabtu · 19.00 WIB · via Zoom',
        status: 'Kelas berjalan',
        statusClass: 'status-open',
        zoomUrl: 'https://zoom.us/j/123456789',
      },
      {
        id: 'sess-02',
        day: '12',
        mon: 'Sep',
        title: 'Debate Night: Tech & AI',
        meta: 'Sabtu · 19.00 WIB · via Zoom',
        status: 'Sisa 2 slot',
        statusClass: 'status-soon',
        zoomUrl: 'https://zoom.us/j/987654321',
      },
      {
        id: 'sess-03',
        day: '19',
        mon: 'Sep',
        title: 'Movie Chat: Dialog Favorit',
        meta: 'Sabtu · 19.00 WIB · via Zoom',
        status: 'Segera',
        statusClass: 'status-soon',
        zoomUrl: '',
      },
    ],
    zoomInvite: {
      meetingTitle: 'Casual Talk: Weekend Stories',
      dateLabel: 'Sabtu, 05 September · 19.00 WIB',
      host: 'Admin BEING',
      bannerText: 'Ayo ngobrol santai bareng teman baru!',
      bannerImage: '',
      bannerAccent: '#F9A24A',
      zoomUrl: 'https://zoom.us/j/123456789',
    },
  }
}

// ===== Ikon per modul (mapping ke komponen ikon) =====

export const MODULE_ICONS = [
  'headphones',
  'book',
  'pencil',
  'mic',
  'camera',
  'radio',
  'heart',
  'video',
  'users',
  'bell',
  'calendar',
  'clock',
] as const

export type ModuleIconKey = (typeof MODULE_ICONS)[number]