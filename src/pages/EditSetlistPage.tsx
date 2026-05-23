import { useEffect, useState } from 'react'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import {
  getSetlistById,
  updateSetlist,
} from '../services/setlistService'

export function EditSetlistPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [name, setName] = useState('')

  const [description, setDescription] =
    useState('')

  useEffect(() => {
    async function loadSetlist() {
      if (!id) return

      const setlist =
        await getSetlistById(id)

      if (!setlist) return

      setName(setlist.name)

      setDescription(
        setlist.description
      )
    }

    loadSetlist()
  }, [id])

  async function handleSave(
    e: React.FormEvent
  ) {
    e.preventDefault()

    if (!id) return

    await updateSetlist({
      id,
      name,
      description,
    })

    navigate('/setlists')
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">

      <div className="mx-auto max-w-2xl">

        <h1 className="text-3xl font-bold">
          Editar Setlist
        </h1>

        <form
          onSubmit={handleSave}
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
            "
          >
            Salvar
          </button>

        </form>

      </div>

    </div>
  )
}