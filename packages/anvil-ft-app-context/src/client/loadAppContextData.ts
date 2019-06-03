import { TAppContext } from '../types'
import { APP_CONTEXT_ELEMENT_ID } from '../shared/constants'
import { getPropNameOfLegacyDataAttribute } from '../shared/legacyAttributes'

export default function loadAppContextData(): TAppContext {
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
    const context: Partial<TAppContext> = {}

    for (let i = 0; i < elem.attributes.length; i++) {
      const attr = elem.attributes[i]

      if (attr.name.startsWith('data-') && attr.name !== 'data-app-context') {
        const prop = getPropNameOfLegacyDataAttribute(attr.name)
        context[prop] = attr.value
      }
    }

    switch (typeof context.isProduction) {
      case 'string':
        context.isProduction = true
        break
      case undefined:
        context.isProduction = false
        break
    }

    return Object.freeze(context)
  }
}
