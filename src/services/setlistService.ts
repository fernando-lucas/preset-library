import { db } from '../database/db'

import type { Setlist } from '../types/setlist'

export async function getSetlists() {
  const setlists = await db.setlists.toArray()

  let updated = false

  const normalizedSetlists = setlists.map(
    (setlist, index) => {
      if (setlist.order === undefined) {
        updated = true

        return {
          ...setlist,
          order: index,
        }
      }

      return setlist
    }
  )

  if (updated) {
    await db.setlists.bulkPut(
      normalizedSetlists
    )
  }

  return normalizedSetlists.sort(
    (a, b) => a.order - b.order
  )
}

export async function createSetlist(
  setlist: Setlist
) {
  return await db.setlists.add(setlist)
}

export async function getSetlistById(
  id: string
) {
  return await db.setlists.get(id)
}

export async function updateSetlist(
  setlist: Setlist
) {
  return await db.setlists.put(setlist)
}

export async function deleteSetlist(
  id: string
) {
  return await db.transaction(
    'rw',
    db.setlists,
    db.presets,
    async () => {
      await db.presets
        .where('setlistId')
        .equals(id)
        .delete()

      await db.setlists.delete(id)
    }
  )
}

export async function swapSetlistOrder(
  setlistA: Setlist,
  setlistB: Setlist
) {
  const tempOrder = setlistA.order

  await db.setlists.bulkPut([
    {
      ...setlistA,
      order: setlistB.order,
    },
    {
      ...setlistB,
      order: tempOrder,
    },
  ])
}

export async function getPresetCountsBySetlist() {
  const presets =
    await db.presets.toArray()

  return presets.reduce<Record<string, number>>(
    (counts, preset) => ({
      ...counts,
      [preset.setlistId]:
        (counts[preset.setlistId] ?? 0) + 1,
    }),
    {}
  )
}
