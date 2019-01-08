# Asset Loader Middleware

This package provides an [Express] compatible middleware which adds the [asset loader] to each response making it accessible to your application's controllers. It can also send [resource hints] and [serve static files].

[Express]: https://expressjs.com/
[asset loader]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil-server-asset-loader
[resource hints]: https://w3c.github.io/resource-hints/
[serve static files]: https://expressjs.com/en/starter/static-files.html


### Getting started

This package is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-middleware-asset-loader
```

After installing the package create a new instance of the middleware and add it to your application:

```diff
const express = require('express')
const app = express()

+ const assetLoader = require('@financial-times/anvil-middleware-asset-loader')
+ app.use(assetLoader.init())
```

Once added to your application the asset loader will be appended to each response which can be used to locate your static assets.

```js
app.get('/', (request, response) => {
  // Get the absolute file system path to an asset
  const assetPath = response.locals.assets.getFileSystemPath('main.css')

  // Get the public URL to an asset
  const assetURL = response.locals.assets.getPublicPath('main.css')
})
```

This package extends the basic asset loader with two extra methods which can be used to add [resource hints] to the response data:

```js
app.get('/', (request, response) => {
  // Add a resource hint to the response for a file
  reponse.locals.assets.addResourceHint('/public/logo.png')

  // Get the public URL to an asset and add a resource hint to the response
  const assetURL = response.locals.assets.getPublicPathAndHint('main.css')

  response.send('A resource hint will be added to this response for main.css')
})
```

See the [asset loader] documentation for a complete list of available methods.


## Settings

The middleware accepts the following parameters. All options are passed to the asset loader:

### `manifestFileName`

The name of the asset manifest file. See the [asset loader] documentation for more details. Defaults to `"manifest.json"`.

### `publicPath`

The public-facing URL for the static assets. See the [asset loader] documentation for more details. Defaults to `"/public"`.

### `cacheFileContents`

Cache files in memory when accessed. See the [asset loader] documentation for more details. Defaults to `false`.

### `fileSystemPath`

The absolute path to the directory of static assets. See the [asset loader] documentation for more details. Defaults to `path.resolve("./public")`.

### `hostStaticAssets`

Serve static assets from a local directory. Uses the Express static middleware to load assets from the configured `fileSystemPath` and serve them from the configured `publicPath`.  Defaults to `false`.
