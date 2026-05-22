import { db } from '../database/db'

import type { Preset } from '../types/preset'

export async function getPresets() {
  const presets = await db.presets.toArray()

  let updated = false

  const normalizedPresets = presets.map(
    (preset, index) => {
      if (preset.order === undefined) {
        updated = true

        return {
          ...preset,
          order: index,
        }
      }

      return preset
    }
  )

  if (updated) {
    await db.presets.bulkPut(
      normalizedPresets
    )
  }

  return normalizedPresets
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

export async function swapPresetOrder(
  presetA: Preset,
  presetB: Preset
) {
  const tempOrder = presetA.order

  presetA.order = presetB.order
  presetB.order = tempOrder

  await db.presets.bulkPut([
    presetA,
    presetB,
  ])
}