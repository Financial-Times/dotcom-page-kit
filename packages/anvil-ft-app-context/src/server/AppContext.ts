import dashify from 'dashify'
import camelCase from 'camelcase'
import pascalCase from 'pascalcase'
import { prepareEmbedString } from '../shared/prepareEmbedString'
import { TAppContext, TLegacyAppContextDataAttributes } from '../types'

const legacyKeyMap = {
  app: 'data-next-app',
  edition: 'data-next-edition',
  version: 'data-next-version',
  product: 'data-next-product',
  isProduction: 'data-next-is-production'
}

export interface AppContextConstructorProps {
  context?: Partial<TAppContext>
}

export class AppContext {
  data: Partial<TAppContext>

  constructor({ context = {} }: AppContextConstructorProps = {}) {
    this.data = context
  }

  add(additionalContext: Partial<TAppContext>) {
    this.data = { ...this.data, ...additionalContext }
  }

  get(item: string) {
    return this.data[item]
  }

  toEmbedString(): string {
    return prepareEmbedString(this.data as TAppContext)
  }

  toLegacyDataAttributesString(): string {
    const attributes = []

    attributes.push('data-app-context')

    for (let key of Object.keys(this.data).sort()) {
      const attrName = legacyKeyMap[key] ? legacyKeyMap[key] : `data-${dashify(key)}`

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
      const prop = legacyKeyMap[key] ? camelCase(legacyKeyMap[key]) : `data${pascalCase(key)}`
      attributes[prop] = this.data[key]
    }

    return attributes
  }
}
