# @financial-times/dotcom-middleware-app-context

This package provides an [Express] compatible middleware which appends an instance of [app context] to each request and configures it with details automatically inferred from the running application.

[Express]: https://expressjs.com/
[app context]: ../dotcom-server-app-context/README.md


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/dotcom-middleware-app-context
```

After installing the package create a new instance of the middleware and register it with your application. The middleware can be configured with several [options](#options):

```diff
const express = require('express')
const app = express()

+const appContext = require('@financial-times/dotcom-middleware-app-context')
+app.use(appContext.init())
```

Once registered an `appContext` property will be added to the [response locals]:

```js
app.get('/', (request, response) => {
  const appContextData = response.locals.appContext.getAll()
})
```

See the [app context] package documentation for more information.

[response locals]: https://expressjs.com/en/api.html#res.locals


## Options

The middleware accepts the following parameters:

### `appContext`

An app context data object, see the [app context schema] for more information. This can be used to append extra properties or override any of the properties automatically inferred from the running application.

[app context schema]: ../dotcom-server-app-context/schema.md
