# @financial-times/anvil-ui-ft-polyfills

This package provides URLs for the [Polyfill Service] which sets a consistent baseline for JavaScript code used by the user-facing applications which comprise FT.com.

[Polyfill Service]: https://polyfill.io/

## Getting started

This module is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ui-ft-polyfills
```

After installing the package you can use it to create `<script>` tags or integrate it with the [JavaScript bootstrap].

[JavaScript bootstrap]: ../anvil-ui-bootstrap/readme.md


### Usage with the FT Shell

If you're using the [`<Shell />` component][shell] to wrap your application you can prepend the Polyfill Service bundle URLs to the `coreScripts` and `enhancedScripts` options:

[shell]: ../anvil-ui-ft-shell/readme.md

```jsx
import { Shell } from '@financial-times/anvil-ui-ft-shell'
import * as PolyfillService from '@financial-times/anvil-ui-ft-polyfills'

const document = <Shell coreScripts={[PolyfillService.core]} enhancedScripts={[PolyfillService.enhanced]}></Shell>
```

_Please note_ that the shell component is designed to be used on the server-side and cannot be rendered on the client-side. For this reason you should always consider `<App />` your application root and client-side mounting point.


## Client-side API

There is no client-side integration required. The bootstrap component can only be used on the server-side.


## Server-side API

### `core`

A script bundle URL configured to provide a limited set of features intended to be loaded by browsers which fail to [cut the mustard]. and should receive a "core" experience.

### `enhanced`

A script bundle URL configured to provide a full set of features (up to ES2017) intended to be loaded by browsers which successfully [cut the mustard] and should receive an "enhanced" experience.

[cut the mustard]: ../anvil-ui-bootstrap/readme.md#cutting-the-mustard
