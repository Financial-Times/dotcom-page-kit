# @financial-times/dotcom-server-handlebars

This package provides rendering for [Handlebars] templates with additional support for dynamically loading partial templates and a suite of [helper functions]. It is primarily designed to be used during the transition between [n-handlebars] and JSX rendering and does not support layouts.

[Handlebars]: https://handlebarsjs.com/
[n-handlebars]: https://github.com/Financial-Times/n-handlebars
[helper functions]: src/helpers/README.md


## Getting started

This package is compatible with Node 12+ and is distributed on npm.

```sh
npm install --save @financial-times/dotcom-server-handlebars
```

It is best used [within an Express application](#usage-with-express) but can also be used as a [standalone library](#standalone-usage).


### Usage with Express

After installing the package you must register it as a [view engine] for your Express application. This will enable you to render template files with the matching file extension and send the result as a response to requests.

_Please note_ the template file extension registered with your application should be `.html` or `.hbs`.

```diff
const express = require('express')
+ const { PageKitHandlebars } = require('@financial-times/dotcom-server-handlebars')

+ const renderer = new PageKitHandlebars(options)
+ app.engine('.html', renderer.engine)
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

_Please note_ that where to lookup template files can be configured using Express's [options](#options).

[view engine]: https://expressjs.com/en/guide/using-template-engines.html
[render documentation]: https://expressjs.com/en/4x/api.html#res.render
[settings]: https://expressjs.com/en/api.html#app.settings.table


### Standalone usage

This module can be used without integrating it fully into your application. This may be suitable for applications which are not built with Express or for ad-hoc template rendering needs.

```diff
+ const { PageKitHandlebars } = require('@financial-times/dotcom-server-handlebars')
+ const renderer = new PageKitHandlebars(options)
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

### `.loadPartials()`

Load and compile all partial templates found with the `partialPaths` option. The template files found will be cached if caching is enabled. Returns an object mapping partial names to template functions.

### `.loadTemplate(templatePath: string)`

Loads and compiles the requested template file. The provided path will be resolved relative to the `rootDirectory` option if it is not absolute (beginning `/`). The template will be cached if caching is enabled. Returns a template function.

### `.render(template: string | function, templateContext: any)`

Renders the requested template file or template function with `templateContext`. Partial templates and helper functions will be provided to the render templateContext. Returns a string.

### `.renderView(templatePath: string, templateContext: any, callback: (error, html) => void)`

This method is intended to be used as a [view engine] for Express.


## Options

### `handlebars`

Provide an instance of Handlebars to use. Defaults to `require('handlebars')`.

### `helpers`

An object containing additional [helper functions] to register with Handlebars. Defaults to `{}`.

### `partials`

An object containing precompiled [partial templates] to register with Handlebars. Defaults to `{}`.

### `rootDirectory`

Current working directory from which to resolve partial template files. Defaults to `process.cwd()`.

### `partialPaths`

An object listing directories and patterns used to dynamically find and load partial template files. Defaults to:

```js
{
  './views/partials': '**/*.{hbs,html}',
  './bower_components': '*/{templates,components,partials,views}/**/*.{hbs,html}',
  './node_modules/@financial-times': '*/{templates,components,partials,views}/**/*.{hbs,html}'
}
```

### `cache`

A boolean which enables the caching of partial file lookup and compiled templates to enable reuse between render calls. This should always be enabled in production environments. Defaults to `process.env.NODE_ENV !== 'development`.

[helper functions]: http://handlebarsjs.com/builtin_helpers.html
[partial templates]: https://handlebarsjs.com/guide/partials.html
[n-express]: https://github.com/Financial-Times/n-express
