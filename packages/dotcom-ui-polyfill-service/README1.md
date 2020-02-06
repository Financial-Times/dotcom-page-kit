# @financial-times/dotcom-ui-polyfill-service

This package provides URLs for the [Polyfill Service] which sets a consistent baseline for JavaScript code used by the user-facing applications which comprise FT.com. This package is integrated with the [shell component].

[Polyfill Service]: https://polyfill.io/

## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/dotcom-ui-polyfill-service
```

After installing the package you can use it to create `<script>` tags or integrate it with the [JavaScript bootstrap].

[JavaScript bootstrap]: ../dotcom-ui-bootstrap/readme.md


## Client-side API

There is no client-side integration required. The bootstrap component can only be used on the server-side.


## Server-side API

### `core()`

A script bundle URL configured to provide a limited set of features intended to be loaded by browsers which fail to [cut the mustard]. and should receive a "core" experience.

### `enhanced()`

A script bundle URL configured to provide a full set of features (up to ES2017) intended to be loaded by browsers which successfully [cut the mustard] and should receive an "enhanced" experience.

[cut the mustard]: ../dotcom-ui-bootstrap/readme.md#cutting-the-mustard
[shell component]: ../dotcom-ui-shell/readme.md
