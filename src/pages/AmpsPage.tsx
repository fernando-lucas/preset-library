import { useEffect, useState } from 'react'

import { AmpCard } from '../components/AmpCard'

import { getAmps } from '../services/ampService'

import type { Amp } from '../types/amp'

export function AmpsPage() {
  const [amps, setAmps] =
    useState<Amp[]>([])

  useEffect(() => {
    async function loadAmps() {
      const data = await getAmps()

      setAmps(data)
    }

    loadAmps()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-900 p-6">
      <h1 className="text-3xl font-bold text-white">
        Biblioteca de Amps
      </h1>

      <p className="mt-2 text-zinc-400">
        Explore amplificadores usados nos presets
      </p>
      
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
