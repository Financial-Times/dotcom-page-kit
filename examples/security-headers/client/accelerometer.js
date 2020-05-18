/* eslint-disable no-console */
// Call the accelerometer api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const accelerometer = async() => {
  if (window.Accelerometer) {
    try {
      const accelerometer = new Accelerometer({frequency: 10})
      await accelerometer.start()
      console.log('accelerometer api permission granted')
    } catch {
      console.log('accelerometer api permission denied')
    }
  } else {
    console.log('accelerometer api not found in navigator')
  }
}
