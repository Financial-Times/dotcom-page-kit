document.getElementById('button').onclick = async function handleClick() {
  const dogImageModule = await import('./dogImage.js')

  dogImageModule.addDogImageToDOM()
}
