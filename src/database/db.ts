import Dexie, { type Table } from 'dexie'

import type { Preset } from '../types/preset'
import type { Amp } from '../types/amp'
import type { Setlist } from '../types/setlist'

export class PresetLibraryDatabase extends Dexie {
  
  presets!: Table<Preset>
  amps!: Table<Amp>
  setlists!: Table<Setlist>

  constructor() {
    super('PresetLibraryDatabase')

    this.version(2).stores({
      presets: 'id, name, ampId',
      amps: 'id, name, brand',
      setlists: 'id, name, description'
    })

    this.version(3).stores({
      presets: 'id, name, ampId, setlistId',
      amps: 'id, name, brand',
      setlists: 'id, name, description'
    })
  }
}

export const db = new PresetLibraryDatabase()
