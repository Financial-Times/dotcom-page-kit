# FT A/B State Middleware

The A/B State middleware appends the A/B test status to app.locals for each request.

This middleware should be consumed by your application's server file.


### Installation
```
npm install --save @financial-times/anvil-middleware-ft-ab-state
```


### Example usage:
```
const abStateMiddleware = require('@financial-times/anvil-middleware-ft-ab-test')

const instance = abStateMiddleware.default()

app.use(instance)
```
