# @financial-times/anvil-ui-bootstrap

This module provides a client-side bootstrap to be embedded in your HTML response. The bootstrap implements feature detection ([cuts the mustard](#cutting-the-mustard)) to determine if a browser should receive a core or enhanced experience, and the capability to load scripts as appropriate.


## Getting started

This module is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ui-bootstrap
```

After installing the module you should add `no-js` and `core` class name to your document element (`<html>`).

```diff
<!DOCTYPE html>
- <html>
+ <html class="no-js core">
```

To use this module include it in your server-side application code. It provides a single function which returns a string of HTML.

```js
const bootstrap = require('@financial-times/anvil-ui-bootstrap')
const bootstrapHTML = bootstrap()
```

The HTML string returned by the bootstrap function should be embedded the `<head>` of your pages.

```js
function view() {
  return `<!DOCTYPE html>
    <html>
    <head>
      <meta charSet="utf-8">
      <title>My Amazing Website</title>
      ${bootstrapHTML}
    </head>
    <body>
      <p>Hello World</p>
    </body>
  </html>`
}
```

The bootstrap function accepts an object of [options](#options) used to configure which scripts to load.


## Options

The bootstrap returns a string of HTML. It supports the following options:

### coreScriptFiles (array)

An array of JavaScript file URLs which are required by the page if the browser fails to [cut the mustard](#cutting-the-mustard) and should deliver a [core experience](#core-enhanced).

### enhancedScriptFiles (array)

An array of JavaScript file URLs which are required by the page if the browser successfully [cuts the mustard](#cutting-the-mustard) and should deliver an [enhanced experience](#core-enhanced).


## Scope

This module is used to generate a piece of JavaScript code to be embedded into your pages. This code should be executed as soon as possible by the browser. The code implements 4 features:

### No JS/JS

If JavaScript is available the `no-js` class on the document element will be replaced with `js`.

### Core/Enhanced

If the browser passes the [cuts the mustard](#cutting-the-mustard) test then the `core` class on the document element will be replaced with `enhanced`.

### Cutting the mustard

[Cutting the mustard] is a function which uses feature detection to determine if a browser is capable of supporting the JavaScript-enhanced experience. Currently the enhanced experience is intended to target include all modern browsers and IE11.

[Cutting the mustard]: http://responsivenews.co.uk/post/18948466399/cutting-the-mustard

### Script loading

The configured script files will be asyncronously loaded (non-blocking) and executed in order.
