import domLoaded from 'dom-loaded'
import * as flags from '@financial-times/dotcom-ui-flags'
import * as layout from '@financial-times/dotcom-ui-layout'
import * as appContext from '@financial-times/dotcom-ui-app-context'
import { init as initAds } from '@financial-times/n-ads'
import * as tracking from 'n-tracking'

domLoaded.then(() => {
  const flagsClient = flags.init()
  const appContextClient = appContext.init()

  layout.init()

  tracking.init({ appContext: appContextClient.context })

  initAds(
    {
      trackingCallback: console.log // eslint-disable-line no-console
    },
    flagsClient
  ).then(() => {
    // Ads slots are ready and will request ads
  })
})
