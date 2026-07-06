import { db } from './db'

import { ampImages, defaultAmpImage } from '../data/ampImages'
import { createId } from '../lib/createId'

const imageById = Object.fromEntries(
  ampImages.map(image => [
    image.id,
    image.src,
  ])
)

const seedAmps = [
  {
    id: '1',
    name: 'Studio Signature',
    brand: 'Two Rock',
    image:
      imageById['two-rock-studio-signature'] ??
      defaultAmpImage,
    description: 'Amp boutique limpo e fusion moderno',
  },
  {
    id: '2',
    name: '5150 III',
    brand: 'EVH',
    image:
      imageById['evh-5150-iii'] ??
      defaultAmpImage,
    description: 'High gain moderno para metal',
  },
  {
    id: '3',
    name: 'JCM 800',
    brand: 'Marshall',
    image:
      imageById['marshall-jcm-800'] ??
      defaultAmpImage,
    description: 'High gain moderno para metal',
  },
  {
    id: '4',
    name: 'Deluxe Reverb 65',
    brand: 'Fender',
    image:
      imageById['fender-65-deluxe-reverb'] ??
      defaultAmpImage,
    description: 'Amp Classico limpo e vintage',
  },
  {
    id: '5',
    name: 'AC30',
    brand: 'Vox',
    image:
      imageById['vox-ac30'] ??
      defaultAmpImage,
    description: 'Amp Classico limpo e vintage',
  },
  {
    id: '6',
    name: 'Generic Amp',
    brand: 'Generic',
    image: defaultAmpImage,
    description: 'Amp genérico para presets sem amp específico',
  },
  {
    id: '7',
    name: 'Deluxe Reverb 65',
    brand: 'Fender',
    image:
      imageById['fender-65-deluxe-reverb-v2'] ??
      defaultAmpImage,
    description: 'Amp Classico limpo e vintage',
  },
  {
    id: '8',
    name: 'JCM 800 Studio',
    brand: 'Marshall',
    image:
      imageById['marshall-jcm-800-studio'] ??
      defaultAmpImage,
    description: 'Amp classico para rock',
  },
]

export async function seedDatabase() {
  const existingAmps =
    await db.amps.toArray()

  if (existingAmps.length === 0) {
    await db.amps.bulkAdd(seedAmps)
  } else {
    const missingSeedAmps = seedAmps.filter(
      seedAmp =>
        !existingAmps.some(
          amp => amp.id === seedAmp.id
        )
    )

    if (missingSeedAmps.length > 0) {
      await db.amps.bulkPut(
        missingSeedAmps
      )
    }
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
    const id = createId()

    defaultSetlist = {
      id,
      name: 'My Presets',
      description:
        'Default preset collection',
      order: 0,
    }

    await db.setlists.add(
      defaultSetlist
    )
  }
  

  await db.presets.bulkAdd([
    {
      id: createId(),

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
      id: createId(),

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
