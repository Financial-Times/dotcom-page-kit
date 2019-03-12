import { TFlags } from './types'

export default function loadFlags(): TFlags {
  const flagsConfigEl = document.getElementById('flags-config')

  if (flagsConfigEl) {
    try {
      return JSON.parse(flagsConfigEl.innerHTML)
    } catch (error) {
      console.error('Flags configuration error', error) // eslint-disable-line no-console
    }
  }
}
