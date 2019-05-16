# FT A/B State Middleware

This package provides an [Express] compatible middleware which appends the [Ammit] A/B test status added by [Preflight] to each request.

[Express]: https://expressjs.com/
[Ammit]: https://ammit.ft.com/
[Preflight]: https://github.com/Financial-Times/next-preflight


### Getting started

This package is compatible with Node 8+ and is distributed on npm.

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

Once added to your application the A/B test state will be added to each request.

```js
app.get('/', (request, response) => {
  if (response.locals.abState.get('headlineTest')) {
    ...
  }
})
```


## A/B State API

Methods to get A/B test states will be added to each response and made available at `response.locals.abState`. The available methods are listed below.

### `.get(test: string)`

Get the state for a given test. Number and boolean values will be coerced with `JSON.parse()`. Tests with values of "on" or "off" will be returned as a correlating boolean.

### `.toString()`

Formats all allocated A/B tests as a string. This is intended to only be used internally but may be useful for debugging purposes.


## Options

There are currently no options for this middleware package.
