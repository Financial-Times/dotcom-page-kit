import domLoaded from 'dom-loaded'
import * as layout from '@financial-times/dotcom-ui-layout'

/**
 *
 * Load stylesheets asyncronously. See:
 * https://www.filamentgroup.com/lab/load-css-simpler/
 * https://w3c.github.io/preload/#example-5
 */
const asyncStylesheetsInit = () => {
  const asyncStylesheets = document.getElementsByClassName('asyncStylesheet')
  Array.from(asyncStylesheets).forEach((element) => {
    element.media = 'all'
  })
}

domLoaded.then(() => {
  asyncStylesheetsInit()
  layout.init()
})
