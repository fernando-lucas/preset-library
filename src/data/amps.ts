import type { Amp } from '../types/amp'

import twoRockImg from '../assets/amps/no_image.jpg'
import evh5150Img from '../assets/amps/no_image.jpg'
import marshallJCM800Img from '../assets/amps/no_image.jpg'
import testeImg from '../assets/amps/no_image.jpg'
import noImg from '../assets/amps/no_image.jpg'

export const amps: Amp[] = [
  {
    id: '1',
    name: 'Studio Signature',
    brand: 'Two Rock',
    image: twoRockImg,
    description: 'Amp boutique limpo e fusion moderno',
  },
  {
    id: '2',
    name: '5150 III',
    brand: 'EVH',
    image: evh5150Img,
    description: 'High gain moderno para metal',
  },
  {
    id: '3',
    name: 'Marshall JCM 800',
    brand: 'Marshall',
    image: marshallJCM800Img,
    description: 'High gain moderno para metal',
  },
  {
    id: '4',
    name: 'Teste',
    brand: 'Marshall',
    image: testeImg,
    description: 'High gain moderno para metal',
  },
  {
    id: '5',
    name: 'Teste 2',
    brand: 'Marshall',
    image: noImg,
    description: 'High gain moderno para metal',
  },
]