import querystring from 'querystring'

// Please see https://polyfill.io/v3/url-builder/ for information about which
// features are available and how they may be used.

const polyfillsCore = ['default', 'es5', 'es2015', 'HTMLPictureElement', 'NodeList.prototype.forEach']

const polyfillsEnhanced = [
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
  'IntersectionObserver',
  'NodeList.prototype.forEach'
]

export const core = (appPolyfills = []) => {
  return appPolyfills.length
    ? formatURL(polyfillsCore.concat(appPolyfills))
    : formatURL(polyfillsCore)
}

export const enhanced = (appPolyfills  = []) => {
  return appPolyfills.length
    ? formatURL(polyfillsEnhanced.concat(appPolyfills))
    : formatURL(polyfillsEnhanced)
}

function formatURL(features: string[]): string {
  const serviceURL = 'https://polyfill.io/v3/polyfill.min.js'
  const queryString = querystring.stringify({ features: features.join(','), source: 'next' })

  return `${serviceURL}?${queryString}`
}
