(function() {
  var doc = document.documentElement

  doc.className = doc.className.replace('no-js', 'js')

  function scriptLoadError(error) {
    console.error('Script loading error', error) // eslint-disable-line no-console
  }

  function loadScript(src) {
    var script = document.createElement('script')
    script.onerror = scriptLoadError
    script.async = false
    script.src = src
    document.head.appendChild(script)
  }

  var scriptsConfigEl = document.getElementById('scripts-config')
  var scriptsConfig = { core: [], enhanced: [] }

  if (scriptsConfigEl) {
    try {
      scriptsConfig = JSON.parse(scriptsConfigEl.innerHTML)
    } catch (error) {
      console.error('Scripts configuration error', error) // eslint-disable-line no-console
    }
  }

  // Cut the mustard
  var enhanced = (function() {
    var script = document.createElement('script')
    var input = document.createElement('input')

    return (
      'visibilityState' in document && // not supported by old Android (4.0-4.4) without a prefix
      'indeterminate' in input && // not supported by BB 10
      'flex' in doc.style && // not supported by old Safari (< 9) or IE 6-10
      'async' in script // not supported by old Opera (Presto engine < 15)
    )
  })()

  var scripts = []

  if (enhanced) {
    doc.className = doc.className.replace('core', 'enhanced')
    Array.prototype.push.apply(scripts, scriptsConfig.enhanced)
  } else {
    Array.prototype.push.apply(scripts, scriptsConfig.core)
  }

  for (var i = 0, len = scripts.length; i < len; i++) {
    loadScript(scripts[i])
  }
})()
