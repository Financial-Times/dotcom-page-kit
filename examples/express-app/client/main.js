import GetDogPictures from './get-dog-pictures'

const breeds = [
  'airedale',
  'corgi-cardigan',
  'cotondetulear',
  'kelpie',
  'leonberg',
  'otterhound',
  'pembroke',
  'samoyed',
  'schnauzer-miniature',
  'sheepdog-shetland',
  'shiba',
  'terrier-fox',
  'terrier-lakeland',
  'terrier-norfolk',
  'terrier-wheaten'
]

const getDogPictures = new GetDogPictures({ breeds })

getDogPictures.andPutThemIn(document.querySelector('#dogs'))
