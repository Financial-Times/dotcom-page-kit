// NOTE: Browser caches can be cleared independently of cookies so the
// presence of the cookie does not necessarily mean the file is still
// available in the browser's cache.
// NOTE: This function must be written as ES5 code because it will be stringified
// and embedded in the page to be executed in the browser.
function loadCustomFonts() {
  var rootElement = document.querySelector('.n-layout')

  if (/(^|\s)o-typography-fonts-loaded=1(;|$)/.test(document.cookie)) {
    var fontLabels = ['sans', 'sansBold', 'display', 'displayBold']
    for (var i = 0; i < fontLabels.length; i++) {
      rootElement.className = rootElement.className.replace('o-typography--loading-' + fontLabels[i], '')
    }
  }
}

const loadCustomFontsJS = `(${loadCustomFonts.toString()}());`

export { loadCustomFontsJS }
