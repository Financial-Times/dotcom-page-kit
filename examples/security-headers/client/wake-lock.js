/* eslint-disable no-console */
// Call the wake-lock api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export function wakeLock() {
  if ('wake-lock' in navigator) {
    navigator.wake -
      lock.getCurrentPosition(
        (position) => console.log('wake-lock api permission granted', position.coords),
        (error) => console.log(error.code == 1 ? 'wake-lock api permission denied' : 'other')
      )
  } else {
    console.log('api not found in navigator')
  }
}
