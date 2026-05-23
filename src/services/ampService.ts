import { db } from '../database/db'

import type { Amp } from '../types/amp'

export async function getAmps() {
  return await db.amps.toArray()
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
