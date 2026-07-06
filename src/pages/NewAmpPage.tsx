import { useNavigate } from 'react-router-dom'

import { AmpForm } from '../components/AmpForm'
import { createId } from '../lib/createId'
import { createAmp } from '../services/ampService'

export function NewAmpPage() {
  const navigate = useNavigate()

  async function handleCreateAmp(data: {
    name: string
    brand: string
    image: string
    description: string
  }) {
    const id = createId()

    await createAmp({
      id,
      ...data,
    })

    navigate(`/amp/${id}`)
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">
          Novo Amp
        </h1>

        <AmpForm onSubmit={handleCreateAmp} />
      </div>
    </div>
  )
}
