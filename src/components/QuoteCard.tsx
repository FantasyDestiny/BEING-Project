export default function QuoteCard({
  initials,
  name,
  role,
  text,
  color,
}: {
  initials: string
  name: string
  role: string
  text: string
  color: string
}) {
  return (
    <div className="quote-card">
      <div className="stars" aria-hidden="true">
        ★★★★★
      </div>
      <p>{text}</p>
      <div className="quote-who">
        <div className="av" style={{ background: color }} aria-hidden="true">
          {initials}
        </div>
        <div>
          <b>{name}</b>
          <span>{role}</span>
        </div>
      </div>
    </div>
  )
}