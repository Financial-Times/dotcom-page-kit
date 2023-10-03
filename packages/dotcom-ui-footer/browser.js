import Footer from '@financial-times/o-footer'
import * as flags from '@financial-times/dotcom-ui-flags'

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
    
   }
}

export { Footer as OrigamiFooter }
