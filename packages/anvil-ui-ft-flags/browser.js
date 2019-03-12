class Flags {
  constructor() {
    this.flags = loadFlags()
  }

  get(flag) {
    return this.flags ? this.flags[flag] : null
  }
}

function loadFlags() {
  const flagsConfigEl = document.getElementById('flags-config')

  if (flagsConfigEl) {
    try {
      return JSON.parse(flagsConfigEl.innerHTML)
    } catch (error) {
      console.error('Flags configuration error', error) // eslint-disable-line no-console
    }
  }
}

export default new Flags()
