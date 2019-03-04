import querystring from 'querystring'

export const corePolyfillServiceUrl = preparePolyfillServiceUrl(['default'])
export const enhancedPolyfillServiceUrl = preparePolyfillServiceUrl([
  'default',
  'requestAnimationFrame',
  'Promise',
  'matchMedia',
  'HTMLPictureElement',
  'fetch',
  'Array.prototype.find',
  'Array.prototype.findIndex',
  'Array.prototype.includes',
  'Array.prototype.@@iterator',
  'IntersectionObserver',
  'Map',
  'Set',
  'Array.from',
  'NodeList.prototype.forEach',
  'NodeList.prototype.@@iterator',
  'EventSource',
  'Number.isInteger',
  'Object.entries',
  'String.prototype.padStart',
  'String.prototype.padEnd'
])

function preparePolyfillServiceUrl(features: string[]) {
  const polyfillRoot = 'https://www.ft.com/__origami/service/polyfill/v2/polyfill.min.js'
  const queryString = querystring.stringify({ features: features.join(','), source: 'next' })
  return `${polyfillRoot}?${queryString}`
}
