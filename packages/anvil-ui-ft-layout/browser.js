import * as footer from '@financial-times/anvil-ui-ft-footer/browser'
import * as header from '@financial-times/anvil-ui-ft-header/browser'

export function init({ headerOptions = {}, footerOptions = {} } = {}) {
  header.init(headerOptions)
  footer.init(footerOptions)
}
