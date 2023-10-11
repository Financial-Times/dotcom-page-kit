import Footer from '@financial-times/o-footer'
import * as flags from '@financial-times/dotcom-ui-flags'
import { updateFooterLinkCMP } from '@financial-times/privacy-utils'

const flagsClient = flags.init()


/**
 * @typedef FooterOptions
 * @property { HTMLElement } [rootElement] - the root element passed to o-footer
 */

/**
 * Initialise the header
 * @param { FooterOptions } footerOptions
 */
export const init = (footerOptions = {}) => {
  Footer.init(footerOptions.rootElement)

  if (flagsClient.get('adsDisableInternalCMP')) {
    updateFooterLinkCMP();
   }
}

export { Footer as OrigamiFooter }