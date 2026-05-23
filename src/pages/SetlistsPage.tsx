import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { getSetlists } from '../services/setlistService'

import type { Setlist } from '../types/setlist'

import { useNavigate } from 'react-router-dom'

import {
  setActiveSetlist,
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

            </button>
            ))}

        </div>

      </div>

    </div>
  )
}