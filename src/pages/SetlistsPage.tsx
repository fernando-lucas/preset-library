import { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import {
  getSetlists,
  deleteSetlist,
  createSetlist,
  swapSetlistOrder,
  getPresetCountsBySetlist,
} from '../services/setlistService'

import type { Setlist } from '../types/setlist'

import {
  getActiveSetlist,
  setActiveSetlist
} from '../lib/activeSetlist'
import { createId } from '../lib/createId'


export function SetlistsPage() {
  const [setlists, setSetlists] = useState<
    Setlist[]
  >([])

  const [presetCounts, setPresetCounts] =
    useState<Record<string, number>>({})

  async function loadSetlists() {
    const [
      data,
      counts,
    ] = await Promise.all([
      getSetlists(),
      getPresetCountsBySetlist(),
    ])

    setSetlists(data)
    setPresetCounts(counts)
  }

  useEffect(() => {
    async function loadData() {
      await loadSetlists()
    }

    loadData()
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

    const active =
      getActiveSetlist()

    if (updated.length === 0) {
      const newSetlist = {
        id: createId(),

        name: 'My Presets',

        description:
          'Default preset collection',

        order: 0,
      }

      await createSetlist(newSetlist)

      setActiveSetlist(
        newSetlist.id
      )

      setSetlists([newSetlist])
      setPresetCounts({})
    }

    else if (active === id) {
      setActiveSetlist(
        updated[0].id
      )

      setSetlists(updated)
      setPresetCounts(
        await getPresetCountsBySetlist()
      )
    }

    else {
      setSetlists(updated)
      setPresetCounts(
        await getPresetCountsBySetlist()
      )
    }

    navigate('/')
  }

  async function moveSetlistUp(
    index: number
  ) {
    if (index === 0) return

    await swapSetlistOrder(
      setlists[index],
      setlists[index - 1]
    )

    await loadSetlists()
  }

  async function moveSetlistDown(
    index: number
  ) {
    if (index === setlists.length - 1) return

    await swapSetlistOrder(
      setlists[index],
      setlists[index + 1]
    )

    await loadSetlists()
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">

      <div className="mx-auto max-w-5xl">

        <div
          className="
            sticky
            top-0
            z-20
            -mx-6
            border-b
            border-zinc-800
            bg-zinc-950/95
            px-6
            pt-0
            pb-4
            backdrop-blur-xl
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="break-words text-3xl font-bold tracking-tight">
                Setlists
              </h1>

              <p className="mt-1 text-sm text-zinc-500">
                Crie setlists para seus presets
              </p>
            </div>

            <Link
              to="/new-setlist"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white
                text-4xl
                font-light
                text-black
                shadow-lg
                transition-all
                duration-200
                hover:scale-105
              "
            >
              +
            </Link>

          </div>
        </div>

        <div className="mt-10 grid gap-6">

          {setlists.map((setlist, index) => (
            <div
                key={setlist.id}
                className="
                relative
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

              <button
                onClick={() => {
                  setActiveSetlist(setlist.id)

                  navigate('/')
                }}
                className="block w-full pr-12 text-left"
              >
                <h2 className="text-2xl font-semibold">
                {setlist.name}
                </h2>

                <p className="mt-3 text-zinc-400">
                {setlist.description}
                </p>

                <p className="mt-4 text-sm text-zinc-500">
                  {presetCounts[setlist.id] ?? 0}{' '}
                  {(presetCounts[setlist.id] ?? 0) === 1
                    ? 'preset'
                    : 'presets'}
                </p>
              </button>

              <div className="absolute bottom-5 right-5 flex flex-col gap-2">

                <button
                  onClick={() => {
                    moveSetlistUp(index)
                  }}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-zinc-800
                    bg-zinc-900
                    text-sm
                    text-zinc-400
                    transition-all
                    hover:border-zinc-600
                    hover:text-white
                  "
                >
                  ↑
                </button>

                <button
                  onClick={() => {
                    moveSetlistDown(index)
                  }}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-zinc-800
                    bg-zinc-900
                    text-sm
                    text-zinc-400
                    transition-all
                    hover:border-zinc-600
                    hover:text-white
                  "
                >
                  ↓
                </button>

              </div>
                
                <div className="mt-6 flex flex-wrap gap-3">

                <Link
                  to={`/setlists/${setlist.id}/edit`}
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
                  onClick={() => {
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

            </div>

            
            ))}

        </div>

      </div>

    </div>
  )
}
