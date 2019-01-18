# Anvil Server JSX

This module provides rendering for [JSX] components with extra functionality for Express applications. It can be used as a [view engine] or dynamically create [route handlers] which automatically render components.

[JSX]: https://jasonformat.com/wtf-is-jsx/
[view engine]: https://expressjs.com/en/guide/using-template-engines.html
[route handlers]: https://expressjs.com/en/guide/routing.html#route-handlers

## Getting started

This module is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/anvil-server-jsx
```

Once installed the package can be used [as a view engine](#usage-as-a-view-engine), dynamically [create route handlers](#creating-route-handlers), or [standalone](#standalone-usage).

_Please note_ you will need to extend Node's `require()` function to enable the use of `.jsx` files at runtime. See [using JSX at runtime](#using-jsx-at-runtime).


### Usage as a view engine

View engines enable the use of the `.render()` method on Express's [response object]. This will automatically find the component to render and send the result as a response to the request.

You can use this module as a view engine with the `createViewEngine()` function (this requires [options](#options) to be provided):

```diff
+ const { createViewEngine } = require('@financial-times/anvil-server-jsx')
+ const jsxViewEngine = createViewEngine(options)
```

Next, register the new view engine with your Express application. _Please note_ that the first argument should be the file extension used by the files which contain your components:

```diff
const app = express()
+ app.engine('.jsx', jsxViewEngine)
```

Once registered Express will be able to find your components, decorate data passed to them with properties from `app.locals` and `response.locals`, and automatically send the rendered result. See the Express [render documentation] for more information.

```js
app.get('/', (request, response) => {
  const data = {
    pageTitle: 'Home',
    content: 'Hello World!'
  }

  response.render('home.jsx', data)
})
```

Finally, Express has some [app settings] which can be defined to provide some options to view engines, these are:

- The `views` setting is the path to the directory containing your view component files. This defaults to `"views"` and will be resolved relative to the current working directory.
- The `view cache` setting currently has no effect on view engine provided by this module.

[response object]: https://expressjs.com/en/4x/api.html#res
[render documentation]: https://expressjs.com/en/4x/api.html#res.render
[app settings]: https://expressjs.com/en/api.html#app.settings.table


### Creating route handlers

[Route handlers] (also known as controllers or route callbacks) are functions which handle requests to routes registered with your Express application. This module can be used to dynamically create route handlers which will automatically render a component and send the result as a response to a request.

You can create a new route handler factory with the `createHandlerFactory()` function (this requires [options](#options) to be provided):

```diff
+ const { createHandlerFactory } = require('@financial-times/anvil-server-jsx')
+ const jsxRouteHandler = new createHandlerFactory(options)
```

This new factory function can then be used to wrap components with a dynamically generated Express route handler:

```js
const HomeComponent = require('../views/home.jsx')
app.get('/', jsxRouteHandler(HomeComponent))
```

If the component provided has a `.getInitialProps()` method then this method will be called with an object containing the request and response and the resolved value passed to the component as props.


### Standalone usage

If you are not building an application using Express or require more granular control over the rendering of your components you can use a standalone renderer. This renderer is intended to provide some convenient extra functionality over your framework's native render to string method and supports the view engine and dynamic route handler functionality provided by this module.

 You can create a new renderer with the `createRenderer()` function (this requires [options](#options) to be provided):

```diff
+ const { createRenderer } = require('@financial-times/anvil-server-jsx')
+ const jsxRenderer = createRenderer(options)
```

This new renderer function can then be used to render your components to a string of HTML. If you are rendering a complete page then the resolved output can be prefixed with the HTML doctype pragma by setting the third argument to `true`:

```js
const HomeComponent = require('../views/home.jsx')

app.get('/', async (request, response, next) => {
  const data = {
    pageTitle: 'Home',
    content: 'Hello World!'
  }

  try {
    const html = await jsxRenderer(HomeComponent, data, true)
    response.send(html)
  } catch (error) {
    next(error)
  }
})
```

If the component provided has a `.getInitialProps()` method then this method will be called with the value of the `data` argument and the resolved value passed to the component as props. If the component does not have this method then the value of `data` will be passed to the component instead.


## API

This module provides three factory functions (functions which return new functions), these are:

### `createRenderer(options)`

Creates a new JSX renderer. This function requires [options](#options).

### `createViewEngine(options)`

Creates a new JSX renderer and returns a function to be used by Express as a [view engine]. This function requires [options](#options).

### `createHandlerFactory(options)`

Creates a new JSX renderer and returns a function to be used for dynamically creating [route handlers]. This function requires [options](#options).


## JSX renderer API

### `renderer(Component, context, includeDoctype)


## View engine API

### `engine(componentPath, context, callback)`


## Route Handler Factory API

### `createHandler(Component)`


## Options

The constructor functions provided by this module each share the following parameters:

### `createElement`

The function to use for creating JSX elements, such as `React.createElement` or `Preact.h`.

### `renderToString`

The function to use for rendering JSX elements to a string, such as `React.renderToString` or `Preact.render`.


## Using JSX at runtime
