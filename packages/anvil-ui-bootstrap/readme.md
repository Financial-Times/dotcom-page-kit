# @financial-times/anvil-ui-bootstrap

This module provides a JavaScript bootstrap for your client-side code which can be embedded in your HTML pages. The bootstrap implements feature detection ([cuts the mustard](#cutting-the-mustard)) to determine if the browser should receive a core or enhanced experience, and the capability to load script files as appropriate.


## Getting started

This module is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ui-bootstrap
```

After installing the module you should add `no-js` and `core` class names to your document element (`<html>`).

```diff
<!DOCTYPE html>
- <html>
+ <html class="no-js core">
```

This module provides two methods which each return a piece of the bootstrap code: the configuration JSON and the JavaScript snippet.

The bootstrap code should be embedded in the `<head>` section of your pages to ensure scripts begin downloading as soon as possible.

```js
const bootstrap = require('@financial-times/anvil-ui-bootstrap')

function page() {
  return `<!DOCTYPE html>
    <html class="no-js core">
    <head>
      <meta charSet="utf-8">
      <title>My Amazing Website</title>
      <script type="application/json" id="bootstrap-config">
        ${bootstrap.formatConfigJSON(options)}
      </script>
      <script>
        ${bootstrap.getBootstrapJS()}
      </script>
    </head>
    <body>
      ...
    </body>
  </html>`
}
```


## API

### `.formatConfigJSON(coreScripts, enhancedScripts)`

Returns a JSON formatted string representing the configuration for the bootstrap snippet. This must be inserted into a `<script>` element with an ID of `bootstrap-config`. This method requires two arguments:

1. `coreScripts`

    An array of JavaScript file URLs which are required by the page if the browser fails to [cut the mustard](#cutting-the-mustard) and should deliver a [core experience](#core-enhanced).

2. `enhancedScripts`

    An array of JavaScript file URLs which are required by the page if the browser successfully [cuts the mustard](#cutting-the-mustard) and should deliver an [enhanced experience](#core-enhanced).

### `.getBootstrapJS()`

Returns the JavaScript code as a string. This should be inserted into a `<script>` element.


## Scope

This module is used to generate a piece of JavaScript code to be embedded into your pages. This code should be executed as soon as possible by the browser. The code implements 4 features:

### No JS/JS

If JavaScript is available the `no-js` class on the document element will be replaced with `js`.

### Core/Enhanced

If the browser passes the [cuts the mustard](#cutting-the-mustard) test then the `core` class name on the document element will be replaced with `enhanced`.

### Cutting the mustard

[Cutting the mustard] is a function which uses feature detection to determine if a browser is capable of supporting the JavaScript-enhanced experience. Currently the enhanced experience is intended to target all modern browsers and IE11.

[Cutting the mustard]: http://responsivenews.co.uk/post/18948466399/cutting-the-mustard

### Script loading

The configured script files will be asynchronously loaded (non-blocking) and executed in order.
