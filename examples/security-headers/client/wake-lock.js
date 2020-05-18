/* eslint-disable no-console */
// Call the wake-lock api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export function wakeLock() {
  if ('getWakeLock' in navigator) {
    wakeLock.createRequest();
  } else {
    console.log('wake-lock api not found in navigator')
  }
}
