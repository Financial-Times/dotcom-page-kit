import readyState from 'ready-state'
import * as flags from '@financial-times/dotcom-ui-flags'
import * as layout from '@financial-times/dotcom-ui-layout'
import * as appContext from '@financial-times/dotcom-ui-app-context'
import * as tracking from '@financial-times/n-tracking'
import * as ads from '@financial-times/n-ads'
import { loadClientEmbed } from '@financial-times/dotcom-ui-client-embed'

readyState.domready.then(() => {
  const flagsClient = flags.init()
  const appContextClient = appContext.init()

  const customContext = loadClientEmbed('custom-context')
  console.log({ customContext }) // eslint-disable-line no-console

  layout.init()

  tracking.init({ appContext: appContextClient.getAll() })

  ads
    .init(
      {
        trackingCallback: console.log, // eslint-disable-line no-console,
        appContext: appContextClient.getAll()
      },
      flagsClient
    )
    .then(() => {
      // Ads slots are ready and will request ads
    })
})
