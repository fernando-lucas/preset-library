import { Link } from 'react-router-dom'

import { AmpCard } from '../components/AmpCard'

import { amps } from '../data/amps'

export function AmpsPage() {
  return (
    <div className="min-h-screen bg-zinc-900 p-6">
      <h1 className="text-4xl font-bold text-white">
        Biblioteca de Amps
      </h1>

      <p className="mt-2 text-zinc-400">
        Explore amplificadores usados nos presets
      </p>
      
      <div className="p-4">
        <Link
          to="/"
          className="
            inline-flex
            items-center
            rounded-lg
            bg-zinc-800
            px-4
            py-2
            text-sm
            text-zinc-300
            transition
            hover:bg-zinc-700
          "
        >
          ← Voltar
        </Link>
      </div>


      <div className="
        mt-8
        grid
        gap-6
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
      ">
        {amps.map(amp => (
          <AmpCard
            key={amp.id}
            amp={amp}
          />
        ))}
      </div>
    </div>
  )
}