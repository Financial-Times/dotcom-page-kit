import { APP_CONTEXT_ELEMENT_ID } from '../constants'

export function loadDataFromScriptEmbed() {
  const elem = document.getElementById(APP_CONTEXT_ELEMENT_ID)

  if (elem) {
    try {
      return Object.freeze(JSON.parse(elem.innerHTML))
    } catch (error) {
      console.error('App context error:', error) // eslint-disable-line no-console
    }
  }
}
