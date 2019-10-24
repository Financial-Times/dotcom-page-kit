/*
  Load stylesheets asyncronously. See: 
   • https://www.filamentgroup.com/lab/load-css-simpler/
   • https://w3c.github.io/preload/#example-5
  
  @NOTE: This is in ES5 syntax, because it's not compiled, because it's server-side code. 
  (You don't need to compile server-side code because you get to set whichever version of node you want.)
  Its stringified and given to the client via "dangerouslySetInnerHTML" in a <script> tag.
  Because it runs in the client, it needs to be ES5 so it's compatible with older browsers.
*/
function loadAsyncStylesheets() {
  var currentScript = document.scripts[document.scripts.length - 1]
  var stylesheets = currentScript.getAttribute('data-stylesheets').split(',')

  for (var i = 0, len = stylesheets.length; i < len; i++) {
    var link = document.createElement('link')
    link.href = stylesheets[i]
    link.key = 'stylesheet-' + stylesheets[i]
    link.rel = 'stylesheet'
    link.media = 'print' // <-- 'print' is intentional; on load, it changes to 'all'.
    link.onload = function(event) {
      event.target.media = 'all'
    }
    currentScript.parentNode.insertBefore(link, currentScript)
  }
}

module.exports = '(' + loadAsyncStylesheets.toString() + ')()'
