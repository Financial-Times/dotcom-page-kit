export function geolocation() {
  /* eslint-disable no-console */
  // Call the geolocation api
  // If the feature policy works the call will be blocked
  // Logs will be visible in the browser console
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => console.log('geolocation api permission granted', position.coords),
      (error) => console.log(error.code == 1 ? 'geolocation api permission denied' : 'other')
    )
  } else {
    console.log('api not found in navigator')
  }
}
