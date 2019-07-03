import { TFlagsData } from '../types'
import { SCRIPT_ELEMENT_ID } from '../constants'

export default function loadFlags(): TFlagsData {
  const flagsConfigEl = document.getElementById(SCRIPT_ELEMENT_ID)

  let data = {}

  if (flagsConfigEl) {
    try {
      data = JSON.parse(flagsConfigEl.innerHTML)
    } catch (error) {
      console.error('Flags configuration error', error) // eslint-disable-line no-console
    }
  }

  return Object.freeze(data)
}
