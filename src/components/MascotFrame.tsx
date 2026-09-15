export default function MascotFrame({
  pops,
  children,
}: {
  pops: { text: string; style?: React.CSSProperties }[]
  children: React.ReactNode
}) {
  return (
    <div className="mascot-card">
      {pops.map((pop, i) => (
        <div key={i} className="speech-pop" style={pop.style}>
          {pop.text}
        </div>
      ))}
      {children}
    </div>
  )
}