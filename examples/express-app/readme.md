# example express-app

An example express app for developing anvil middleware.


### Usage

Include your middleware as a dependency of the express-app in package.json.
```
"devDependencies": {
  "file:../../packages/anvil-middleware-my-middleware"
}
```

Require your middleware in app.js.

```
const myMiddleware = require('@financial-times/anvil-middleware-my-middleware')

```

Create an instance of your middleware and include it with `app.use()`
```
const middelware = myMiddleware()
app.use(middelware)
```

Navigate to the root of this `express-app` and use `npm run build` to start the app on localhost:3456.

Tip - Remember to build your middleware after making a change to make it available to the example app `athloi run build --filter anvil-middleware-my-middleware`.

Tip - Create a symlink to your middleware so that you don't need to npm install the node_module after making changes to your middleware.
