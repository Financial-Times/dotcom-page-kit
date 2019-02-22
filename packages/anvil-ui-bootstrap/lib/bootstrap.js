;(function() {
  var doc = document.documentElement
  var isEnhanced = isEnhancedBrowser()
  var scriptsConfig = getScriptsConfig()
  var scriptsToLoad = []

  doc.className = doc.className.replace('no-js', 'js')

  if (isEnhanced) {
    doc.className = doc.className.replace('core', 'enhanced')
    Array.prototype.push.apply(scriptsToLoad, scriptsConfig.enhanced)
  } else {
    Array.prototype.push.apply(scriptsToLoad, scriptsConfig.core)
  }

  for (var i = 0, len = scriptsToLoad.length; i < len; i++) {
    loadScript(scriptsToLoad[i])
  }

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

  // "Cut the mustard" test
  // by Maggie Allen and Matt Hinchliffe November 2018
  function isEnhancedBrowser() {
    var script = document.createElement('script')
    var input = document.createElement('input')

    return (
      'visibilityState' in document && // not supported by old Android (4.0-4.4) without a prefix
      'indeterminate' in input && // not supported by BB 10
      'flex' in doc.style && // not supported by old Safari (< 9) or IE 6-10
      'async' in script // not supported by old Opera (Presto engine < 15)
    )
  }

  function getScriptsConfig() {
    var scriptsConfigEl = document.getElementById('bootstrap-config')
    var scriptsConfig = { core: [], enhanced: [] }

    if (scriptsConfigEl) {
      try {
        scriptsConfig = JSON.parse(scriptsConfigEl.innerHTML)
      } catch (error) {
        console.error('Bootstrap configuration error', error) // eslint-disable-line no-console
      }
    }

    return scriptsConfig
  }
})()
