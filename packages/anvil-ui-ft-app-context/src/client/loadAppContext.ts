import { TAppContext } from '../types'
import { APP_CONTEXT_ELEMENT_ID } from '../../constants'

export default function loadEmbeddedAppContext(): TAppContext {
  const elem = document.getElementById(APP_CONTEXT_ELEMENT_ID)

  let data = {}

  if (elem) {
    try {
      data = JSON.parse(elem.innerHTML)
    } catch (error) {
      console.error('Embedded app context could not be loaded:', error) // eslint-disable-line no-console
    }
  }

  return Object.freeze(data) as TAppContext
}
