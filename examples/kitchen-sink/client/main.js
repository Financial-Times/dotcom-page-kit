import domLoaded from 'dom-loaded'
// import tracking from '@financial-times/n-tracking'
import * as flags from '@financial-times/anvil-ui-ft-flags'
import * as layout from '@financial-times/anvil-ui-ft-layout'
import * as appContext from '@financial-times/anvil-ft-app-context'

domLoaded.then(() => {
  const flagsClient = flags.init()
  const appContextClient = appContext.init()

  layout.init()
})
