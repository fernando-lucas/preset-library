import type { Preset } from '../types/preset'
import { amps } from '../data/amps'
import { Link } from 'react-router-dom'

interface Props {
  preset: Preset
}

export function PresetCard({ preset }: Props) {
  const amp = amps.find(a => a.id === preset.ampId)

  if (!amp) return null

  return (
    <Link
      to={`/preset/${preset.id}`}
      className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 block transition hover:border-zinc-500"
    >
      <img
        src={amp.image}
        alt={amp.name}
        className="h-40 w-full object-cover"
        
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold">
          {preset.name}
        </h2>

        <p className="mt-1 text-zinc-400">
          {amp.brand} — {amp.name}
        </p>

        <p className="mt-3 text-sm text-zinc-300">
          {preset.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {preset.tags.map(tag => (
            <span
              key={tag}
              className="rounded-md bg-zinc-700 px-2 py-1 text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}