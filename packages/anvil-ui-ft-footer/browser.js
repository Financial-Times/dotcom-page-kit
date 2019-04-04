import Footer from 'o-footer'

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
}

export { Footer as OrigamiFooter }
