import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createSetlist } from '../services/setlistService'

export function NewSetlistPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')

  const [description, setDescription] =
    useState('')

  async function handleCreateSetlist(
    e: React.FormEvent
  ) {
    e.preventDefault()

    await createSetlist({
      id: crypto.randomUUID(),
      name,
      description,
    })

    navigate('/setlists')
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">

      <div className="mx-auto max-w-2xl">

        <h1 className="text-3xl font-bold">
          Nova Setlist
        </h1>

        <form
          onSubmit={handleCreateSetlist}
          className="mt-8 space-y-6"
        >

          <div>
            <label className="text-sm text-zinc-400">
              Nome
            </label>

            <input
              type="text"
              value={name}
              onChange={e =>
                setName(e.target.value)
              }
              className="
                mt-2
                w-full
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                px-5
                py-4
                text-white
                outline-none
              "
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">
              Descrição
            </label>

            <textarea
              value={description}
              onChange={e =>
                setDescription(
                  e.target.value
                )
              }
              className="
                mt-2
                h-40
                w-full
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                px-5
                py-4
                text-white
                outline-none
              "
            />
          </div>

          <button
            type="submit"
            className="
              rounded-2xl
              bg-white
              px-6
              py-4
              font-medium
              text-black
              transition
              hover:opacity-80
            "
          >
            Criar Setlist
          </button>

        </form>

      </div>

    </div>
  )
}