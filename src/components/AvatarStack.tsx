export default function AvatarStack({ letters }: { letters: string[] }) {
  return (
    <div className="avatar-stack" aria-hidden="true">
      {letters.map((letter, i) => (
        <span key={i}>{letter}</span>
      ))}
    </div>
  )
}