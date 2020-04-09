import readyState from 'ready-state'
import * as layout from '@financial-times/dotcom-ui-layout'
import { geolocation } from '../../security-headers/client/geolocation.js'
import { fullscreen } from '../../security-headers/client/fullscreen.js'

readyState.domready.then(() => {
  layout.init(), geolocation(), fullscreen()
})
