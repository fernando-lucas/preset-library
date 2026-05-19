import { useState } from 'react'

import { amps } from '../data/amps'

import type { Preset } from '../types/preset'

interface Props {
  initialData?: Preset

  onSubmit: (data: {
    name: string
    ampId: string
    description: string
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

  const [selectedAmp, setSelectedAmp] = useState(
    initialData?.ampId || ''
  )

  function handleSubmit() {
    if (!name || !selectedAmp) {
      alert('Preencha os campos obrigatórios')

      return
    }

    onSubmit({
      name,
      ampId: selectedAmp,
      description,
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