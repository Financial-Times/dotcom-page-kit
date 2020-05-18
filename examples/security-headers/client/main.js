import readyState from 'ready-state'
// import { geolocation } from '../client/geolocation'
// import { fullscreen } from '../client/fullscreen'
// import { wakeLock } from '../client/wake-lock'
// import { usb } from '../client/usb'
// import { accelerometer } from '../client/accelerometer'
// import { ambientLightSensor } from '../client/ambient-light-sensor'
// import { camera } from '../client/camera'
// import { documentDomain } from '../client/document-domain'
// import { documentWrite } from '../client/document-write'
// import { gyroscope } from '../client/gyroscope'
// import { magnetometer } from '../client/magnetometer'
import { microphone } from '../client/microphone'
import { midi } from './midi'
import { payment } from './payment'
// import { speaker } from './speaker'
import { vr } from './vr'
import { syncXhr } from './sync-xhr'

readyState.domready.then(() => {
  // geolocation(),
  // fullscreen(),
  // wakeLock(),
  // usb(),
  // accelerometer(),
  // ambientLightSensor(),
  // camera(),
  // documentDomain(),
  // documentWrite()
  // gyroscope(),
  // magnetometer()
  microphone(),
  midi(),
  payment(),
  // speaker(),
  vr(),
  syncXhr()
})
