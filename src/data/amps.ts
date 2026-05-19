import type { Amp } from '../types/amp'

import twoRockImg from '../assets/amps/no_image.jpg'
import evh5150Img from '../assets/amps/no_image.jpg'
import marshallJCM800Img from '../assets/amps/no_image.jpg'
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
    name: 'JCM 800',
    brand: 'Marshall',
    image: marshallJCM800Img,
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
]