# FT Edition Middleware

The Edition middleware appends the current and available editions to app.locals for each request.

It defaults to serving the 'uk' edition but supports changing the edition via a query string parameter `?edition=international`. If a valid query string is sent a cookie will be set saving the user's edition preference for 1 year.

This middleware should be consumed by your application's server file.


### Installation
```
npm install --save @financial-times/anvil-middleware-ft-edition
```


### Example usage:
```
const editionMiddleware = require('@financial-times/anvil-middleware-ft-edition')

const instance = editionMiddleware.default()

app.use(instance)
```
