# @financial-times/anvil-middleware-ft-app-context

This package provides an [Express] compatible middleware which appends the [FT app context] to each request and configures it with details automatically inferred from the running application.

[Express]: https://expressjs.com/
[FT app context]: ../anvil-server-ft-app-context/readme.md


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-middleware-ft-app-context
```

After installing the package create a new instance of the middleware and register it with your application. The middleware can be configured with several [options](#options):

```diff
const express = require('express')
const app = express()

+const appContext = require('@financial-times/anvil-middleware-ft-app-context')
+app.use(appContext.init())
```

Once registered an `appContext` property will be added to the [response locals] object which provides a preconfigured instance of [FT app context].

```js
app.get('/', (request, response) => {
  const { appContext } = response.locals

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        ${appContext.toEmbedString()}
      </head>
    </html>
  `)
})
```

See the [FT app context] package documentation for a complete list of available methods.

[response locals]: https://expressjs.com/en/api.html#res.locals

## Options

The middleware accepts the following parameters:

### `context`

An optional object of context properties. This can be used to append extra properties or override any of the properties automatically inferred from the running application.

[`TAppContext`]: ../anvil-server-ft-app-context/schema.md
