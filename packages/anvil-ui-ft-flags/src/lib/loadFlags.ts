import { TFlagsData } from '../types'

export default function loadFlags(): TFlagsData {
  const flagsConfigEl = document.getElementById('anvil-flags-data')

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
