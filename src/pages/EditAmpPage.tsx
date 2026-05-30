import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import { AmpForm } from '../components/AmpForm'
import {
  getAmpById,
  updateAmp,
} from '../services/ampService'

import type { Amp } from '../types/amp'

export function EditAmpPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [amp, setAmp] =
    useState<Amp | null>(null)

  useEffect(() => {
    async function loadAmp() {
      if (!id) return

      const data = await getAmpById(id)

      setAmp(data ?? null)
    }

    loadAmp()
  }, [id])

  if (!amp) {
    return (
      <div className="p-6 text-white">
        Amp não encontrado
      </div>
    )
  }

  async function handleUpdateAmp(data: {
    name: string
    brand: string
    image: string
    description: string
  }) {
    if (!amp) return

    await updateAmp({
      ...amp,
      ...data,
    })

    navigate(`/amp/${amp.id}`)
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">
          Editar Amp
        </h1>

        <AmpForm
          initialData={amp}
          onSubmit={handleUpdateAmp}
        />
      </div>
    </div>
  )
}
