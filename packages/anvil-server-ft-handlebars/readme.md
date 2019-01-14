# Anvil Server FT Handlebars

This module provides rendering for [Handlebars] templates with additional support for loading partial templates, a mechanism to render views into layouts, and a [suite of helper functions]. This module works best when used as a [view engine] for Express.

[Handlebars]: https://handlebarsjs.com/
[suite of helper functions]: https://github.com/Financial-Times/n-handlebars/tree/master/src/helpers
[view engine]: https://expressjs.com/en/guide/using-template-engines.html


## Getting started

This module is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/anvil-server-ft-handlebars
```

It is best used [within an Express application](#usage-with-express) but also works as a [standalone library](#standalone-usage).


### Usage with Express

After installing the module you must register it as a [view engine] for your Express application. This will enable you to render template files with the matching file extension and send the result as a response to requests.

_Please note_ the template file extension registered with your application must match the `extname` [option](#options).

```diff
const express = require('express')
+ const { engine } = require('@financial-times/anvil-server-ft-handlebars')

const app = express()
+ app.engine('.hbs', engine())
```

When using this module as a view engine Express will find the template file, decorate any data passed to it with properties from `app.locals` and `response.locals`, and send the rendered result. See the Express [render documentation] for more information.

```js
app.get('/', (request, response) => {
  const data = {
    pageTitle: 'Home',
    content: 'Hello World!'
  }

  response.render('home.hbs', data)
})
```

[render documentation]: https://expressjs.com/en/4x/api.html#res.render
[app engine]: https://expressjs.com/en/4x/api.html#app.engine


### Standalone usage

This module can be used without integrating into your application. This may be suitable for applications which are not built with Express or for ad-hoc template rendering needs.

```diff
+ const { create } = require('@financial-times/anvil-server-ft-handlebars')
+ const handlebars = handlebars.create()
```

When using this module as a standalone library you will need to find template files, provide all data, and handle the rendered output manually. See the [express-handlebars] documentation for more information.

```js
module.exports = (request, response) => {
  const data = {
    pageTitle: 'Home',
    content: 'Hello World!'
  }

  const view = path.resolve('./views/home.hbs')

  handlebars.renderView(view, data, (error, html) => {
    if (error) {
      response.status(500).send(`Something went wrong! "${error}"`)
    } else {
      response.send(html)
    }
  })
})
```

[express-handlebars]: https://www.npmjs.com/package/express-handlebars


## API

### `.create(options)`

Creates a new Handlebars instance and returns the [express-handlebars] interface.

### `.engine(options)`

Creates a new Handlebars instance and returns a function to be used by Express as a [view engine].


## Options

The methods provided by this module accept the following parameters. All options will be passed along to [express-handlebars]:

### `defaultLayout`

File name for the default layout template. Defaults to `null` (which means no layout will be used).

### `extname`

Template file name extension. Defaults to `".hbs"`. Partial and layout templates _must_ use this extension.

### `viewsDirectory`

Path to a directory containing view template files. Defaults to `"views"` which will be resolved relative to the current working directory.

### `layoutsDir`

Path to a directory containing layout template files. Defaults to `"views/layouts"` which will be resolved relative to the current working directory.

### `partialsDir`

An array of paths to lookup partial template files. Defaults to `["views/partials", "bower_components", "node_modules/@financial-times"]` which will all be resolved relative to the current working directory.

### `helpers`

An object containing additional [helper functions] to register with Handlebars. Defaults to `{}`. This module provides many helper functions provided by [n-express].

[helper functions]: http://handlebarsjs.com/builtin_helpers.html
[n-express]: https://github.com/Financial-Times/n-express
