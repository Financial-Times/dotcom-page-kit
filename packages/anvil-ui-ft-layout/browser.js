import * as footer from '@financial-times/anvil-ui-ft-footer/browser'
import * as header from '@financial-times/anvil-ui-ft-header/browser'
import oTypography from 'o-typography'

const rootElement = document.querySelector('.n-layout')

// enhanceFonts removes the default o-typography--loading-* styles
// allowing the custom fonts Finacier and MetricWeb to be shown
const enhanceFonts = () => {
  if (/(^|\s)o-typography-fonts-loaded=1(;|$)/.test(document.cookie)) {
    const fontLabels = ['sans', 'sansBold', 'display', 'displayBold']
    fontLabels.map((fontLabel) => {
      rootElement.classList.remove('o-typography--loading-' + fontLabel)
    })
  }
}

export function init({ headerOptions = {}, footerOptions = {} } = {}) {
  oTypography.init(rootElement)
  header.init(headerOptions)
  footer.init(footerOptions)
  enhanceFonts()
}
