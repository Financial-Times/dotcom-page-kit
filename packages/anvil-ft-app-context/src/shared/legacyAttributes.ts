import dashify from 'dashify'
import camelCase from 'camelcase'

export const legacyKeyMap = {
  app: 'data-next-app',
  edition: 'data-next-edition',
  version: 'data-next-version',
  product: 'data-next-product',
  isProduction: 'data-next-is-production'
}

export function getPropNameOfLegacyDataAttribute(attributeName: string) {
  for (let key of Object.keys(legacyKeyMap)) {
    if (legacyKeyMap[key] === attributeName) {
      return key
    }
  }
  return camelCase(attributeName.replace('data-', ''))
}

export function getLegacyAttributeNameOfProp(propName: string) {
  return legacyKeyMap[propName] ? legacyKeyMap[propName] : `data-${dashify(propName)}`
}
