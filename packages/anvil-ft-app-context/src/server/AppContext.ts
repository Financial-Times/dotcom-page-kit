import camelCase from 'camelcase'
import { prepareEmbedString } from '../shared/prepareEmbedString'
import { getLegacyAttributeNameOfProp } from '../shared/legacyAttributes'
import { TAppContext, TLegacyAppContextDataAttributes } from '../types'
import ShareAppContext from '../shared/AppContext'

export interface AppContextConstructorProps {
  context?: Partial<TAppContext>
}

export class AppContext extends ShareAppContext {
  add(additionalContext: Partial<TAppContext>) {
    this.data = { ...this.data, ...additionalContext }
  }

  toEmbedString(): string {
    return prepareEmbedString(this.data as TAppContext)
  }

  toLegacyDataAttributesString(): string {
    const attributes = []

    attributes.push('data-app-context')

    for (let key of Object.keys(this.data).sort()) {
      const attrName = getLegacyAttributeNameOfProp(key)

      if (typeof this.data[key] === 'boolean') {
        if (this.data[key]) {
          attributes.push(attrName)
        }
      } else {
        attributes.push(`${attrName}="${this.data[key]}"`)
      }
    }

    return attributes.join(' ')
  }

  toLegacyDataAttributesObject(): TLegacyAppContextDataAttributes {
    const attributes = { dataAppContext: true } as any

    for (let key of Object.keys(this.data).sort()) {
      const prop = camelCase(getLegacyAttributeNameOfProp(key))
      attributes[prop] = this.data[key]
    }

    return attributes
  }
}
