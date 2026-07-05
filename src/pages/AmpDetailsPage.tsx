import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import { getPresets } from '../services/presetService'
import {
  deleteAmp,
  getAmpById,
} from '../services/ampService'

import { useEffect, useState } from 'react'

import type { Preset } from '../types/preset'
import type { Amp } from '../types/amp'

export function AmpDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

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

  const currentAmp = amp

  async function handleDeleteAmp() {
    const hasRelatedPresets =
      relatedPresets.length > 0

    const confirmed = confirm(
      hasRelatedPresets
        ? `Este amp está sendo usado por ${relatedPresets.length} preset${relatedPresets.length > 1 ? 's' : ''}. Deseja realmente deletá-lo?`
        : 'Deseja realmente deletar este amp?'
    )

    if (!confirmed) {
      return
    }

    await deleteAmp(currentAmp.id)

    navigate('/amps')
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
        src={currentAmp.image}
        alt={currentAmp.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-6">
        <h1 className="text-4xl font-bold">
          {currentAmp.name}
        </h1>

        <p className="mt-2 text-zinc-400">
          {currentAmp.brand}
        </p>

        <p className="mt-6 text-zinc-300">
          {currentAmp.description}
        </p>

        <div className="mt-8">
          <div className="flex flex-wrap gap-4">
            <Link
              to={`/amp/${currentAmp.id}/edit`}
              className="
                inline-flex
                items-center
                rounded-xl
                bg-white
                px-5
                py-3
                font-medium
                text-black
                transition
                hover:opacity-80
              "
            >
              Editar Amp
            </Link>

            <button
              onClick={handleDeleteAmp}
              className="
                rounded-xl
                border
                border-red-500
                px-5
                py-3
                font-medium
                text-red-400
                transition
                hover:bg-red-500/10
              "
            >
              Deletar Amp
            </button>
          </div>
        </div>

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
