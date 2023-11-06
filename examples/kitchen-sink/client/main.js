import readyState from 'ready-state'
import * as flags from '@financial-times/dotcom-ui-flags/src/client'
import * as layout from '@financial-times/dotcom-ui-layout'
import { init as initAppContent } from '@financial-times/dotcom-ui-app-context/src/client/browser'
import { displayAds, getAdsData, adsUtils } from '@financial-times/ads-display'
import * as dataEmbed from '@financial-times/dotcom-ui-data-embed'
import * as tracking from '@financial-times/n-tracking'

import { DATA_EMBED_ID } from '../constants.js'

readyState.domready.then(async () => {
  const flagsClient = flags.init()
  const appContextClient = initAppContent()
  const dataEmbedClient = dataEmbed.init({ id: DATA_EMBED_ID })

  console.log('Shared data', dataEmbedClient.getAll()) // eslint-disable-line no-console

  layout.init()

  tracking.init({ appContext: appContextClient.getAll() })

  if (flagsClient.get('ads')) {
    /**
     * Make context-specific adjustments here
     * e.g. checking whether an article is being previewed:
     * sandbox: /\/preview/.test(location.pathname);
     */
    const rootId = adsUtils.getRootID()
    const displayAdsOptions = {
      sandbox: true, // in this demo context, always sandbox ads
      appName: appContextClient.get('appName'),
      abTestState: appContextClient.get('abTestState'),
      rootId,
      disableMonitoring: false,
      lazyLoadMargins: {
        760: '15%',
        980: '5%'
      },
      waitForMoat: true
    }

    if (flagsClient.get('moatAdsTraffic')) {
      displayAds.validateTraffic?.()
    }

    // Fetch the ads data
    try {
      const adsData = await getAdsData({
        user: true,
        page: {
          type: 'article',
          id: appContextClient.get('contentId')
        }
      })
      displayAds.init(
        {
          ...displayAdsOptions,
          targeting: adsData.metadata,
          adUnit: adsData.adUnit,
          smartmatch: flagsClient.get('adsEnableSmartmatchInTargeting') && adsData.smartmatch
        },
        flagsClient
      )

      if (flagsClient.get('AdsPermutive')) {
        adsUtils.enablePermutiveFtCom({
          metadata: adsData.metadata,
          type: appContextClient.get('appName'),
          rootId
        })
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(
        'There was an error fetching the ads data. Loading basic permutive and ads without targeting or ad unit',
        err
      )

      displayAds.init(displayAdsOptions, flagsClient)
      adsUtils.enablePermutiveFtCom({
        type: appContextClient.get('appName'),
        rootId
      })
    }
  }
})
