import Dexie, { type Table } from 'dexie'

import type { Preset } from '../types/preset'

export class PresetLibraryDatabase extends Dexie {
  presets!: Table<Preset>

  constructor() {
    super('PresetLibraryDatabase')

    this.version(1).stores({
      presets: 'id, name, ampId',
    })
  }
}

export const db = new PresetLibraryDatabase()