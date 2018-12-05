
# FT Asset Loader Middleware

The FT Asset Loader middleware provides Express compatible middleware which provides the asset loader methods to templates by appending an instance of the asset loader to `response.locals`.

This middleware should be consumed by your application's server file.


### Installation
```
npm install --save @financial-times/anvil-middleware-ft-asset-loader
```


### Example usage:
```
const assetLoaderMiddleware = require('@financial-times/anvil-middleware-ft-asset-loader')

const instance = assetLoaderMiddleware.default({})

app.use(instance)
```
