import readyState from 'ready-state'
import * as layout from '@financial-times/dotcom-ui-layout'
import {
  addDNSLinkToFooter,
  adaptPrivacyLinkToLegislation
} from '@financial-times/dotcom-privacy-footer-localiser'

readyState.domready.then(() => {
  layout.init()

  addDNSLinkToFooter()
  adaptPrivacyLinkToLegislation()
})
