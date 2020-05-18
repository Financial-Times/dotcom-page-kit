/* eslint-disable no-console */
// Call the gyroscope api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const gyroscope = async() => {
  if (window.Gyroscope) {
    try {
      const gyroscope = new Gyroscope({frequency: 10})
      await gyroscope.start()
      console.log('gyroscope api permission granted')
    } catch {
      console.log('gyroscope api permission denied')
    }
  } else {
    console.log('gyroscope api not found in navigator')
  }
}
