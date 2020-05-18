/* eslint-disable no-console */
// Call the speaker api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const speaker = async() => {
  if (window.AudioContext) {
    try {
      const audioContext = new AudioContext
      const speaker = audioContext.createOscillator()
      console.log(speaker)
      await speaker.start()
      console.log('speaker api permission granted')
    } catch (error) {
      console.log(error)
      console.log('speaker api permission denied')
    }
  } else {
    console.log('speaker api not found in navigator')
  }
}
