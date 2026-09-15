export default function Blobs() {
  return (
    <>
      <div
        className="blob"
        aria-hidden="true"
        style={{ width: 220, height: 220, background: 'var(--secondary)', top: 60, left: -60 }}
      />
      <div
        className="blob"
        aria-hidden="true"
        style={{
          width: 160,
          height: 160,
          background: 'var(--gold)',
          top: 120,
          right: '4%',
          animationDelay: '1.5s',
        }}
      />
      <div
        className="blob"
        aria-hidden="true"
        style={{
          width: 120,
          height: 120,
          background: 'var(--orange)',
          top: 520,
          left: '6%',
          animationDelay: '3s',
        }}
      />
    </>
  )
}