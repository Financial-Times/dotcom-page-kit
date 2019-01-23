# Anvil Server React Renderer

This module provides rendering for React components with convenient extras for Express applications.

[view engine]: https://expressjs.com/en/guide/using-template-engines.html
[route handler]: https://expressjs.com/en/guide/routing.html#route-handlers


## Getting started

This module is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/anvil-server-react-renderer
```

This module provides a single class which can be configured by providing [options](#options):

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

A [Route handler] (also known as a controller or route callback) is a function which handles requests to routes registered with your Express application. This module can dynamically generate route handlers which renders a component and sends the result as a response.

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


### `.renderView(componentPath, context, callback)`

This method is intended to be used as a [view engine] for Express. If you need to use it directly then the `componentPath` must be an absolute file system path to a component file.

### `.createHandler(component)`

Dynamically generates an Express [route handler] for the given component which will render the component for each request and automatically send the output as a response.


## Options

### `useStaticRendering`

Directs all methods to use `ReactDOMServer.renderToStaticMarkup()` instead of `ReactDOMServer.renderToString()`. This should be enabled if you are rendering static pages and are not using React on the client. Defaults to `false`.


## Using JSX at runtime

By default Node cannot parse files which contain [JSX syntax] because it is extension of JavaScript rather than a feature of the language. However, it is widely supported by JavaScript parsers and transpilers.

There are two options for using files which include JSX code:

1. Transpile the code and write the plain JS output to a new file
2. Transpile the code on-the-fly and keep the plain JS output in memory

_Option 1_ is the best choice if you intend to distribute your code. For example if you publish your code to npm then this should always be in plain JS so that consumers of your code do not need to transpile it themselves.

_Option 2_ is a good choice for code used only in your application. If the code is transpiled efficiently then this should not add any extra overhead but it may cause start-up times to increase. If you are using a template library such as Pug, Handlebars, or EJS you may be using a similar technique already!

Whichever option you choose you will need to use a [transpiler]. Some popular options are [Babel], [Bublé], and [Sucrase]:

- **Babel** is the most popular transpiler and is the most capable. It has support for the most recent and upcoming JS standards and syntax extensions and can output ES5 code. It has options to add relevant [polyfills] for features not supported by your target environment. However, Babel can require significant configuration and has many dependencies. This is the best option for transpiling code targeting the browser.
- **Bublé** can transpile ES6 syntax to ES5 code. It does not attempt to polyfill features but it supports JSX and it is fast and simple. Bublé is a good choice for projects requiring minimal transformations.
- **Sucrase** is capable of transpiling new JS features and syntax extensions to ES6 code. It is fast and lightweight so it is suitable for using in server-side projects.

[JSX syntax]: https://jasonformat.com/wtf-is-jsx/
[transpiler]: https://en.wikipedia.org/wiki/Source-to-source_compiler
[Babel]: https://babeljs.io/
[Bublé]: https://github.com/Rich-Harris/buble
[Sucrase]: https://github.com/alangpierce/sucrase
[Polyfills]: https://remysharp.com/2010/10/08/what-is-a-polyfill
