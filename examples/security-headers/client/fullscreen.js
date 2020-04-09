/* eslint-disable no-console */
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
