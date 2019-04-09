# @financial-times/anvil-middleware-ft-navigation

This package provides an [Express] compatible middleware which integrates the [FT Navigation] package into your application and adds the navigation data to each response making it available to your application's route handlers. This data is required to render the navigation components [header] and [footer].

[Express]: https://expressjs.com/
[FT Navigation]: ../anvil-server-ft-navigation/readme.md
[header]: ../anvil-ui-ft-header/readme.md
[footer]: ../anvil-ui-ft-footer/readme.md


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-middleware-ft-navigation
```

After installing the package create a new instance of the middleware and register it with your application. The middleware can be configured with several [options](#options):

```diff
const express = require('express')
const app = express()

+ const navigation = require('@financial-times/anvil-middleware-ft-navigation')
+ app.use(navigation.init())
```

Once registered a `navigation` property will be added to the [response locals] object containing the navigation data.

```js
app.get('/', (request, response) => {
  console.log(response.locals.navigation) // { ... }
})
```

[response locals]: https://expressjs.com/en/api.html#res.locals


## Options

The middleware accepts the following parameters. All options will be passed along to the [FT Navigation] package:

### `enableSubNavigation`

Enables fetching hierarchical navigation data for the current path including any parent and child pages. Defaults to `false`.

### `interval`

See the [FT navigation documentation] for more details.

### `subNavigationUrl`

See the [FT navigation documentation] for more details.

### `menuUrl`

See the [FT navigation documentation] for more details.

[FT navigation documentation]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil-server-ft-navigation#options
