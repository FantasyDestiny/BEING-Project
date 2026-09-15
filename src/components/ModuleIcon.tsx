import {
  BellIcon,
  BookIcon,
  CalendarIcon,
  CameraMicIcon,
  ClockIcon,
  HeadphonesIcon,
  HeartIcon,
  MicIcon,
  PencilIcon,
  RadioIcon,
  UsersIcon,
  VideoIcon,
} from './icons'

const map: Record<string, React.ElementType> = {
  headphones: HeadphonesIcon,
  book: BookIcon,
  pencil: PencilIcon,
  mic: MicIcon,
  camera: CameraMicIcon,
  radio: RadioIcon,
  heart: HeartIcon,
  video: VideoIcon,
  users: UsersIcon,
  bell: BellIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
}

export default function ModuleIcon({
  iconKey,
  size,
  color,
}: {
  iconKey: string
  size?: number
  color?: string
}) {
  const Cmp = map[iconKey] ?? BookIcon
  return <Cmp size={size ?? 24} color={color} />
}