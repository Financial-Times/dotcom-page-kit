# FT App Context Middleware

This package provides an [Express] compatible middleware which appends the [app context client instance] to each request.

### Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-middleware-ft-app-context
```

After installing the package create a new instance of the middleware and register it with your application:

```diff
const express = require('express')
const app = express()

+const appContextMiddleware = require('@financial-times/anvil-middleware-ft-app-context')
+app.use(appContextMiddleware.init())
```

Once added to your application the [app context client] will become available to each request.

```js
app.get('/', (request, response) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Some page with embedded app context</title>
        ${response.locals.appContext.toEmbedString()}
      </head>
    </html>
  `)
})
```

See the [`anvil-ft-app-context` package] for documentation on the app context client


## Options

### context

An optional object that has one or more [TAppContext] properties. When this is supplied, it will be used to set the equivalent properties of the app context data

### environment

An optional string that represents the app environment. It defaults to `process.env.NODE_ENV`

[Express]: https://expressjs.com/
[TAppContext]: readme.md#appcontext../anvil-ft-app-context/readme.md#tappcontext
[app context client instance]: ../anvil-ft-app-context/readme.md#appcontext
[`anvil-ft-app-context` package]: ../anvil-ft-app-context/
