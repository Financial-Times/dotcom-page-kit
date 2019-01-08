# FT A/B State Middleware

This package provides an [Express] compatible middleware which appends the A/B test status to each request.

[Express]: https://expressjs.com/


### Getting started

This package is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-middleware-ft-ab-state
```

After installing the package create a new instance of the middleware and add it to your application:

```diff
const express = require('express')
const app = express()

+const abStateMiddleware = require('@financial-times/anvil-middleware-ft-ab-test')
+app.use(abStateMiddleware.init())
```

Once added to your application the A/B state middleware will append the A/B test status to each request.

