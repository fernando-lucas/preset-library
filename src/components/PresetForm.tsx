import { useEffect, useState } from 'react'

import type { Preset } from '../types/preset'
import type { Amp } from '../types/amp'

import { getAmps } from '../services/ampService'

interface Props {
  initialData?: Preset

  onSubmit: (data: {
    name: string
    ampId: string
    description: string
    tags: string[]
  }) => void
}

export function PresetForm({
  initialData,
  onSubmit,
}: Props) {
  const [name, setName] = useState(
    initialData?.name || ''
  )

  const [description, setDescription] = useState(
    initialData?.description || ''
  )

  const [tags, setTags] = useState(
    initialData?.tags.join(', ') || ''
  )

  const [selectedAmp, setSelectedAmp] = useState(
    initialData?.ampId || ''
  )

  const [amps, setAmps] =
    useState<Amp[]>([])

  useEffect(() => {
    async function loadAmps() {
      const data = await getAmps()

      setAmps(data)
    }

    loadAmps()
  }, [])

  function handleSubmit() {
    if (!name || !selectedAmp) {
      alert('Preencha os campos obrigatórios')

      return
    }

    onSubmit({
      name,
      ampId: selectedAmp,
      description,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Nome
        </label>

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            px-4
            py-3
            outline-none
            focus:border-zinc-500
          "
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Amplificador
        </label>

        <select
          value={selectedAmp}
          onChange={e => setSelectedAmp(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            px-4
            py-3
            outline-none
            focus:border-zinc-500
          "
        >
          <option value="">
            Selecione um amp
          </option>

          {amps.map(amp => (
            <option
              key={amp.id}
              value={amp.id}
            >
              {amp.brand} — {amp.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Descrição
        </label>

        <textarea
          value={description}
          onChange={e =>
            setDescription(e.target.value)
          }
          rows={5}
          className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            px-4
            py-3
            outline-none
            focus:border-zinc-500
          "
        />
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Tags
          </label>

          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="fusion, lead, ambient"
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-800
              px-4
              py-3
              outline-none
              focus:border-zinc-500
            "
          />

          <p className="mt-2 text-sm text-zinc-500">
            Separe as tags por vírgula
          </p>
        </div>

      </div>

      <button
        onClick={handleSubmit}
        className="
          rounded-xl
          bg-white
          px-6
          py-3
          font-medium
          text-black
          transition
          hover:opacity-80
        "
      >
        Salvar Preset
      </button>
    </div>
  )
}
