import { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { getSetlists, deleteSetlist, createSetlist } from '../services/setlistService'

import type { Setlist } from '../types/setlist'

import {
  getActiveSetlist,
  setActiveSetlist
} from '../lib/activeSetlist'


export function SetlistsPage() {
  const [setlists, setSetlists] = useState<
    Setlist[]
  >([])

  useEffect(() => {
    async function loadSetlists() {
      const data = await getSetlists()

      setSetlists(data)
    }

    loadSetlists()
  }, [])

  const navigate = useNavigate()

  async function handleDeleteSetlist(
    id: string
  ) {
    const confirmed = confirm(
      'Delete this setlist?'
    )

    if (!confirmed) return

    await deleteSetlist(id)

    const updated =
      await getSetlists()

    setSetlists(updated)

    const active =
      getActiveSetlist()

    if (updated.length === 0) {
      const newSetlist = {
        id: crypto.randomUUID(),

        name: 'My Presets',

        description:
          'Default preset collection',
      }

      await createSetlist(newSetlist)

      setActiveSetlist(
        newSetlist.id
      )
    }

    else if (active === id) {
      setActiveSetlist(
        updated[0].id
      )
    }

    navigate('/')
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">

      <div className="mx-auto max-w-5xl">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Setlists
            </h1>

            <p className="mt-1 text-zinc-500">
              Organize seus presets
            </p>
          </div>

          <Link
            to="/new-setlist"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-white
              text-3xl
              text-black
            "
          >
            +
          </Link>

        </div>

        <div className="mt-10 grid gap-6">

            {setlists.map(setlist => (
            <button
                key={setlist.id}
                onClick={() => {
                setActiveSetlist(setlist.id)

                navigate('/')
                }}
                className="
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-900
                p-6
                text-left
                transition-all
                hover:border-zinc-700
                "
            >

                <h2 className="text-2xl font-semibold">
                {setlist.name}
                </h2>

                <p className="mt-3 text-zinc-400">
                {setlist.description}
                </p>
                
                <div className="mt-6 flex gap-3">

                <Link
                  to={`/setlists/${setlist.id}/edit`}
                  onClick={e => e.stopPropagation()}
                  className="
                    rounded-xl
                    border
                    border-zinc-800
                    px-4
                    py-2
                    text-sm
                    text-zinc-300
                    transition
                    hover:border-zinc-700
                  "
                >
                  Editar
                </Link>

                <button
                  onClick={e => {
                    e.stopPropagation()

                    handleDeleteSetlist(
                      setlist.id
                    )
                  }}
                  className="
                    rounded-xl
                    border
                    border-red-500
                    px-4
                    py-2
                    text-sm
                    text-red-400
                    transition
                    hover:bg-red-500/10
                  "
                >
                  Deletar
                </button>

              </div>

            </button>

            
            ))}

        </div>

      </div>

    </div>
  )
}