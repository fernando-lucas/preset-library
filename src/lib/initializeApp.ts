import { db } from '../database/db'
import { seedDatabase } from '../database/seed'

import {
  setActiveSetlist,
  getActiveSetlist,
} from './activeSetlist'
import { createId } from './createId'

export async function initializeApp() {

  await seedDatabase()

  const setlists =
    await db.setlists.toArray()

  if (setlists.length === 0) {
    const defaultSetlist = {
      id: createId(),

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
