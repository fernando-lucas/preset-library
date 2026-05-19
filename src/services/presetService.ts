import { db } from '../database/db'

import type { Preset } from '../types/preset'

export async function getPresets() {
  return await db.presets.toArray()
}

export async function createPreset(
  preset: Preset
) {
  await db.presets.add(preset)
}

export async function updatePreset(
  preset: Preset
) {
  await db.presets.put(preset)
}

export async function deletePreset(
  id: string
) {
  await db.presets.delete(id)
}