var doc = document.documentElement

doc.className = doc.className.replace('no-js', 'js')

function scriptLoadError(error) {
  // TODO Log the script failure
  /* eslint-disable no-console */
  console.error(error)
}

function loadScript(src) {
  var script = document.createElement('script')
  script.onerror = scriptLoadError
  script.async = false
  script.src = src
  document.head.appendChild(script)
}

// Cuts the mustard
var enhanced = (function() {
  var script = document.createElement('script')
  return (
    'flex' in doc.style && // not supported by old Safari (< 9) or IE 6-10
    'visibilityState' in document && // not supported by old Android (4.0-4.4) without a prefix
    'async' in script // not supported by old Opera (Presto)
  )
})()

if (enhanced) {
  doc.className = doc.className.replace('core', 'enhanced')

  //TODO Make the set of polyfills configurable?
  var scripts = ['https://cdn.polyfill.io/v2/polyfill.min.js?features=default,HTMLPictureElement,fetch']

  if (scriptsConfigEl) {
    try {
      var scriptsConfigEl = document.getElementById('scripts-config')
      var scriptsConfig = JSON.parse(scriptsConfigEl.innerHTML)
      Array.prototype.push.apply(scripts, scriptsConfig)
    } catch (error) {
      /* eslint-disable no-console */
      console.error(error)
    }
  }

  scripts.forEach(function(script) {
    loadScript(script)
  })
} else {
  loadScript('https://cdn.polyfill.io/v2/polyfill.min.js?features=HTMLPictureElement')
}
