import { db } from '../database/db'

import type { Setlist } from '../types/setlist'

export async function getSetlists() {
  return await db.setlists.toArray()
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
  return await db.setlists.delete(id)
}