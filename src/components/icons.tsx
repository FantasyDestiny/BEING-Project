type IconProps = {
  size?: number
  color?: string
  strokeWidth?: number
  fill?: string
  stroke?: string
  className?: string
}

function base({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  fill = 'none',
  stroke = color,
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const A11yIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <circle cx="12" cy="4" r="2" />
      <path d="M19 8c-2.5 1-4.5 1.4-7 1.4S7.5 9 5 8" />
      <path d="M12 9.4V13l-3 8" />
      <path d="M12 13l3 8" />
      <path d="M9 13h6" />
    </>
  ) })

export const BookIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ) })

export const MicIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <path d="M12 19v4" />
      <path d="M8 23h8" />
    </>
  ) })

export const UsersIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ) })

export const CheckIcon = (p: IconProps) =>
  base({ ...p, children: <path d="M20 6L9 17l-5-5" /> })

export const ArrowRightIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>
  ) })

export const ArrowLeftIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </>
  ) })

export const CloseIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </>
  ) })

export const TextIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M4 7V4h16v3" />
      <path d="M9 20h6" />
      <path d="M12 4v16" />
    </>
  ) })

export const ContrastIcon = (p: IconProps) =>
  base({ ...p, children: <circle cx="12" cy="12" r="9" /> })

export const ContrastHalfIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" stroke="none" />
    </>
  ) })

export const BookTextIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M4 19V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13" />
      <path d="M4 19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
      <path d="M4 19h16" />
    </>
  ) })

export const ReduceMotionIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5V3" />
      <path d="M12 21v-2" />
      <path d="M5 12H3" />
      <path d="M21 12h-2" />
    </>
  ) })

export const CursorIcon = (p: IconProps) =>
  base({ ...p, children: <path d="M4 4l7 17 2.5-7L20 11z" /> })

export const UnderlineIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h10" />
    </>
  ) })

export const HeadphonesIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </>
  ) })

export const PencilIcon = (p: IconProps) =>
  base({ ...p, children: (
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
  ) })

export const RadioIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M9 18V5l12-2v13" />
      <path d="M9 9l12-2" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ) })

export const PlayIcon = (p: IconProps) =>
  base({ ...p, fill: 'currentColor', stroke: 'none', children: <path d="M8 5v14l11-7z" /> })

export const BellIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </>
  ) })

export const RefreshIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
      <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </>
  ) })

export const CameraMicIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M12 3v4" />
      <path d="M8 12h8" />
    </>
  ) })

export const HeartIcon = (p: IconProps) =>
  base({ ...p, children: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  ) })

export const ClockIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ) })

export const ShieldCheckIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </>
  ) })

export const UserAddIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    </>
  ) })

export const CalendarIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </>
  ) })

export const VideoIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="M16 10l6-4v12l-6-4" />
    </>
  ) })

export const ArrowDownIcon = (p: IconProps) =>
  base({ ...p, children: (
    <>
      <path d="M12 5v14" />
      <path d="M6 13l6 6 6-6" />
    </>
  ) })