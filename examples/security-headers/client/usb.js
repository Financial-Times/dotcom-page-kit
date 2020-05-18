/* eslint-disable no-console */
// Call the usb api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export function usb() {
  if ('usb' in navigator) {
    navigator.usb.getDevices()
      .then(devices => {
        console.log('usb api permission granted', devices.length)
      }).catch (error => {
        console.log('usb api permission denied')
      })
  } else {
    console.log('usb api not found in navigator')
  }
}
