import domLoaded from 'dom-loaded'
import * as realUserMonitoring from '@financial-times/dotcom-ui-real-user-monitoring'
import * as flags from '@financial-times/dotcom-ui-flags'
import * as layout from '@financial-times/dotcom-ui-layout'
import * as appContext from '@financial-times/dotcom-ui-app-context'
import * as tracking from '@financial-times/n-tracking'
import * as ads from '@financial-times/n-ads'

domLoaded.then(() => {
  const flagsClient = flags.init()
  const appContextClient = appContext.init()

  // TODO: Figure out a solution better than "try/catch" to the "Random error halts all following JS execution" problem
  try { realUserMonitoring.init() } catch (error) { console.error(error) }
  try { layout.init() } catch (error) { console.error(error) }
  try { tracking.init({ appContext: appContextClient.getAll() }) } catch (error) { console.error(error) }

  ads
    .init(
      {
        trackingCallback: console.log // eslint-disable-line no-console
      },
      flagsClient
    )
    .then(() => {
      // Ads slots are ready and will request ads
    })
    .catch(error => console.error(error))
})
