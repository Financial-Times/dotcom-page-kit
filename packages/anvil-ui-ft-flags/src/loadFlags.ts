import { TFlagsData } from './types'

export default function loadFlags(): TFlagsData {
  const flagsConfigEl = document.getElementById('flags-data')

  if (flagsConfigEl) {
    try {
      return JSON.parse(flagsConfigEl.innerHTML)
    } catch (error) {
      console.error('Flags configuration error', error) // eslint-disable-line no-console
    }
  }

  return {}
}
