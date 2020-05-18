/* eslint-disable no-console */
// Call the midi api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const midi = async () => {
  if ('requestMIDIAccess' in navigator) {
    navigator.requestMIDIAccess()
    .then(access => console.log('midi api permission-granted'))
    .catch(error => console.log('midi api permission denied'))
  } else {
    console.log('midi api not found in navigator')
  }
}
