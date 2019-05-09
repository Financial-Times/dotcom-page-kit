import querystring from 'querystring'

// Please see https://polyfill.io/v3/url-builder/ for information about which
// features are available and how they may be used.

export const core = formatURL(['default', 'es5', 'es2015', 'HTMLPictureElement'])

export const enhanced = formatURL([
  // What Andrew Betts decided is "default"
  'default',

  // ECMAScript presets
  'es5',
  'es2015',
  'es2016',
  'es2017',

  // Web browser features
  'EventSource',
  'fetch',
  'HTMLPictureElement',
  'IntersectionObserver'
])

function formatURL(features: string[]): string {
  // We use a custom CDN configuration on our domain so that we can avoid extra DNS lookups
  const serviceURL = 'https://polyfill.io/v3/polyfill.min.js'

  const queryString = querystring.stringify({ features: features.join(','), source: 'next' })

  return `${serviceURL}?${queryString}`
}
