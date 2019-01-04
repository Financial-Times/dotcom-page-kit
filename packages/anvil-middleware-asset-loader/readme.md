
# FT Asset Loader Middleware

The FT Asset Loader middleware enables express compatible middleware which appends the [asset loader] to response.locals making it accessible to your Express application controllers.

This package can optionally also provide a [static file server](https://expressjs.com/en/starter/static-files.html).

This middleware should be consumed by your application's server file.


### Installation
```js
npm install --save @financial-times/anvil-middleware-asset-loader
```


### Example usage:

In your application's server file include:

```js
const assetLoaderMiddleware = require('@financial-times/anvil-middleware-asset-loader')

const instance = assetLoaderMiddleware.init()

app.use(instance)
```

Asset loader methods will be available on `response.locals.assets`.


### Middleware Options:

The middleware optionally accepts the following parameters which each have a default value. Options can be passed into an instance of asset loader to override any of the default values:

#### `manifestFileName`

The name of the asset manifest file. See the [asset loader] documentation for more details. Defaults to `"manifest.json"`.

#### `publicPath`

The public-facing URL associated with the static assets. When a user visits a specified `publicPath` the static assets for that page will be retrieved from the associated `fileSystemPath`. `publicPath` is passed to both the asset loader and the router as an option. Defaults to `"/public"`.

#### `cacheFileContents`

Boolean - set to true if files should be cached in memory when accessed.
`cacheFileContents` is passed to the asset loader as an option. Defaults to `false`.

#### `hostStaticAssets`

Boolean - set to true if assets should be served from a local directory. `hostStaticAssets` instructs the app to use the express static middleware to host a folder of static assets. Assets will be loaded from the configured `fileSystemPath` and served by the app from the configured `publicPath`. Defaults to `false`.

#### `fileSystemPath`

The absolute path to the directory of static assets. `fileSystemPath` is passed to both the asset loader and the express static router as an option. Defaults to `"./public"`.


[asset loader]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil-server-asset-loader

