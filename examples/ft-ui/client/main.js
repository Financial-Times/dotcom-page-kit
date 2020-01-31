import readyState from 'ready-state'
import * as layout from '@financial-times/dotcom-ui-layout'

readyState.domready.then(() => {
  layout.init()
})
