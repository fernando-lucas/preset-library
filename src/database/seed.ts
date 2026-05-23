import { db } from './db'

export async function seedDatabase() {
  const count = await db.presets.count()

  if (count > 0) {
    return
  }

  await db.presets.bulkAdd([
    {
      id: crypto.randomUUID(),
      name: 'Fusion Lead',
      ampId: '1',
      description: 'Lead fusion moderno',
      setlistId: '', // This will be set to the default setlist in initializeApp
      tags: ['fusion', 'lead'],
      order: 0
    },

    {
      id: crypto.randomUUID(),
      name: 'Metal Rhythm',
      ampId: '2',
      setlistId: '', // This will be set to the default setlist in initializeApp
      description: 'Base pesada moderna',
      tags: ['metal'],
      order: 1
    },
  ])
}