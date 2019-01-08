# Asset Loader Middleware

This package provides an [Express] compatible middleware which adds the [asset loader] to your application each response making it available to your application's controllers. The asset loader helps applications to locate their static assets from wherever they are stored.

In addition this package can also send [resource hints] and [serve static files].

[Express]: https://expressjs.com/
[asset loader]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil-server-asset-loader
[resource hints]: https://w3c.github.io/resource-hints/
[serve static files]: https://expressjs.com/en/starter/static-files.html


### Getting started

This package is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-middleware-asset-loader
```

After installing the package create a new instance of the middleware and register it with your application. The middleware can be configured with several [options](#options):

```diff
const express = require('express')
const app = express()

+ const assetLoader = require('@financial-times/anvil-middleware-asset-loader')
+ app.use(assetLoader.init())
```

Once registered an `assets` property will be added to the [response locals] object which provides a copy of the asset loader (used to locate your static assets) and methods to add [resource hints] to the response data.

```js
app.get('/', (request, response) => {
  // Get the absolute file system path to an asset
  const filePath = response.locals.assets.loader.getFileSystemPath('main.css')

  // Get the public URL to an asset
  const publicURL = response.locals.assets.loader.getPublicPath('main.css')

  // Add a resource hint to the response
  response.locals.assets.resourceHints.add(publicURL)

  response.send('A resource hint will be added to this response for main.css')
})
```

See the [asset loader] documentation for a complete list of available methods.

[application locals]: https://expressjs.com/en/api.html#app.locals
[response locals]: https://expressjs.com/en/api.html#res.locals


## API

### Loader

A copy of the asset loader will be added to `response.locals.assets.loader`. See the [asset loader] documentation for a list of available methods.


### Resource Hints

Methods to create resource hints will be added to `response.locals.assets.resourceHints`. The available methods are listed below.

#### `.add(url: string)`

Adds a resource hint to the response for the given URL or path. The file type will be inferred from the file extension.

#### `.toString(filename: string)`

Formats all resource hints to be sent as a `link` header.


## Options

The middleware accepts the following parameters. All options will be passed along to the asset loader:

### `hostStaticAssets`

Serve static assets from a local directory. Uses the [Express static] middleware to load assets from the configured `fileSystemPath` and serve them from the configured `publicPath`. Defaults to `false`.

[Express static]: https://expressjs.com/en/starter/static-files.html

### `manifestFileName`

See the [asset loader] documentation for more details.

### `publicPath`

See the [asset loader] documentation for more details.

### `cacheFileContents`

See the [asset loader] documentation for more details.

### `fileSystemPath`

See the [asset loader] documentation for more details.
