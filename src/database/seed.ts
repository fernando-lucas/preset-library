import { db } from './db'

import noImg from '../assets/amps/no_image.jpg'

export async function seedDatabase() {
  const ampCount =
  await db.amps.count()

  if (ampCount === 0) {
    await db.amps.bulkAdd([
      {
        id: '1',
        name: 'Studio Signature',
        brand: 'Two Rock',
        image: noImg,
        description: 'Amp boutique limpo e fusion moderno',
      },
      {
        id: '2',
        name: '5150 III',
        brand: 'EVH',
        image: noImg,
        description: 'High gain moderno para metal',
      },
      {
        id: '3',
        name: 'JCM 800',
        brand: 'Marshall',
        image: noImg,
        description: 'High gain moderno para metal',
      },
      {
        id: '4',
        name: 'Deluxe Reverb 65',
        brand: 'Fender',
        image: noImg,
        description: 'Amp Classico limpo e vintage',
      },
      {
        id: '5',
        name: 'AC30',
        brand: 'Vox',
        image: noImg,
        description: 'Amp Classico limpo e vintage',
      },
      {
        id: '6',
        name: 'Outro',
        brand: 'Outro',
        image: noImg,
        description: 'N/A',
      },
    ]
    )
  } else {
    const amps = await db.amps.toArray()

    await db.amps.bulkPut(
      amps.map(amp => ({
        ...amp,
        image: noImg,
      }))
    )
  }

  const presetCount =
    await db.presets.count()

  if (presetCount > 0) {
    return
  }

  let defaultSetlist =
    await db.setlists
      .where('name')
      .equals('My Presets')
      .first()

  if (!defaultSetlist) {
    const id = crypto.randomUUID()

    defaultSetlist = {
      id,
      name: 'My Presets',
      description:
        'Default preset collection',
    }

    await db.setlists.add(
      defaultSetlist
    )
  }
  

  await db.presets.bulkAdd([
    {
      id: crypto.randomUUID(),

      name: 'Fusion Lead',

      ampId: '1',

      description:
        'Lead fusion moderno',

      setlistId:
        defaultSetlist.id,

      tags: [
        'fusion',
        'lead',
      ],

      order: 0,
    },

    {
      id: crypto.randomUUID(),

      name: 'Metal Rhythm',

      ampId: '2',

      description:
        'Base pesada moderna',

      setlistId:
        defaultSetlist.id,

      tags: ['metal'],

      order: 1,
    },
  ])
}
