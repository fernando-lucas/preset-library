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

  const orderedPresets = [...presets]
    .sort((a, b) => a.order - b.order)

  const filteredPresets = orderedPresets
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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-6">

        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="break-words text-3xl font-bold tracking-tight">
              {activeSetlistName || 'My Presets'}
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Sua coleção de presets
            </p>
          </div>

          <Link
            to="/new-preset"
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

        {/* SEARCH */}

        <div
          className="
            sticky
            top-0
            z-20
            -mx-5
            mt-8
            border-b
            border-zinc-800
            bg-zinc-950/95
            px-5
            pb-4
            pt-0
            backdrop-blur-xl
          "
        >
          <div className="space-y-4">
            <div>
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
                  py-3
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
                flex
                gap-3
                overflow-x-auto
                pb-2
                whitespace-nowrap
                hide-scrollbar
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
          </div>
        </div>

        {/* PRESETS */}

        <div
          className="
            mt-6
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
              displayIndex={index}
              orderIndex={orderedPresets.findIndex(
                item => item.id === preset.id
              )}
              presets={orderedPresets}
              onReorder={async () => {
                await loadPresets()
              }}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
