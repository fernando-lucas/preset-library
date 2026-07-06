import { useState } from 'react'

import { ampImages, defaultAmpImage } from '../data/ampImages'

import type { Amp } from '../types/amp'

interface AmpFormData {
  name: string
  brand: string
  image: string
  description: string
}

interface Props {
  initialData?: Amp
  onSubmit: (data: AmpFormData) => void
}

export function AmpForm({
  initialData,
  onSubmit,
}: Props) {
  const [name, setName] = useState(
    initialData?.name || ''
  )

  const [brand, setBrand] = useState(
    initialData?.brand || ''
  )

  const [description, setDescription] = useState(
    initialData?.description || ''
  )

  const [image, setImage] = useState(
    initialData?.image || defaultAmpImage
  )

  function handleSubmit() {
    if (!name.trim() || !brand.trim()) {
      alert('Preencha os campos obrigatórios')

      return
    }

    onSubmit({
      name: name.trim(),
      brand: brand.trim(),
      image,
      description: description.trim(),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Nome
        </label>

        <input
          type="text"
          value={name}
          onChange={event =>
            setName(event.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            px-4
            py-3
            text-white
            outline-none
            focus:border-zinc-500
          "
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Marca
        </label>

        <input
          type="text"
          value={brand}
          onChange={event =>
            setBrand(event.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            px-4
            py-3
            text-white
            outline-none
            focus:border-zinc-500
          "
        />
      </div>

      <div>
        <label className="mb-3 block text-sm text-zinc-400">
          Imagem para representar o Amp
        </label>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ampImages.map(option => {
            const selected =
              image === option.src

            return (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  setImage(option.src)
                }
                className={`
                  overflow-hidden
                  rounded-xl
                  border
                  bg-zinc-900
                  text-left
                  transition

                  ${
                    selected
                      ? 'border-white'
                      : 'border-zinc-800 hover:border-zinc-600'
                  }
                `}
              >
                <img
                  src={option.src}
                  alt={option.label}
                  className="h-24 w-full object-cover"
                />

                <span className="block truncate px-3 py-2 text-xs text-zinc-300">
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Descrição
        </label>

        <textarea
          value={description}
          onChange={event =>
            setDescription(event.target.value)
          }
          rows={5}
          className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800
            px-4
            py-3
            text-white
            outline-none
            focus:border-zinc-500
          "
        />
      </div>

      <button
        onClick={handleSubmit}
        className="
          rounded-xl
          bg-white
          px-6
          py-3
          font-medium
          text-black
          transition
          hover:opacity-80
        "
      >
        Salvar Amp
      </button>
    </div>
  )
}
