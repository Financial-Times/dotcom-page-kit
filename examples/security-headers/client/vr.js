/* eslint-disable no-console */
// Call the vr api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const vr = async () => {
  if ('getVRDisplays' in navigator) {
    navigator.getVRDisplays()
    .then(displays => console.log('vr api permission-granted'))
    .catch(error => console.log('vr api permission denied'))
  } else {
    console.log('vr api not found in navigator')
  }
}
