# @financial-times/anvil-ui-bootstrap

This module provides a client-side bootstrap to be embedded in your HTML pages. The bootstrap implements feature detection ([cuts the mustard](#cutting-the-mustard)) to determine if a browser should receive a core or enhanced experience, and the capability to load script files as appropriate.


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

This module provides three methods which each return a piece of the bootstrap code: the configuration JSON, the JavaScript snippet, or both as a complete HTML string. To start, include the module in your server-side code:

```js
const bootstrap = require('@financial-times/anvil-ui-bootstrap')
```

The bootstrap code should be embedded in the `<head>` of your pages to ensure scripts begin downloading as soon as possible.

```js
function view() {
  return `<!DOCTYPE html>
    <html>
    <head>
      <meta charSet="utf-8">
      <title>My Amazing Website</title>
      ${bootstrap.getHTML()}
    </head>
    <body>
      <p>Hello World</p>
    </body>
  </html>`
}
```


## API

### `.getHTML(options)`

Returns a string of HTML containing two script tags; one for the configuration JSON and one for the bootstrap script. This method requires [options](#options) to be provided.

### `.getConfigJSON(options)`

Returns a JSON formatted string containing configuration for the bootstrap script. This should be inserted into a `<script>` element with an ID of `bootstrap-config`. This method requires [options](#options) to be provided.

```js
const configJSON = bootstrap.getConfigJSON({ core: [], enhanced: [] })
const configHTML = `
  <script type="application/json" id="bootstrap-config">
    ${configJSON}
  </script>
`
```

### `.getSnippetJS()`

Returns the JavaScript code as a string. This should be inserted into a `<script>` element.

```js
const bootstrapJS = bootstrap.getSnippetJS({ core: [], enhanced: [] })
const bootstrapHTML = `
  <script>
    ${bootstrapJS}
  </script>
`
```


## Options

### `coreScripts`

An array of JavaScript file URLs which are required by the page if the browser fails to [cut the mustard](#cutting-the-mustard) and should deliver a [core experience](#core-enhanced).

### `enhancedScripts`

An array of JavaScript file URLs which are required by the page if the browser successfully [cuts the mustard](#cutting-the-mustard) and should deliver an [enhanced experience](#core-enhanced).


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
