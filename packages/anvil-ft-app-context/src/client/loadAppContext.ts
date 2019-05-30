import { TAppContext } from '../types'
import { APP_CONTEXT_ELEMENT_ID } from '../shared/constants'

export function loadAppContext(): TAppContext {
  return loadFromScriptEmbed() || loadFromDataAttributes()
}

function loadFromScriptEmbed() {
  const elem = document.getElementById(APP_CONTEXT_ELEMENT_ID)

  if (elem) {
    try {
      return Object.freeze(JSON.parse(elem.innerHTML))
    } catch (error) {
      console.error('App context error:', error) // eslint-disable-line no-console
    }
  }
}

function loadFromDataAttributes() {
  const elem = document.querySelector('[data-app-context]')

  if (elem) {
    return Object.freeze({
      app: elem.getAttribute('data-next-app'),
      edition: elem.getAttribute('data-next-edition'),
      product: elem.getAttribute('data-next-product'),
      abState: elem.getAttribute('data-ab-state'),
      version: elem.getAttribute('data-next-version'),
      contentId: elem.getAttribute('data-content-id'),
      contentType: elem.getAttribute('data-content-type'),
      isProduction: elem.hasAttribute('data-next-is-production'),
      publishReference: elem.getAttribute('data-publish-reference')
    })
  }
}
