// NOTE: Browser caches can be cleared independently of cookies so the
// presence of the cookie does not necessarily mean the file is still
// available in the browser's cache.

// NOTE: This function must be written as ES5 code because it will be stringified
// and embedded in the page to be executed in the browser. This also means all
// data and variables must be scoped within the function.
function loadCustomFonts() {
  var rootElement = document.documentElement

  if (/(^|\s)o-typography-fonts-loaded=1(;|$)/.test(document.cookie)) {
    var fontLabels = ['sans', 'sans-bold', 'display', 'display-bold']

    for (var i = 0; i < fontLabels.length; i++) {
      rootElement.className = rootElement.className.replace('o-typography--loading-' + fontLabels[i], '')
    }
  }
}

export const loadCustomFontsJS = `(${loadCustomFonts.toString()}());`
