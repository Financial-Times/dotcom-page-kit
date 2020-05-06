import readyState from 'ready-state'
import * as flags from '@financial-times/dotcom-ui-flags'
import * as layout from '@financial-times/dotcom-ui-layout'
import * as appContext from '@financial-times/dotcom-ui-app-context'
import * as tracking from '@financial-times/n-tracking'
import * as ads from '@financial-times/n-ads'
import * as clientEmbed from '@financial-times/dotcom-ui-client-embed'

readyState.domready.then(() => {
  const flagsClient = flags.init()
  const appContextClient = appContext.init()

  const clientEmbedClient = clientEmbed.init('custom-context')
  console.log(clientEmbedClient.getAll()) // eslint-disable-line no-console

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
