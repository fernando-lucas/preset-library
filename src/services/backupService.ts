import { db } from '../database/db'

import {
  clearActiveSetlist,
  getActiveSetlist,
  setActiveSetlist,
} from '../lib/activeSetlist'

import type { Amp } from '../types/amp'
import type { Preset } from '../types/preset'
import type { Setlist } from '../types/setlist'

const BACKUP_VERSION = 1

interface BackupData {
  presets: Preset[]
  amps: Amp[]
  setlists: Setlist[]
  activeSetlistId: string | null
}

export interface LibraryBackup {
  version: number
  exportedAt: string
  data: BackupData
}

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null
  )
}

function validateBackup(
  value: unknown
): LibraryBackup {
  if (!isRecord(value)) {
    throw new Error('Arquivo de backup inválido.')
  }

  if (value.version !== BACKUP_VERSION) {
    throw new Error(
      `Versão de backup não suportada: ${String(value.version)}.`
    )
  }

  if (
    typeof value.exportedAt !== 'string' ||
    !isRecord(value.data)
  ) {
    throw new Error('Estrutura de backup inválida.')
  }

  const {
    presets,
    amps,
    setlists,
    activeSetlistId,
  } = value.data

  if (
    !Array.isArray(presets) ||
    !Array.isArray(amps) ||
    !Array.isArray(setlists) ||
    !(
      activeSetlistId === null ||
      typeof activeSetlistId === 'string'
    )
  ) {
    throw new Error('Dados de backup incompletos.')
  }

  return value as unknown as LibraryBackup
}

export async function createLibraryBackup(): Promise<LibraryBackup> {
  const [
    presets,
    amps,
    setlists,
  ] = await Promise.all([
    db.presets.toArray(),
    db.amps.toArray(),
    db.setlists.toArray(),
  ])

  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      presets,
      amps,
      setlists,
      activeSetlistId:
        getActiveSetlist(),
    },
  }
}

export async function exportLibraryBackup() {
  const backup =
    await createLibraryBackup()

  const json = JSON.stringify(
    backup,
    null,
    2
  )

  const blob = new Blob(
    [json],
    {
      type: 'application/json',
    }
  )

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const date = backup.exportedAt.slice(0, 10)

  link.href = url
  link.download = `preset-library-backup-${date}.json`
  link.click()

  URL.revokeObjectURL(url)
}

export async function importLibraryBackup(
  file: File
) {
  const content =
    await file.text()

  const backup =
    validateBackup(JSON.parse(content))

  await db.transaction(
    'rw',
    db.presets,
    db.amps,
    db.setlists,
    async () => {
      await Promise.all([
        db.presets.clear(),
        db.amps.clear(),
        db.setlists.clear(),
      ])

      await Promise.all([
        db.presets.bulkPut(
          backup.data.presets
        ),
        db.amps.bulkPut(
          backup.data.amps
        ),
        db.setlists.bulkPut(
          backup.data.setlists
        ),
      ])
    }
  )

  const activeSetlistExists =
    backup.data.setlists.some(
      setlist =>
        setlist.id ===
        backup.data.activeSetlistId
    )

  const fallbackSetlistId =
    backup.data.setlists[0]?.id

  if (
    backup.data.activeSetlistId &&
    activeSetlistExists
  ) {
    setActiveSetlist(
      backup.data.activeSetlistId
    )
  } else if (fallbackSetlistId) {
    setActiveSetlist(
      fallbackSetlistId
    )
  } else {
    clearActiveSetlist()
  }
}
