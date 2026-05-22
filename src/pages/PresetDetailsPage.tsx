import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import { amps } from '../data/amps'

import { useEffect, useState } from 'react'
import type { Preset } from '../types/preset'
import { getPresets } from '../services/presetService'
import { deletePreset } from '../services/presetService'

export function PresetDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [preset, setPreset] = useState<Preset | null>(null)

  useEffect(() => {
    async function loadPreset() {
      const presets = await getPresets()

      const foundPreset =
        presets.find(p => p.id === id) || null

      setPreset(foundPreset)
    }

    loadPreset()
  }, [id])

  if (!preset) {
    return (
      <div className="p-6 text-white">
        Preset não encontrado
      </div>
    )
  }

  const amp = amps.find(a => a.id === preset.ampId)

  if (!amp) {
    return (
      <div className="p-6 text-white">
        Amp não encontrado
      </div>
    )
  }

  async function handleDeletePreset() {
    const confirmed = confirm(
      'Deseja realmente deletar este preset?'
    )

    if (!confirmed) {
      return
    }

    await deletePreset(preset.id)

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

      <div className="mt-10">
        <h2 className="text-2xl font-semibold">
          Sobre o amplificador
        </h2>

        <p className="mt-3 text-zinc-400">
          {amp.description}
        </p>
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