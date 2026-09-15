export default function SectionHead({ tag, title, children }: { tag: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="section-head">
      <div className="section-tag">{tag}</div>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  )
}