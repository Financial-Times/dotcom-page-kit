# @financial-times/anvil-ui-ft-app-context

This package provides methods for embedding [app context data] into your server-side rendered pages and safely retrieving it again in the browser.


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ui-ft-app-context
```

After installing the package you can use it to embed app-context data into your pages on the server-side. This data can then be retrieved and used in your client-side code.


### Client-side integration

Once you are delivering the [app context data] with your pages you can use the [app context client] in your client-side code. The client provides methods for safely retrieving the status of individual context properties.

```js
import * as appContext from '@financial-times/anvil-ui-ft-app-context'

const appContext = appContext.init()

if (appContext.get('my-context-property')) {
  ...
}
```


## Client-side API

### `init()`

Initialises and returns a new [app context client] which can be used to safely access the status of individual contexts.


## App context client API

### `get(context: string)`

Returns the status for the requested context. If the context is not found or has been filtered out this will return `undefined`.

### `getAll()`

Returns all app context data.

_Please note_ that the [app context data] object is frozen so it cannot be modified.

[app context client]: #app-context-client-api
[app context data]: ../anvil-server-ft-app-context
