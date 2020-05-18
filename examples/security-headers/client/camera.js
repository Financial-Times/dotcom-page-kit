/* eslint-disable no-console */
// Call the camera api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const camera = async () => {
  if ('mediaDevices' in navigator) {
    navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => console.log('camera api permission-granted'))
    .catch(error => console.log('camera api permission denied'))
  } else {
    console.log('camera api not found in navigator')
  }
}
