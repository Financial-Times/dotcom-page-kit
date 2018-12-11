
# FT Asset Loader Middleware

The FT Asset Loader middleware provides express compatible middleware which exposes the asset loader methods to templates by appending an instance of the asset loader to `response.locals`.

FT Asset Loader middleware returns an array containing the middleware and optionally containing a router. The middleware exposes the asset loader methods to your app. See the [asset-loader](https://github.com/Financial-Times/anvil/tree/master/packages/anvil-server-asset-loader) documentation for more information about these methods. The router will serve static assets from wherever they are stored locally if the `hostStaticAssets` option is true. See the [middleware options](#middleware-options) section for more on this.

This middleware should be consumed by your application's server file.


### Installation
```js
npm install --save @financial-times/anvil-middleware-ft-asset-loader
```


### Example usage:

In your application's server file include:
```js
const assetLoaderMiddleware = require('@financial-times/anvil-middleware-ft-asset-loader')

const instance = assetLoaderMiddleware.default()

app.use(instance)
```

Asset loader methods will be available to your template files and can be called by accessing response.locals.assets.loader
```jsx
const exampleScript = () => (
  `${assets.loader.getHashedAsset('example.js')}`
)
```


### Middleware Options:

The middleware optionally accepts the following parameters which each have a default value: `manifestFile`, `publicPath`, `fileSystemPath`, `cacheFileContents` and `hostStaticAssets`.

Options can be passed into the instance to override the default values:

```js
app.use(instance({
  publicPath: '/public-facing-path', fileSystemPath: './path-to-stored-assets'
}))
```

In this example, when a user visits 'some-app.com/public-facing-path' the router fetch any assets required for the page from './path-to-stored-assets'.
// TODO - Include path as relative to ..?

`hostStaticAssets` will default to true for non-production environments. If enabled, the app will defer responsibility for serving assets to the router. The router takes the `options.publicPath` and `options.fileSystemPath` as its parameters and so is dependent on these options.

See the Usage section of the [asset-loader] (https://github.com/Financial-Times/anvil/tree/master/packages/anvil-server-asset-loader#usage) documentation for more information about the loading static assets.

