import domLoaded from 'dom-loaded'
// import tracking from '@financial-times/n-tracking'
import * as flags from '@financial-times/anvil-ui-ft-flags'
import * as layout from '@financial-times/anvil-ui-ft-layout'

domLoaded.then(() => {
  const flagsClient = flags.init()

  layout.init()
})
