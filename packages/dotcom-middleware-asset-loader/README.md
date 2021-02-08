# @financial-times/dotcom-middleware-asset-loader

This package provides an [Express] compatible middleware which integrates the [asset loader] package into your application and adds it to each response making it available to your application's route handlers. The asset loader helps applications to locate their static assets from wherever they are stored on the file system or web.

In addition this package can also be used to [serve static files].

[Express]: https://expressjs.com/
[asset loader]: https://github.com/Financial-Times/dotcom-page-kit/tree/HEAD/packages/dotcom-server-asset-loader
[serve static files]: https://expressjs.com/en/starter/static-files.html


### Getting started

This package is compatible with Node 12+ and is distributed on npm.

```sh
npm install --save @financial-times/dotcom-middleware-asset-loader
```

After installing the package create a new instance of the middleware and register it with your application. The middleware can be configured with several [options](#options):

```diff
const express = require('express')
const app = express()

+ const assetLoader = require('@financial-times/dotcom-middleware-asset-loader')
+ app.use(assetLoader.init())
```

Once registered an `assetLoader` property will be added to the [response locals] object which provides an instance of the asset loader (used to locate your static assets.)

```js
app.get('/', (request, response) => {
  const { assetLoader } = response.locals

  // Get the absolute file system path to an asset
  const filePath = assetLoader.getFileSystemPath('main.css')

  // Get the public URL to an asset
  const publicURL = assetLoader.getPublicURL('main.css')

  response.send('<p>My awesome page</p>')
})
```

See the [asset loader] package documentation for a complete list of available methods.

[response locals]: https://expressjs.com/en/api.html#res.locals


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

[asset loader documentation]: https://github.com/Financial-Times/dotcom-page-kit/tree/HEAD/packages/dotcom-server-asset-loader#options
