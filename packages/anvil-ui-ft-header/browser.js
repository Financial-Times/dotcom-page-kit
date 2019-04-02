import Header from 'o-header'

/**
 * @typedef HeaderOptions
 * @property { HTMLElement } [rootElement] the root element passed to o-header
 */

/**
 * Initialise the header
 * @param { HeaderOptions } headerOptions
 */
export const init = (headerOptions = {}) => {
  Header.init(headerOptions.rootElement)
}

export { Header as OrigamiHeader }
