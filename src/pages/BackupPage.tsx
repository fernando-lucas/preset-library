import { useRef, useState } from 'react'

import {
  exportLibraryBackup,
  importLibraryBackup,
} from '../services/backupService'

export function BackupPage() {
  const inputRef =
    useRef<HTMLInputElement | null>(null)

  const [status, setStatus] =
    useState('')

  async function handleExport() {
    try {
      await exportLibraryBackup()

      setStatus('Backup exportado com sucesso.')
    } catch {
      setStatus('Não foi possível exportar o backup.')
    }
  }

  async function handleImport(
    file: File | undefined
  ) {
    if (!file) return

    const confirmed = confirm(
      'Importar este backup vai substituir todos os dados atuais. Deseja continuar?'
    )

    if (!confirmed) {
      return
    }

    try {
      await importLibraryBackup(file)

      setStatus('Backup importado com sucesso.')
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível importar o backup.'

      setStatus(message)
    } finally {
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div className="min-h-[calc(100dvh-7rem)] bg-zinc-950 p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <div
          className="
            sticky
            top-0
            z-20
            -mx-6
            border-b
            border-zinc-800
            bg-zinc-950/95
            px-6
            pt-0
            pb-4
            backdrop-blur-xl
          "
        >
          <h1 className="text-3xl font-bold">
            Backup
          </h1>

          <p className="mt-2 text-zinc-500">
            Exporte e importe sua biblioteca local.
          </p>
        </div>

        <div className="mt-8 grid gap-6">
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">
              Exportar dados
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Gera um arquivo JSON com presets, amps, setlists e setlist ativa.
            </p>

            <button
              onClick={handleExport}
              className="
                mt-6
                rounded-xl
                bg-white
                px-5
                py-3
                font-medium
                text-black
                transition
                hover:opacity-80
              "
            >
              Exportar backup
            </button>
          </section>

          <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">
              Importar dados
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Substitui a biblioteca atual pelos dados de um backup JSON.
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="application/json,.json"
              onChange={event =>
                handleImport(
                  event.target.files?.[0]
                )
              }
              className="
                mt-6
                block
                w-full
                rounded-xl
                border
                border-zinc-800
                bg-zinc-950
                px-4
                py-3
                text-sm
                text-zinc-300
                file:mr-4
                file:rounded-lg
                file:border-0
                file:bg-white
                file:px-4
                file:py-2
                file:text-sm
                file:font-medium
                file:text-black
              "
            />
          </section>
        </div>

        {status && (
          <p className="mt-6 text-sm text-zinc-300">
            {status}
          </p>
        )}
      </div>
    </div>
  )
}
