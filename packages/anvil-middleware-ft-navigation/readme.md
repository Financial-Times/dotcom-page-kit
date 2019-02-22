# FT Navigation Middleware

The FT Navigation Express Middleware adds FT navigation data required to render the navigation components for the page to `app.locals`.

Pages which should render a navigation crumbtrail (i.e. most Stream pages) should call the middleware with { `enableCrumbtrail: true }` to tell the middleware to include crumbtrail data in the response.

This middleware should be consumed by your application's server file.


### Installation
```
npm install --save @financial-times/anvil-middleware-ft-navigation
```


### Example usage:
```
const navigationMiddleware = require('@financial-times/anvil-middleware-ft-navigation')

const instance = navigationMiddleware.default({ enableCrumbtrail: true })

app.use(instance)
```

### Further options

In addition to enabling 
