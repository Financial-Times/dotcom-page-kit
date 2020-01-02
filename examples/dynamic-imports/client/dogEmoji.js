export function addDogEmojiToDOM() {
  const divElement = document.createElement('div')

  divElement.setAttribute('data-component', 'dog-emoji')
  divElement.innerHTML = '🐶'

  document.querySelector('main').appendChild(divElement)
}
