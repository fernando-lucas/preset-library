import { Link, useParams } from 'react-router-dom'

import { getPresets } from '../services/presetService'
import { getAmpById } from '../services/ampService'

import { useEffect, useState } from 'react'

import type { Preset } from '../types/preset'
import type { Amp } from '../types/amp'

export function AmpDetailsPage() {
  const { id } = useParams()

  const [amp, setAmp] =
    useState<Amp | null>(null)

  const [relatedPresets, setRelatedPresets] =
    useState<Preset[]>([])

  useEffect(() => {
    async function loadData() {
      if (!id) return

      const ampData =
        await getAmpById(id)

      setAmp(ampData ?? null)

      const presets = await getPresets()

      const filtered = presets.filter(
        preset => preset.ampId === id
      )

      setRelatedPresets(filtered)
    }

    loadData()
  }, [id])

  if (!amp) {
    return (
      <div className="p-6 text-white">
        Amp não encontrado
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="p-4">
        <Link
          to="/amps"
          className="
            inline-flex
            items-center
            rounded-lg
            bg-zinc-800
            px-4
            py-2
            text-sm
            text-zinc-300
            transition
            hover:bg-zinc-700
          "
        >
          ← Voltar
        </Link>
      </div>

      <img
        src={amp.image}
        alt={amp.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-6">
        <h1 className="text-4xl font-bold">
          {amp.name}
        </h1>

        <p className="mt-2 text-zinc-400">
          {amp.brand}
        </p>

        <p className="mt-6 text-zinc-300">
          {amp.description}
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">
            Presets usando este amp
          </h2>

          <div className="mt-4 space-y-3">
            {relatedPresets.map(preset => (
              <Link
                key={preset.id}
                to={`/preset/${preset.id}`}
                className="
                  block
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-800
                  p-4
                  transition
                  hover:border-zinc-500
                "
              >
                <h3 className="text-lg font-medium">
                  {preset.name}
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  {preset.description}
                </p>
              </Link>
            ))}

            {relatedPresets.length === 0 && (
              <p className="text-zinc-500">
                Nenhum preset encontrado
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
