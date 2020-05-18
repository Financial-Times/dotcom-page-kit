/* eslint-disable no-console */
// Call the ambient-light-sensor api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const ambientLightSensor = async () => {
  if (window.AmbientLightSensor) {
    try {
      const ambientLightSensor = new AmbientLightSensor({frequency: 10})
      await ambientLightSensor.start()
      console.log('ambient-light-sensor api permission-granted')
    } catch {
      console.log('ambient-light-sensor api permission denied')
    }
  } else {
    console.log('ambient-light-sensor api not found in navigator')
  }
}
