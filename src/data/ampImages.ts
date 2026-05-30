import evh5150Img from '../assets/amps/evh-5150-iii.png'
import deluxeReverb65V2Img from '../assets/amps/fender-65-deluxe-reverb-v2.png'
import deluxeReverb65Img from '../assets/amps/fender-65-deluxe-reverb.png'
import fenderDeluxeReverbImg from '../assets/amps/fender-deluxe-reverb.png'
import genericAmpImg from '../assets/amps/generic-amp.webp'
import jcm800StudioImg from '../assets/amps/marshall-jcm-800-studio.png'
import jcm800Img from '../assets/amps/marshall-jcm-800.png'
import twoRockImg from '../assets/amps/two-rock-studio-signature.png'
import voxAc30Img from '../assets/amps/vox-ac30.png'

export const ampImages = [
  {
    id: 'generic',
    label: 'Generic Amp',
    src: genericAmpImg,
  },
  {
    id: 'two-rock-studio-signature',
    label: 'Two Rock Studio Signature',
    src: twoRockImg,
  },
  {
    id: 'evh-5150-iii',
    label: 'EVH 5150 III',
    src: evh5150Img,
  },
  {
    id: 'marshall-jcm-800',
    label: 'Marshall JCM 800',
    src: jcm800Img,
  },
  {
    id: 'marshall-jcm-800-studio',
    label: 'Marshall JCM 800 Studio',
    src: jcm800StudioImg,
  },
  {
    id: 'fender-65-deluxe-reverb',
    label: 'Fender Deluxe Reverb 65',
    src: deluxeReverb65Img,
  },
  {
    id: 'fender-65-deluxe-reverb-v2',
    label: 'Fender Deluxe Reverb 65 V2',
    src: deluxeReverb65V2Img,
  },
  {
    id: 'fender-deluxe-reverb',
    label: 'Fender Deluxe Reverb',
    src: fenderDeluxeReverbImg,
  },
  {
    id: 'vox-ac30',
    label: 'Vox AC30',
    src: voxAc30Img,
  },
]

export const defaultAmpImage =
  ampImages[0].src
