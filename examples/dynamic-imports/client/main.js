document.getElementById('button').onclick = async function handleClick() {
  const dogEmojiModule = await import('./dogEmoji.js')

  dogEmojiModule.addDogEmojiToDOM()
}
