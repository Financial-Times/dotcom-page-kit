# @financial-times/dotcom-ui-bootstrap

This package provides a JavaScript bootstrap for your client-side code which can be embedded in your HTML pages. The bootstrap implements feature detection ([cuts the mustard](#cutting-the-mustard)) to determine if the browser should receive a core or enhanced experience, and the capability to load script files as appropriate.


## Getting started

This package is compatible with Node 12+ and is distributed on npm.

```sh
npm install --save @financial-times/dotcom-ui-bootstrap
```

After installing the package you can use it to embed the bootstrap data into your pages.

### Client-side integration

After installing the package you should add `no-js` and `core` class names to your document element (`<html>`). These can be used as hooks for styling elements when providing a non-enhanced, core experience. They will be swapped with `js` and `enhanced` class names if the bootstrap runs successfully.

```diff
<!DOCTYPE html>
- <html>
+ <html class="no-js core">
```

Because the bootstrap is intended to load scripts asynchronously and as early as possible you should always check that the DOM is ready before initialising your client-side code. We recommend using the [ready-state] library which provides a promise-based interface for this:

```js
import readyState from 'ready-state'

readyState.domready.then(() => {
  console.log('Ready!')
})
```

[ready-state]: https://www.npmjs.com/package/ready-state

### Server-side integration

_Please note_ that the bootstrap code should be embedded in the `<head>` section of your pages to ensure scripts begin downloading as soon as possible.

If you are using React to render your app you can use the `Bootstrap` component:

```jsx
import { Bootstrap } from '@financial-times/dotcom-ui-bootstrap'

export default (props) => (
  <html class="no-js core">
    <head>
      <meta charSet="utf-8" />
      <title>My Amazing Website</title>
      <Bootstrap coreScripts={props.coreScripts} enhancedScripts={props.enhancedScripts} />
    </head>
    <body>
      ...
    </body>
  </html>
)
```

Otherwise this package provides two methods to manually integrate the bootstrap code into your templates. First you must insert a JSON formatted string of configuration into a `<script>` element with an ID of `page-kit-bootstrap-config` and then you must embed the bootstrap script itself:

```js
const bootstrap = require('@financial-times/dotcom-ui-bootstrap/server')

function page() {
  return `<!DOCTYPE html>
    <html class="no-js core">
    <head>
      <meta charset="utf-8">
      <title>My Amazing Website</title>
      <script type="application/json" id="page-kit-bootstrap-config">
        ${bootstrap.formatConfigJSON(coreScripts, enhancedScripts)}
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

## Client-side API

There is no client-side integration required. The bootstrap component can only be used on the server-side.


## Server-side API

### `formatConfigJSON(coreScripts, enhancedScripts, trackErrors)`

Returns a JSON formatted string representing the configuration for the bootstrap snippet. This must be inserted into a `<script>` element with an ID of `page-kit-bootstrap-config`. This method requires two arguments and has one optional argument:

1. `coreScripts`

    An array of JavaScript file URLs which are required by the page if the browser fails to [cut the mustard](#cutting-the-mustard) and should deliver a [core experience](#core-enhanced).

2. `enhancedScripts`

    An array of JavaScript file URLs which are required by the page if the browser successfully [cuts the mustard](#cutting-the-mustard) and should deliver an [enhanced experience](#core-enhanced).

3. `trackErrors`

    If enabled this will drop a tracking pixel on the page to send a JavaScript loading failure event to [Spoor].

[Spoor]: https://spoor-docs.herokuapp.com/

### `getBootstrapJS()`

Returns the bootstrap code as a string. This should be inserted into a `<script>` element.


## How does it work?

This package is used to generate a piece of JavaScript code to be embedded into your pages. This code should be executed as soon as possible by the browser. The code implements 4 features:

### No JS/JS

If JavaScript is available the `no-js` class on the document element will be replaced with `js`.

### Core/Enhanced

If the browser passes the [cuts the mustard](#cutting-the-mustard) test then the `core` class name on the document element will be replaced with `enhanced`.

If any scripts fail to load a tracking pixel will be loaded to send a JavaScript loading failure event to [Spoor].

[Spoor]: https://spoor-docs.herokuapp.com/

### Cutting the mustard

[Cutting the mustard] is a function which uses feature detection to determine if a browser is capable of supporting the JavaScript-enhanced experience. Currently the enhanced experience is intended to target all modern browsers and IE11.

[Cutting the mustard]: http://responsivenews.co.uk/post/18948466399/cutting-the-mustard

### Script loading

The configured script files will be asynchronously loaded and executed when ready. There is no guarantee that they will be downloaded and executed in the order specified.
