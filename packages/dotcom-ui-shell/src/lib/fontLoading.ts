// NOTE: Browser caches can be cleared independently of cookies so the
// presence of the cookie does not necessarily mean the file is still
// available in the browser's cache.
// NOTE: This function must be written as ES5 code because it will be stringified
// and embedded in the page to be executed in the browser. This also means all
// data and variables must be scoped within the function.
function loadCustomFonts() {
  var rootElement = document.querySelector('.n-layout')

  if (/(^|\s)o-typography-fonts-loaded=1(;|$)/.test(document.cookie)) {
    var fontLabels = ['sans', 'sans-bold', 'display', 'display-bold']

    for (var i = 0; i < fontLabels.length; i++) {
      rootElement.className = rootElement.className.replace('o-typography--loading-' + fontLabels[i], '')
    }
  }
}

export const loadCustomFontsJS = `(${loadCustomFonts.toString()}());`

export const fontLoadingClassNames = [
  'o-typography--loading-sans',
  'o-typography--loading-sans-bold',
  'o-typography--loading-display',
  'o-typography--loading-display-bold'
].join(' ')

export const fontFaceURLs = [
  'https://www.ft.com/__origami/service/build/v2/files/o-fonts-assets@1.3.2/MetricWeb-Regular.woff',
  'https://www.ft.com/__origami/service/build/v2/files/o-fonts-assets@1.3.2/MetricWeb-Semibold.woff',
  'https://www.ft.com/__origami/service/build/v2/files/o-fonts-assets@1.3.2/FinancierDisplayWeb-Regular.woff',
  'https://www.ft.com/__origami/service/build/v2/files/o-fonts-assets@1.3.2/FinancierDisplayWeb-Bold.woff'
]
