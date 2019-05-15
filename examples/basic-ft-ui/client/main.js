import tracking from '@financial-times/n-tracking'
import domLoaded from 'dom-loaded'
import * as layout from '@financial-times/anvil-ui-ft-layout'

domLoaded.then(() => {
  layout.init()
  tracking.init()
})
