/* eslint-disable no-console */
// Call the fullscreen api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const fullscreen = async () => {
  if (!document.fullscreenElement) {
    try {
      await document.documentElement.requestFullscreen()
      console.log('fullscreen api permission-granted')
    } catch {
      console.log('fullscreen api permission denied')
    }
  }
}
