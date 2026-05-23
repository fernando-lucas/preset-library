import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { PresetCard } from '../components/PresetCard'

import { getPresets } from '../services/presetService'

import type { Preset } from '../types/preset'

import { getActiveSetlist, } from '../lib/activeSetlist'

import { getSetlistById, } from '../services/setlistService'


export function HomePage() {
  const [search, setSearch] = useState('')
  const [presets, setPresets] = useState<Preset[]>([])
    async function loadPresets() {
    const data = await getPresets()

    const activeSetlistId =
      getActiveSetlist()

    const filtered = data.filter(
      preset =>
        preset.setlistId ===
        activeSetlistId
    )

    setPresets(filtered)
  }
  const [selectedTag, setSelectedTag] = useState('')
  const [activeSetlistName, setActiveSetlistName] = useState('')

  useEffect(() => {
    async function loadData() {
      await loadPresets()

      const activeSetlistId =
        getActiveSetlist()

      if (activeSetlistId) {
        const setlist =
          await getSetlistById(
            activeSetlistId
          )

        if (setlist) {
          setActiveSetlistName(
            setlist.name
          )
        }
      }
    }

    loadData()
  }, [])

  const availableTags = Array.from(
    new Set(
      presets.flatMap(preset => preset.tags)
    )
  )

  const filteredPresets = presets
    .filter(preset => {
      const normalizedSearch =
        search.toLowerCase()

      const matchesSearch =
        preset.name
          .toLowerCase()
          .includes(normalizedSearch) ||

        preset.description
          .toLowerCase()
          .includes(normalizedSearch) ||

        preset.tags.some(tag =>
          tag
            .toLowerCase()
            .includes(normalizedSearch)
        )

      const matchesTag =
        !selectedTag ||
        preset.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })

    .sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-6">

        {/* HEADER */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {activeSetlistName || 'My Presets'}
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Guitar preset collection
            </p>
          </div>

          <Link
            to="/new-preset"
            className="
              flex
              h-10
              w-10
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
            <span className="-translate-y-[2px]"> + </span>
          
          </Link>
        </div>

        {/* SEARCH */}

        <div className="mt-8">
          <input
            type="text"
            placeholder="Search presets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="
              w-full
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              px-6
              py-4
              text-base
              text-white
              outline-none
              transition-all
              focus:border-zinc-600
            "
          />
        </div>

        {/* TAGS */}

        <div
          className="
            mt-6
            flex
            gap-3
            overflow-x-auto
            pb-2
          "
        >
          <button
            onClick={() => setSelectedTag('')}
            className={`
              whitespace-nowrap
              rounded-full
              border
              px-5
              py-2.5
              text-sm
              font-medium
              transition-all

              ${
                selectedTag === ''
                  ? `
                    border-white
                    bg-white
                    text-black
                  `
                  : `
                    border-zinc-800
                    bg-zinc-900
                    text-zinc-300
                  `
              }
            `}
          >
            All
          </button>

          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`
                whitespace-nowrap
                rounded-full
                border
                px-5
                py-2.5
                text-sm
                font-medium
                transition-all

                ${
                  selectedTag === tag
                    ? `
                      border-white
                      bg-white
                      text-black
                    `
                    : `
                      border-zinc-800
                      bg-zinc-900
                      text-zinc-300
                    `
                }
              `}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* PRESETS */}

        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-8
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {filteredPresets.map((preset, index) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              index={index}
              presets={filteredPresets}
              onReorder={async () => {
              const data = await getPresets()

              const activeSetlistId =
                getActiveSetlist()

              const filtered =
                data.filter(
                  preset =>
                    preset.setlistId ===
                    activeSetlistId
                )

              setPresets(filtered)
            }}
            />
          ))}
        </div>

      </div>
    </div>
  )
}