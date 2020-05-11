import readyState from 'ready-state'
import { geolocation } from '../client/geolocation'
import { fullscreen } from '../client/fullscreen'
import { wakeLock } from '../client/wake-lock'

readyState.domready.then(() => {
  geolocation(), fullscreen(), wakeLock()
})
