import type { Preset } from '../types/preset'
import { amps } from '../data/amps'
import { Link } from 'react-router-dom'
import { swapPresetOrder } from '../services/presetService'

interface Props {
  preset: Preset
  index: number
  presets: Preset[]
  onReorder: () => void
}


export function PresetCard({ preset, index, presets, onReorder }: Props) {
  const amp = amps.find(a => a.id === preset.ampId)

  if (!amp) return null


  async function moveUp() {
    if (index === 0) return

    await swapPresetOrder(
      preset,
      presets[index - 1]
    )

    onReorder()
  }

  async function moveDown() {
    if (index === presets.length - 1) return

    await swapPresetOrder(
      preset,
      presets[index + 1]
    )

    onReorder()
  }

  return (
    <Link
      to={`/preset/${preset.id}`}
      className="relative overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 block transition hover:border-zinc-500"
    >

    <div
      className="
        absolute
        right-4
        top-4
        z-10
        flex
        flex-col
        gap-2
      "
    >
      <button
        onClick={e => {
          e.preventDefault()
          moveUp()
        }}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-black/70
          text-lg
          text-white
          backdrop-blur-md
          transition-all
          hover:scale-105
          hover:bg-black
        "
      >
        ↑
      </button>

      <button
        onClick={e => {
          e.preventDefault()
          moveDown()
        }}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-black/70
          text-lg
          text-white
          backdrop-blur-md
          transition-all
          hover:scale-105
          hover:bg-black
        "
      >
        ↓
      </button>
    </div>
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