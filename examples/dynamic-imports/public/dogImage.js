export function addDogImageToDOM() {
  const imageElement = document.createElement('img')

  const dogImageUrl = 'https://images.dog.ceo/breeds/bulldog-french/n02108915_7115.jpg'

  imageElement.setAttribute('src', dogImageUrl)
  imageElement.setAttribute('data-component', 'image')

  document.querySelector('main').appendChild(imageElement)
}
