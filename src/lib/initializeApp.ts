import { db } from '../database/db'

import {
  setActiveSetlist,
  getActiveSetlist,
} from './activeSetlist'

export async function initializeApp() {
  const setlists =
    await db.setlists.toArray()

  if (setlists.length === 0) {
    const defaultSetlist = {
      id: crypto.randomUUID(),

      name: 'My Presets',

      description:
        'Default preset collection',
    }

    await db.setlists.add(
      defaultSetlist
    )

    setActiveSetlist(
      defaultSetlist.id
    )

    return
  }

  const activeSetlist =
    getActiveSetlist()

  if (!activeSetlist) {
    setActiveSetlist(
      setlists[0].id
    )
  }
}