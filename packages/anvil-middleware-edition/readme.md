# Edition Middleware

This Express compatible middleware appends the current and available editions to app.locals for each request.

It also supports the ability to change the edition based on a query string parameter.

It should be consumed by your application's server file.

```
Example usage:
```
const editionMiddleware = require('@financial-times/anvil-middleware-edition')

// Optionally you can pass an options object to the edition middleware
const instance = editionMiddleware({})

app.use(instance)
```
