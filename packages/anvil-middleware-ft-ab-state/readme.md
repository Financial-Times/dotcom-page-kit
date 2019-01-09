# FT A/B State Middleware

This package provides an [Express] compatible middleware which appends the [Ammit] A/B test status to each request.

[Express]: https://expressjs.com/
[Ammit]: https://ammit.ft.com/


### Getting started

This package is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-middleware-ft-ab-state
```

After installing the package create a new instance of the middleware and register it with your application:

```diff
const express = require('express')
const app = express()

+const abStateMiddleware = require('@financial-times/anvil-middleware-ft-ab-test')
+app.use(abStateMiddleware.init())
```

Once added to your application the A/B test status will be added to each request.

```js
app.get('/', (request, response) => {
  if (response.locals.abState.get('headlineTest')) {
    ...
  }
})
```


## Test Status API

Methods to get A/B test statuses will be added to each response and made available at `response.locals.abStatus`. The available methods are listed below.

### `.get(test: string)`

Get the status for a given test. Number and boolean values will be parsed. Tests with values set to "on" or "off" will be coerced to booleans.

### `.toString()`

Formats all allocated A/B tests as a string. This is intended to only be used internally but may be useful for debugging purposes.


## Options

There are currently no additional options for this middleware package.
