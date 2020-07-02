import readyState from 'ready-state'
import * as layout from '@financial-times/dotcom-ui-layout'
import {
  addDNSLinkToFooter,
  adaptPrivacyLinkToLegislation
} from '@financial-times/dotcom-privacy-footer-localiser'

readyState.domready.then(() => {
  layout.init()

  // These methods won't perform any changes to the footer unless the user is
  // deemed to be in California.
  // See this example's README for details on how to fake that.
  addDNSLinkToFooter()
  adaptPrivacyLinkToLegislation()
})
