import domLoaded from 'dom-loaded'
import * as flags from '@financial-times/dotcom-ui-flags'
import * as layout from '@financial-times/dotcom-ui-layout'
import * as appContext from '@financial-times/dotcom-ui-app-context'
import * as tracking from '@financial-times/n-tracking'
import * as ads from '@financial-times/n-ads'

async function main() {
  await domLoaded
  const flagsClient = flags.init()
  const appContextClient = appContext.init()

  layout.init()

  tracking.init({ appContext: appContextClient.getAll() })

  await ads.init(
    {
      trackingCallback: console.log // eslint-disable-line no-console
    },
    flagsClient
  )
  // Ads slots are ready and will request ads
}

main()
