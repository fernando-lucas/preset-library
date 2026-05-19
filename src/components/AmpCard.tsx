import { Link } from 'react-router-dom'

import type { Amp } from '../types/amp'

interface Props {
  amp: Amp
}

export function AmpCard({ amp }: Props) {
  return (
    <Link
      to={`/amp/${amp.id}`}
      className="
        overflow-hidden
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-800
        transition
        hover:border-zinc-500
      "
    >
      <img
        src={amp.image}
        alt={amp.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-white">
          {amp.name}
        </h2>

        <p className="mt-1 text-zinc-400">
          {amp.brand}
        </p>
      </div>
    </Link>
  )
}