# @financial-times/anvil-server-handlebars

This module provides rendering for [Handlebars] templates with additional support for dynamically loading partial templates and a [suite of helper functions]. It is designed to be used during the transition between [n-handlebars] and JSX rendering.

[Handlebars]: https://handlebarsjs.com/
[n-handlebars]: https://github.com/Financial-Times/n-handlebars


## Getting started

This module is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-server-handlebars
```

It is best used [within an Express application](#usage-with-express) but can also be used as a [standalone library](#standalone-usage).


### Usage with Express

After installing the module you must register it as a [view engine] for your Express application. This will enable you to render template files with the matching file extension and send the result as a response to requests.

_Please note_ the template file extension registered with your application be `.html` or `.hbs`.

```diff
const express = require('express')
+ const handlebars = require('@financial-times/anvil-server-handlebars')

+ const engine = handlebars.engine()
+ app.engine('.html', engine)
```

When using this module as a view engine Express will find the template file, decorate any data passed to it with properties from `app.locals` and `response.locals`, and automatically send the rendered result. See the Express [render documentation] for more information.

```js
app.get('/', (request, response) => {
  const data = {
    pageTitle: 'Home',
    content: 'Hello World!'
  }

  response.render('home.hbs', data)
})
```

Express view engines will also inherit some [settings] from the application which can override the [options](#options) provided to this module, these are:

- The `views` setting will be used by Express to find your view template files. Partial template files are looked up independently of this setting.

[view engine]: https://expressjs.com/en/guide/using-template-engines.html
[render documentation]: https://expressjs.com/en/4x/api.html#res.render
[settings]: https://expressjs.com/en/api.html#app.settings.table


### Standalone usage

This module can be used without integrating it fully into your application. This may be suitable for applications which are not built with Express or for ad-hoc template rendering needs.

```diff
+ const handlebars = require('@financial-times/anvil-server-handlebars')
+ const renderer = handlebars.create()
```

When using this module as a standalone library you will need to find template files, provide all data, and handle the rendered output manually.

```js
module.exports = (request, response, next) => {
  const data = {
    pageTitle: 'Home',
    content: 'Hello World!'
  }

  const view = path.resolve('./views/home.hbs')
  const html = renderer.render(view, data)

  response.send(html)
})
```


## API

### `.create(options)`

Creates a new `HandlebarsRenderer` instance.

### `.engine(options)`

Creates a new `HandlebarsRenderer` instance and returns a function to be used by Express as a [view engine].


## Options

The methods provided by this module accept the following parameters:

### `helpers`

An object containing additional [helper functions] to register with Handlebars. Defaults to `{}`.

### `partials`

An object containing [partial templates] to register with Handlebars. Defaults to `{}`.

### `rootDirectory`

Current working directory from which to resolve partial template files. Defaults to `process.cwd()`.

### `partialPaths`

An object listing directories and patterns used to dynamically find and load partial template files. Defaults to:

```js
{
  './views/partials': '**/*.{hbs,html}',
  './bower_components': '*/{templates,components}/**/*{hbs,html}',
  './node_modules/@financial-times': '*/{templates,components}/**/*{hbs,html}'
}
```

### `caching`

A boolean which enables caching of template files to reduce filesystem I/O. This should be enabled in production environments.

[helper functions]: http://handlebarsjs.com/builtin_helpers.html
[partial templates]: https://handlebarsjs.com/partials.html
[n-express]: https://github.com/Financial-Times/n-express
