import { PresetCard } from '../components/PresetCard'
import { getPresets } from '../services/presetService'
import { useEffect, useState } from 'react'
import type { Preset } from '../types/preset'
import { Link } from 'react-router-dom'


export function HomePage() {
  const [search, setSearch] = useState('')
  const [presets, setPresets] = useState<Preset[]>([])
  useEffect(() => {
    async function loadPresets() {
      const data = await getPresets()

      setPresets(data)
    }

    loadPresets()
  }, [])
  const filteredPresets = presets.filter(preset =>
    preset.name.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-4xl font-bold">
        PresetLibrary
      </h1>

      <p className="mt-2 text-zinc-400">
        Biblioteca de presets de guitarra
      </p>
    
    <div className="mt-6">
        <Link
            to="/new-preset"
            className="
            inline-flex
            items-center
            rounded-xl
            bg-white
            px-5
            py-3
            font-medium
            text-black
            transition
            hover:opacity-80
            "
            >
            + Novo Preset
        </Link>
    </div>

    <div className="mt-6">
        <input
            type="text"
            placeholder="Buscar preset..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            px-4
            py-3
            text-white
            outline-none
            transition
            focus:border-zinc-500
            "
        />
      </div>

      <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredPresets.map(preset => (
          <PresetCard
            key={preset.id}
            preset={preset}
          />
        ))}
      </div>
    </div>
  )
}