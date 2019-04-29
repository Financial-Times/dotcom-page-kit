import querystring from 'querystring'

// Please see https://polyfill.io/v3/url-builder/ for information about which
// features are available and how they may be used.

export const core = preparePolyfillServiceUrl(['default'])

export const enhanced = preparePolyfillServiceUrl([
  'default',
  'Array.prototype.find',
  'Array.prototype.findIndex',
  'Array.prototype.includes',
  'Array.prototype.@@iterator',
  'EventSource',
  'fetch',
  'HTMLPictureElement',
  'IntersectionObserver',
  'matchMedia',
  'NodeList.prototype.forEach',
  'NodeList.prototype.@@iterator',
  'Number.isInteger',
  'Object.entries',
  'String.prototype.padStart',
  'String.prototype.padEnd'
])

function preparePolyfillServiceUrl(features: string[]) {
  // We use a custom CDN configuration on our domain so that we can avoid extra DNS lookups
  const serviceURL = 'https://www.ft.com/__origami/service/polyfill/v2/polyfill.min.js'

  const queryString = querystring.stringify({ features: features.join(','), source: 'next' })

  return `${serviceURL}?${queryString}`
}
