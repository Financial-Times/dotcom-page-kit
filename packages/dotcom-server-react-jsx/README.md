# @financial-times/dotcom-server-react-jsx

This package provides server-side rendering for React components. It is primarily designed to be used during the transition between [n-handlebars] and JSX rendering.

[n-handlebars]: https://github.com/Financial-Times/n-handlebars


## Getting started

This package is compatible with Node 12+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/dotcom-server-react-jsx
```

It is best used [within an Express application](#usage-with-express) but can also be used as a [standalone library](#standalone-usage).

### Usage with Express

After installing the package you must register it as a [view engine] for your Express application. This will enable you to render template files with the matching file extension and send the result as a response to requests.

_Please note_ that you will need to extend Node's `require()` function to enable the use of `.jsx` files at runtime. See [using JSX at runtime](#using-jsx-at-runtime).

```diff
const express = require('express')
+ const { PageKitReactJSX } = require('@financial-times/dotcom-server-react-jsx')

+ const renderer = new PageKitReactJSX(options)
+ app.engine('.jsx', renderer.engine)
```

When using this module as a view engine Express will find the component file, decorate any data passed to it with properties from `app.locals` and `response.locals`, and automatically send the rendered result. See the Express [render documentation] for more information.

```js
app.get('/', (request, response) => {
  const data = {
    pageTitle: 'Home',
    content: 'Hello World!'
  }

  response.render('Home.jsx', data)
})
```

_Please note_ that where to lookup template files can be configured using Express's [settings] and component files _must_ have a default export.

[view engine]: https://expressjs.com/en/guide/using-template-engines.html
[render documentation]: https://expressjs.com/en/4x/api.html#res.render
[settings]: https://expressjs.com/en/api.html#app.settings.table

### Standalone usage

This module can be used without integrating it fully into your application. This may be suitable for applications which are not built with Express or for ad-hoc template rendering needs. This is intended to provide some convenient extra functionality over React's built-in render methods.

```diff
+ const { PageKitReactJSX } = require('@financial-times/dotcom-server-react-jsx')
+ const renderer = new PageKitReactJSX(options)
```

When using this module as a standalone library you will need to find template files, provide all data, and handle the rendered output manually.

```js
const Home = require('../views/Home.jsx')

app.get('/', async (request, response, next) => {
  const data = {
    pageTitle: 'Home',
    content: 'Hello World!'
  }

  try {
    const html = await renderer.render(Home, data, true)
    response.send(html)
  } catch (error) {
    next(error)
  }
})
```


## API

### `render(component, templateContext[, includeDoctype])`

Renders the given component to a string.

If the component has a `.getInitialProps()` method then this method will be called with the value of the `templateContext` argument and the resolved value of this method passed to the component as props. If the component does not have this method then the value of `templateContext` will be passed directly to the component instead.

If `includeDoctype` is true then the output will be prefixed with the HTML document pragma.

### `renderView(templatePath: string, templateContext: any, callback: (error, html) => void)`

This method is intended to be used as a [view engine] for Express.


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

- **Babel** is the most popular transpiler and is the most capable. It has support for the most recent and upcoming JS standards and syntax extensions and can output ES3 code. It has options to add relevant [polyfills] for features not supported by your target environment and tries to produce spec-compliant code. However, Babel can require significant configuration and has many dependencies. This is usually the best option for transpiling code targeting the browser.
- **Bublé** can transpile ES2015-16 syntax and output ES5 code. It does not attempt to polyfill features and favours speed and simplicity over spec-compliance. It supports JSX out of the box and is simple to configure. Bublé is a good choice for projects requiring minimal transformations.
- **Sucrase** is capable of transpiling the latest JS features and syntax extensions to ES2015 code, including JSX. It is fast and lightweight so it is suitable for using in server-side projects.

[JSX syntax]: https://jasonformat.com/wtf-is-jsx/
[transpiler]: https://en.wikipedia.org/wiki/Source-to-source_compiler
[Babel]: https://babeljs.io/
[Bublé]: https://github.com/Rich-Harris/buble
[Sucrase]: https://github.com/alangpierce/sucrase
[Polyfills]: https://remysharp.com/2010/10/08/what-is-a-polyfill
