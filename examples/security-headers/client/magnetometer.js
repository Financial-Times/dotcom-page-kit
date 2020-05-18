/* eslint-disable no-console */
// Call the magnetometer api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const magnetometer = async() => {
  if (window.Magnetometer) {
    try {
      const magnetometer = new Magnetometer({frequency: 10})
      await magnetometer.start()
      console.log('magnetometer api permission granted')
    } catch {
      console.log('magnetometer api permission denied')
    }
  } else {
    console.log('magnetometer api not found in navigator')
  }
}
