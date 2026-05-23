import { useEffect, useState } from 'react'

import type { Preset } from '../types/preset'
import type { Amp } from '../types/amp'
import { Link } from 'react-router-dom'
import { swapPresetOrder } from '../services/presetService'
import { getAmpById } from '../services/ampService'

interface Props {
  preset: Preset
  displayIndex: number
  orderIndex: number
  presets: Preset[]
  onReorder: () => void
}


export function PresetCard({
  preset,
  displayIndex,
  orderIndex,
  presets,
  onReorder,
}: Props) {
  const [amp, setAmp] =
    useState<Amp | null>(null)

  useEffect(() => {
    async function loadAmp() {
      const data = await getAmpById(
        preset.ampId
      )

      setAmp(data ?? null)
    }

    loadAmp()
  }, [preset.ampId])

  if (!amp) return null

  async function moveUp() {
    if (orderIndex <= 0) return

    await swapPresetOrder(
      preset,
      presets[orderIndex - 1]
    )

    onReorder()
  }

  async function moveDown() {
    if (orderIndex === presets.length - 1) return

    await swapPresetOrder(
      preset,
      presets[orderIndex + 1]
    )

    onReorder()
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-800
        transition
        hover:border-zinc-500
      "
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
        {String(displayIndex + 1).padStart(2, '0')}
      </div>

      <Link
        to={`/preset/${preset.id}`}
        className="block"
      >
        <img
          src={amp.image}
          alt={amp.name}
          className="h-40 w-full object-cover"
        />

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">

            <div className="min-w-0 pr-12">

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

          </div>
        </div>
      </Link>

      <div className="absolute bottom-5 right-5 flex flex-col gap-2">

        <button
          onClick={moveUp}
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
          onClick={moveDown}
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
  )
}
