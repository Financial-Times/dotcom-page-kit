
# FT Asset Loader Middleware

The FT Asset Loader middleware provides express compatible middleware which exposes the [asset loader] methods to templates by appending an instance of the asset loader to `response.locals`.

FT Asset Loader middleware returns an array containing the middleware and optionally containing an express static router for hosting static assets. See the [asset loader] documentation for more information about the asset loader and the [middleware options](#middleware-options) section for details about the router and hosting static assets'

This middleware should be consumed by your application's server file.


### Installation
```js
npm install --save @financial-times/anvil-middleware-asset-loader
```


### Example usage:

In your application's server file include:
```js
const assetLoaderMiddleware = require('@financial-times/anvil-middleware-asset-loader')

const instance = assetLoaderMiddleware.default()

app.use(instance)
```

Asset loader methods will be available on `response.locals.assets`.


### Middleware Options:

The middleware optionally accepts the following parameters which each have a default value. Options can be passed into an instance of asset loader to override any of the default values:

#### `manifestFile`

The absolute path to the asset manifest.json. See the [asset loader] documentation for more details.
`manifestFile` is passed to the asset loader as an option. Defaults to `/public/manifest.json` as an absolute path.

#### `publicPath`

The public-facing URL associated with the static assets. When a user visits a specified `publicPath` the static assets for that page will be retrieved from the associated `fileSystemPath`. `publicPath` is passed to both the asset loader and the router as an option. Defaults to `/public`.

#### `cacheFileContents`

Boolean - set to true if files should be cached in memory when accessed.
`cacheFileContents` is passed to the asset loader as an option. Defaults to `false`.

#### `hostStaticAssets`

Boolean - set to true if assets should be served from a local directory. `hostStaticAssets` instructs the app to use the express static middleware to host a folder of static assets. Assets will be loaded from the configured `fileSystemPath` and served by the app from the configured `publicPath`. Defaults to `false`.

#### `fileSystemPath`

The absolute path to the directory of static assets. When a user visits a specified `publicPath` the static assets for that page will be retrieved from the associated `fileSystemPath`. `fileSystemPath` is passed to both the asset loader and the express static router as an option. Defaults to `/public` as an absolute path.


[asset loader]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil-server-asset-loader

