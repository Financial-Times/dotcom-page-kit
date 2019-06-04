import { TAppContext } from '../types'
import { getPropNameOfLegacyDataAttribute } from '../shared/schema'

export default function loadFromDataAttributesEmbed() {
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
