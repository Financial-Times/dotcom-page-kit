# Anvil Server FT Handlebars

This module provides rendering for [Handlebars] templates with additional support for loading partial templates, a mechanism to render views into layouts, and a [suite of helper functions]. It can be used as a [view engine] for Express or standalone.

[Handlebars]: https://handlebarsjs.com/
[suite of helper functions]: https://github.com/Financial-Times/n-handlebars/tree/master/src/helpers
[view engine]: https://expressjs.com/en/guide/using-template-engines.html


## Getting started

This module is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/anvil-server-ft-handlebars
```

It can be used [as a view engine for Express](#usage-with-express) but also works well as a [standalone library](#standalone-usage).


### Usage with Express

After installing the module you must register it as a [view engine] for your Express application. This enables the use of the `.render()` method on the [response object].

_Please note_ the file extension registered with your application must match the one used by the template files you want to render and the `extname` [option](#options).

```diff
const express = require('express')
+ const { engine } = require('@financial-times/anvil-server-ft-handlebars')

const app = express()
+ app.engine('.hbs', engine())
```

When registered Express will be able to find the template file, decorate data passed to it with properties from `app.locals` and `response.locals`, and automatically send the rendered result. See the Express [render documentation] for more information.

```js
app.get('/', (request, response) => {
  const data = {
    pageTitle: 'Home',
    content: 'Hello World!'
  }

  response.render('home.hbs', data)
})
```

Express view engines require some [app settings] to be defined, these are:

- The `views` setting must be a path to the directory containing your view template files. Partial and layout template files will be found independently of this setting.
- The `view cache` setting will enable caching of partial template files to avoid finding and compiling them for each render.

[response object]: https://expressjs.com/en/4x/api.html#res
[render documentation]: https://expressjs.com/en/4x/api.html#res.render
[settings]: https://expressjs.com/en/api.html#app.settings.table


### Standalone usage

This module can also be used without integrating it into Express. This may be suitable for applications which are not built with Express or for custom component rendering needs. You must begin by creating a new renderer:

```diff
+ const { create } = require('@financial-times/anvil-server-ft-handlebars')
+ const hbsRenderer = create()
```

When using this module as a standalone library you will need to find template files, provide all data, and handle the rendered output manually. See the [express-handlebars] documentation for more information.

```js
module.exports = (request, response) => {
  const data = {
    pageTitle: 'Home',
    content: 'Hello World!'
  }

  const view = path.resolve('./views/home.hbs')

  hbsRenderer.renderView(view, data, (error, html) => {
    if (error) {
      response.status(500).send(`Something went wrong! "${error}"`)
    } else {
      response.send(html)
    }
  })
})
```

[express-handlebars]: https://www.npmjs.com/package/express-handlebars


## Top-level API

### `.create(options)`

Creates a new Handlebars renderer.

### `.engine(options)`

Creates a new Handlebars renderer and returns a function to be used by Express as a [view engine].


## Renderer API

See the [express-handlebars] documentation.


## Options

The methods provided by this module accept the following parameters. All options will be passed along to [express-handlebars]:

### `defaultLayout`

File name for the default layout template. Defaults to `null` (which means no layout will be used).

### `extname`

Template file name extension. Defaults to `".hbs"`. Partial and layout templates _must_ all use this extension.

### `layoutsDir`

Path to a directory containing layout template files. Defaults to `"views/layouts"` which will be resolved relative to the current working directory. This may be overridden by the Express `views` setting when this module is used as a view engine.

### `partialsDir`

An array of paths to lookup partial template files. Defaults to `["views/partials", "bower_components", "node_modules/@financial-times"]` which will all be resolved relative to the current working directory. This may be overridden by the Express `views` setting when this module is used as a view engine.

### `helpers`

An object containing additional [helper functions] to register with Handlebars. Defaults to `{}`.

[helper functions]: http://handlebarsjs.com/builtin_helpers.html
[n-express]: https://github.com/Financial-Times/n-express
