import { TAppContext } from '../types'
import { APP_CONTEXT_ELEMENT_ID } from '../../constants'

export default function loadEmbeddedAppContextData(): TAppContext {
  const elem = document.getElementById(APP_CONTEXT_ELEMENT_ID)

  if (elem) {
    try {
      return Object.freeze(JSON.parse(elem.innerHTML))
    } catch (error) {
      console.error('App context error:', error) // eslint-disable-line no-console
    }
  }
}
