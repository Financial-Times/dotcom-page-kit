import readyState from 'ready-state'
import { geolocation } from '../../security-headers/client/geolocation.js'
import { fullscreen } from '../../security-headers/client/fullscreen.js'

readyState.domready.then(() => {
  geolocation(), fullscreen()
})
