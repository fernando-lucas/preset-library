import { db } from '../database/db'

import type { Amp } from '../types/amp'

export async function getAmps() {
  const amps = await db.amps.toArray()

  return amps.sort((a, b) =>
    `${a.name} ${a.brand}`.localeCompare(
      `${b.name} ${b.brand}`,
      'pt-BR',
      {
        sensitivity: 'base',
      }
    )
  )
}

export async function getAmpById(
  id: string
) {
  return await db.amps.get(id)
}

export async function createAmp(
  amp: Amp
) {
  return await db.amps.add(amp)
}

export async function updateAmp(
  amp: Amp
) {
  return await db.amps.put(amp)
}

export async function deleteAmp(
  id: string
) {
  await db.amps.delete(id)
}
