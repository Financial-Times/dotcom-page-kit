import domLoaded from 'dom-loaded'
// import tracking from '@financial-times/n-tracking'
import * as flags from '@financial-times/anvil-ui-ft-flags'
import * as layout from '@financial-times/anvil-ui-ft-layout'
import * as appContext from '@financial-times/anvil-ft-app-context'
import { init as initAds } from '@financial-times/n-ads'

domLoaded.then(() => {
  const flagsClient = flags.init()
  const appContextClient = appContext.init()

  layout.init()

  initAds(
    {
      trackingCallback: console.log // eslint-disable-line no-console
    },
    flagsClient
  ).then(() => {
    // Ads slots are ready and will request ads
  })
})
