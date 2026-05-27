import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import { useEffect, useState } from 'react'
import type { Preset } from '../types/preset'
import type { Amp } from '../types/amp'
import { getPresets } from '../services/presetService'
import { deletePreset } from '../services/presetService'
import { getAmpById } from '../services/ampService'

export function PresetDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [preset, setPreset] = useState<Preset | null>(null)
  const [amp, setAmp] = useState<Amp | null>(null)

  useEffect(() => {
    async function loadData() {
      const presets = await getPresets()

      const foundPreset =
        presets.find(p => p.id === id) || null

      setPreset(foundPreset)

      if (!foundPreset) {
        setAmp(null)

        return
      }

      const ampData =
        await getAmpById(foundPreset.ampId)

      setAmp(ampData ?? null)
    }

    loadData()
  }, [id])

  if (!preset) {
    return (
      <div className="p-6 text-white">
        Preset não encontrado
      </div>
    )
  }

  if (!amp) {
    return (
      <div className="p-6 text-white">
        Amp não encontrado
      </div>
    )
  }

  const presetId = preset.id

  async function handleDeletePreset() {
    const confirmed = confirm(
      'Deseja realmente deletar este preset?'
    )

    if (!confirmed) {
      return
    }

    await deletePreset(presetId)

    navigate('/')
  }


return (
    <div className="min-h-screen bg-zinc-900 text-white">
        <div className="p-4">
            <Link
                to="/"
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
        {preset.name}
      </h1>

      <p className="mt-2 text-zinc-400">
        {amp.brand} — {amp.name}
      </p>

      <p className="mt-6 text-zinc-300">
        {preset.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {preset.tags.map(tag => (
          <span
            key={tag}
            className="rounded-md bg-zinc-800 px-3 py-1 text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>
    
    <div className="mt-8 flex gap-4">
      <Link
        to={`/preset/${preset.id}/edit`}
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
        Editar Preset
      </Link>

      <button
        onClick={handleDeletePreset}
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
        Deletar Preset
      </button>

    </div>

    </div>
  </div>
)
}
