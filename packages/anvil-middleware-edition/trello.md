This package should provide Express compatible middleware which appends the A/B test status to app.locals for each request.

https://github.com/Financial-Times/n-ui/blob/master/server/index.js#L62-L67 (_Note:_ this mutates `app.locals` which is a bug!)

It should also support the ability to change the edition based on a query string parameter.

https://github.com/Financial-Times/n-ui/blob/master/server/models/navigation/editionsModel.js

Example implementation:
```
module.exports = (options = {}) => {
    return (request, response, next) => {
        const edition = request.get('FT-Edition') || 'uk';

        response.locals.editions = {
            current {}
            others: []
        }

        response.vary('FT-Edition')

        next()
    }
}
```
Example usage:
```
const editionMiddleware = require('@financial-times/anvil-middleware-edition')

// Anvil middleware should export a function so they can accept options
const instance = editionMiddleware({})

app.use(instance)
```

Current implementation: https://github.com/Financial-Times/n-ui/blob/master/server/models/navigation/editionsModel.js
