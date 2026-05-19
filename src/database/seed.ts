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
      tags: ['fusion', 'lead'],
    },

    {
      id: crypto.randomUUID(),
      name: 'Metal Rhythm',
      ampId: '2',
      description: 'Base pesada moderna',
      tags: ['metal'],
    },
  ])
}