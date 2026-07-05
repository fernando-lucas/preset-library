
import genericAmpImg from '../assets/amps/generic-amp.webp'
import deluxeReverb65Img from '../assets/amps/fender-65-deluxe-reverb.png'
import jcm800Img from '../assets/amps/marshall-jcm-800.png'
import voxAc30Img from '../assets/amps/vox-ac30.png'
import voxAc30Img2 from '../assets/amps/vox-ac30-2.png'
import twoRockStudioSignatureImg from '../assets/amps/two-rock-studio-signature.png'
import twoRockStudioSignatureImg2 from '../assets/amps/two-rock-studio-signature-2.png'
import evh5150Img from '../assets/amps/evh-5150-iii.png'


export const ampImages = [
  {
    id: 'generic',
    label: 'Generic Amp',
    src: genericAmpImg,
  },
  {
    id: 'fender-65-deluxe-reverb',
    label: 'Fender Deluxe Reverb 65',
    src: deluxeReverb65Img,
  },
  {
    id: 'marshall-jcm-800',
    label: 'Marshall JCM 800',
    src: jcm800Img,
  },
  {
    id: 'vox-ac30',
    label: 'Vox AC30',
    src: voxAc30Img,
  },
  {
    id: 'vox-ac30-2',
    label: 'Vox AC30 2',
    src: voxAc30Img2,
  },
  {
    id: 'two-rock-studio-signature',
    label: 'Two Rock Studio Signature',
    src: twoRockStudioSignatureImg,
  },
  {
    id: 'two-rock-studio-signature-2',
    label: 'Two Rock Studio Signature 2',
    src: twoRockStudioSignatureImg2,
  },
  {
    id: 'evh-5150-iii',
    label: 'EVH 5150 III',
    src: evh5150Img,
  }
]

export const defaultAmpImage =
  ampImages[0].src
