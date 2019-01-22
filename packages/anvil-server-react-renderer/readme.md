# Anvil Server React Renderer

This module provides rendering for React components and includes extra functionality for Express applications.

[JSX]: https://jasonformat.com/wtf-is-jsx/
[view engine]: https://expressjs.com/en/guide/using-template-engines.html
[route handler]: https://expressjs.com/en/guide/routing.html#route-handlers


## Getting started

This module is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/anvil-server-react-renderer
```

This module provides a single class:

```diff
+ import ReactRenderer from '@financial-times/anvil-server-react-renderer'
+ const renderer = new ReactRenderer()
```

Once installed the package can be used [as a view engine](#usage-as-a-view-engine), to dynamically [create route handlers](#creating-route-handlers), or [standalone](#standalone-usage).

_Please note_ you will need to extend Node's `require()` function to enable the use of `.jsx` files at runtime. See [using JSX at runtime](#using-jsx-at-runtime).


### Usage as a view engine

View engines enable the use of the `.render()` method on Express's [response object]. This will automatically find the file containing the component to render and send the result as a response to the request.

After creating a new JSX renderer you can use the `engine` property to register it with your Express application. _Please note_ that the first argument should be the file extension used by the files which contain your components:

```diff
const app = express()
+ app.engine('.jsx', renderer.engine)
```

Once registered Express will be able to find your component files, decorate any data passed to them with properties from `app.locals` and `response.locals`, and automatically send the rendered result. See the Express [render documentation] for more information.

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

```js
renderer.createHandler(component)
```

A [Route handler] (also known as controller or route callback) is a function which handles requests to routes registered with your Express application. This module can dynamically generate route handlers which renders a component and sends the result as a response.

```js
const HomeComponent = require('../views/home.jsx')
app.get('/', renderer.createHandler(HomeComponent))
```


### Standalone usage

If you are not building an application with Express or require more granular control you can use a standalone renderer. This renderer is intended to provide some convenient extra functionality over your framework's native render to string method.

```js
const HomeComponent = require('../views/home.jsx')

app.get('/', async (request, response, next) => {
  const data = {
    pageTitle: 'Home',
    content: 'Hello World!'
  }

  try {
    const html = await renderer.render(HomeComponent, data, true)
    response.send(html)
  } catch (error) {
    next(error)
  }
})
```


## API

The renderer class provides three methods, these are:

### `.render(component, context[, includeDoctype])`

Renders the given `component` to a string.

If the component provided has a `.getInitialProps()` method then this method will be called with the value of the `context` argument and the resolved value passed to the component as props. If the component does not have this method then the value of `context` will be passed directly to the component instead.

If `includeDoctype` is true then the output will be prefixed with the HTML document pragma.


### `.viewEngine(componentPath, context, callback)`

This method is intended to be used as a [view engine] for Express. If you need to use it directly then the `componentPath` must be an absolute file system path to a component file.

### `.createHandler(component)`

Dynamically generates an Express [route handler] for the given component which will respond render the component for each request and automatically send the output as a response.


## Options

This module currently has no options.


## Using JSX at runtime
