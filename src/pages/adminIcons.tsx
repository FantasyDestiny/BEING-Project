export const PlusIcon = (p: { size?: number; color?: string }) =>
  _svg(p, <path d="M12 5v14M5 12h14" />)

export const TrashIcon = (p: { size?: number; color?: string }) =>
  _svg(
    p,
    <>
      <path d="M3 6h18" />
      <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </>,
  )

export const FileIcon = (p: { size?: number; color?: string }) =>
  _svg(
    p,
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </>,
  )

export const ShuffleIcon = (p: { size?: number; color?: string }) =>
  _svg(
    p,
    <>
      <path d="M16 3h5v5" />
      <path d="M4 20L21 3" />
      <path d="M21 16v5h-5" />
      <path d="M15 15l6 6" />
      <path d="M4 4l5 5" />
    </>,
  )

function _svg(p: { size?: number; color?: string }, children: React.ReactNode) {
  return (
    <svg
      width={p.size ?? 20}
      height={p.size ?? 20}
      viewBox="0 0 24 24"
      fill="none"
      stroke={p.color ?? 'currentColor'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}