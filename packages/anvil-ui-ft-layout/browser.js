import * as footer from '@financial-times/anvil-ui-ft-footer/browser'
import * as header from '@financial-times/anvil-ui-ft-header/browser'
import oTypography from 'o-typography'
// Polyfill for :focus-visible https://github.com/WICG/focus-visible
import 'focus-visible'

export function init({ headerOptions = {}, footerOptions = {} } = {}) {
  const rootElement = document.querySelector('.n-layout')
  oTypography.init(rootElement)
  header.init(headerOptions)
  footer.init(footerOptions)
}
