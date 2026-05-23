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
          left-2
          top-2
          z-10
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          bg-black/10
          text-sm
          font-semibold
          text-white
          backdrop-blur-md
        "
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <img
        src={amp.image}
        alt={amp.name}
        className="h-40 w-full object-cover"
        
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">

            <h2 className="truncate text-2xl font-semibold text-white">
              {preset.name}
            </h2>

            <p className="mt-1 truncate text-zinc-400">
              {amp.brand} — {amp.name}
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

          <div className="flex flex-col gap-2">

            <button
              onClick={e => {
                e.preventDefault()
                moveUp()
              }}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-zinc-800
                bg-zinc-900
                text-sm
                text-zinc-400
                transition-all
                hover:border-zinc-600
                hover:text-white
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
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-zinc-800
                bg-zinc-900
                text-sm
                text-zinc-400
                transition-all
                hover:border-zinc-600
                hover:text-white
              "
            >
              ↓
            </button>

          </div>

        </div>
      </div>

    </Link>
  )
}