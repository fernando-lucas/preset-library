import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import { PresetForm } from '../components/PresetForm'

import type { Preset } from '../types/preset'

import {
  getPresets,
  updatePreset,
} from '../services/presetService'

export function EditPresetPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [preset, setPreset] =
    useState<Preset | null>(null)

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
        Carregando...
      </div>
    )
  }

  async function handleUpdatePreset(data: {
    name: string
    ampId: string
    description: string
  }) {
    if (!preset) return
    await updatePreset({
      ...preset,
      name: data.name,
      ampId: data.ampId,
      description: data.description,
    })

    navigate(`/preset/${preset.id}`)
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-6 text-white">
      <h1 className="mb-8 text-3xl font-bold">
        Editar Preset
      </h1>

      <PresetForm
        initialData={preset}
        onSubmit={handleUpdatePreset}
      />
    </div>
  )
}