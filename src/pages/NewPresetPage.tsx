import { useNavigate } from 'react-router-dom'

import { PresetForm } from '../components/PresetForm'

import { createPreset } from '../services/presetService'

import { getActiveSetlist } from '../lib/activeSetlist'
import { createId } from '../lib/createId'
import { getSetlists } from '../services/setlistService'

export function NewPresetPage() {
  const navigate = useNavigate()

  async function handleCreatePreset(data: {
    name: string
    ampId: string
    description: string
    tags: string[]
  }) {
    const activeSetlistId = getActiveSetlist()
    const fallbackSetlistId =
      (await getSetlists())[0]?.id

    await createPreset({
      id: createId(),
      name: data.name,
      ampId: data.ampId,
      description: data.description,
      setlistId:
        activeSetlistId ??
        fallbackSetlistId ??
        'default',
      tags: data.tags,
      order: Date.now(),
    })

    navigate('/')
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-6 text-white">
      <h1 className="mb-8 text-3xl font-bold">
        Novo Preset
      </h1>

      <PresetForm onSubmit={handleCreatePreset} />
    </div>
  )
}
