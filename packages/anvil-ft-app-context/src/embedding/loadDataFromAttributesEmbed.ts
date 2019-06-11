import { TAppContext } from '../types'
import { typeOfSchemaProp } from '../schema/typeOfSchemaProp'
import { getPropNameOfLegacyDataAttribute } from '../schema/getPropNameOfLegacyAttribute'

export function loadDataFromAttributesEmbed() {
  const elem = document.querySelector('[data-app-context]')

  if (elem) {
    const context: Partial<TAppContext> = {}

    for (let i = 0; i < elem.attributes.length; i++) {
      const attr = elem.attributes[i]

      if (attr.name.startsWith('data-') && attr.name !== 'data-app-context') {
        const prop = getPropNameOfLegacyDataAttribute(attr.name)
        if (typeOfSchemaProp(prop) === 'boolean') {
          context[prop] = attr.value !== undefined
        } else {
          context[prop] = attr.value
        }
      }
    }

    return Object.freeze(context)
  }
}
