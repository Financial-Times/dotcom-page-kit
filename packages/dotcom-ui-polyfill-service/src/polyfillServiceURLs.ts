import querystring from 'querystring'

// Please see https://polyfill.io/v3/url-builder/ for information about which
// features are available and how they may be used.

const polyfillsCore = ['HTMLPictureElement']

const polyfillsEnhanced = [
  // What Andrew Betts decided is "default":
  /*
    Array.from
    Array.isArray
    Array.of
    Array.prototype.every
    Array.prototype.fill
    Array.prototype.filter
    Array.prototype.forEach
    Array.prototype.indexOf
    Array.prototype.lastIndexOf
    Array.prototype.map
    Array.prototype.reduce
    Array.prototype.reduceRight
    Array.prototype.some
    CustomEvent
    DOMTokenList
    Date.now
    Date.prototype.toISOString
    DocumentFragment.prototype.append
    DocumentFragment.prototype.prepend
    Element.prototype.after
    Element.prototype.append
    Element.prototype.before
    Element.prototype.classList
    Element.prototype.cloneNode
    Element.prototype.closest
    Element.prototype.matches
    Element.prototype.prepend
    Element.prototype.remove
    Element.prototype.replaceWith
    Element
    Event.focusin
    Event.hashchange
    Event
    Function.prototype.bind
    JSON
    Map
    Node.prototype.contains
    Number.isNaN
    Object.assign
    Object.create
    Object.defineProperties
    Object.defineProperty
    Object.getOwnPropertyDescriptor
    Object.getOwnPropertyNames
    Object.getPrototypeOf
    Object.keys
    Promise
    Set
    String.prototype.endsWith
    String.prototype.includes
    String.prototype.startsWith
    String.prototype.trim
    URL
    Window
    XMLHttpRequest
    atob
    document.querySelector
    document.visibilityState
    document
    location.origin
    requestAnimationFrame
    ~html5-elements
  */
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

export const core = () => {
  return formatURL(polyfillsCore)
}

export const enhanced = () => {
  return formatURL(polyfillsEnhanced)
}

function formatURL(features: string[]): string {
  const serviceURL = 'https://polyfill.io/v3/polyfill.min.js'
  const queryString = querystring.stringify({ features: features.join(','), source: 'next' })

  return `${serviceURL}?${queryString}`
}
