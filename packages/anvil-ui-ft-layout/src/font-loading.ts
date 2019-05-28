// Note: Browser caches can be cleared independently of cookies so the
// presence of the cookie does not necessarily mean the file is still
// available in the browser's cache.
function loadCustomFonts() {
  const rootElement = document.querySelector('.n-layout')
  if (/(^|\s)o-typography-fonts-loaded=1(;|$)/.test(document.cookie)) {
    var fontLabels = ['sans', 'sansBold', 'display', 'displayBold']
    for (var i = 0; i < fontLabels.length; i++) {
      rootElement.className = document.documentElement.className.replace(
        'o-typography--loading-' + fontLabels[i],
        ''
      )
    }
  }
}

const loadCustomFontsJS = `(${loadCustomFonts.toString()}());`

export { loadCustomFontsJS }
