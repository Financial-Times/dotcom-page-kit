# Assets Middleware

This package provides an [Express] compatible middleware which integrates the [asset loader] and [resource hints] packages into your application and adds it to each response making it available to your application's route handlers. The asset loader helps applications to locate their static assets from wherever they are stored and resource hints enable developers to optimise the delivery of certain resources.

In addition this package can also be used to [serve static files].

[Express]: https://expressjs.com/
[asset loader]: https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-server-asset-loader
[resource hints]: https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-server-resource-hints
[serve static files]: https://expressjs.com/en/starter/static-files.html


### Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/dotcom-middleware-assets
```

After installing the package create a new instance of the middleware and register it with your application. The middleware can be configured with several [options](#options):

```diff
const express = require('express')
const app = express()

+ const assetLoader = require('@financial-times/dotcom-middleware-assets')
+ app.use(assetLoader.init())
```

Once registered an `assets` property will be added to the [response locals] object which provides a copy of the asset loader (used to locate your static assets) and methods to create resource hints which can be added to the response data.

```js
app.get('/', (request, response) => {
  const { assets } = response.locals

  // Get the absolute file system path to an asset
  const filePath = assets.loader.getFileSystemPath('main.css')

  // Get the public URL to an asset
  const publicURL = assets.loader.getPublicURL('main.css')

  // Add a resource hint to the response
  assets.resourceHints.add(publicURL)

  response.set('Link', assets.resourceHints.toString())

  response.send('<p>My awesome page</p>')
})
```

See the [asset loader] and [resource hints] package documentation for a complete list of available methods.

[response locals]: https://expressjs.com/en/api.html#res.locals


## Loader API

A global instance of the asset loader will be added to each response and made available at `response.locals.assets.loader`. See the [asset loader] documentation for a list of available methods and their usage.


## Resource Hints API

A new instance of the resource hints loader will be added to each response and made available at `response.locals.assets.resourceHints`. See the [resource hints] documentation for a list of available methods and their usage.


## Options

The middleware accepts the following parameters. All options will be passed along to the asset loader:

### `hostStaticAssets`

Enable static static assets to be served from a local directory. Uses the [Express static] middleware to load assets from the configured `fileSystemPath` and serve them from the configured `publicPath`. Defaults to `false`.

[Express static]: https://expressjs.com/en/starter/static-files.html

### `manifestFileName`

See the [asset loader documentation] for more details.

### `publicPath`

See the [asset loader documentation] for more details.

### `cacheFileContents`

See the [asset loader documentation] for more details.

### `fileSystemPath`

See the [asset loader documentation] for more details.

[asset loader documentation]: https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-server-asset-loader#options
