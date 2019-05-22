import * as footer from '@financial-times/anvil-ui-ft-footer/browser'
import * as header from '@financial-times/anvil-ui-ft-header/browser'
import oTypography from 'o-typography'

export function init({ headerOptions = {}, footerOptions = {} } = {}) {
  oTypography.init()
  header.init(headerOptions)
  footer.init(footerOptions)
}
