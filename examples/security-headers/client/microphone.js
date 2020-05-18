/* eslint-disable no-console */
// Call the microphone api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const microphone = async () => {
  if ('mediaDevices' in navigator) {
    navigator.mediaDevices.getUserMedia({audio: true})
    .then(stream => console.log('microphone api permission-granted'))
    .catch(error => console.log('microphone api permission denied'))
  } else {
    console.log('microphone api not found in navigator')
  }
}
