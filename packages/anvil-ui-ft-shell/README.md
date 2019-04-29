# @financial-times/anvil-ui-ft-shell

This module provides a skeleton HTML document structure for the user-facing applications which comprise FT.com. It includes all of the things you can't see and can render metadata, output dehydrated data, load stylesheets, and bootstrap client-side JavaScript.


## Getting started

This module is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ui-ft-shell
```

After installing the package you can use it to wrap your application output. The shell includes the `<html>`, `<head>`, and `<body>` elements so you only need to worry about what's visible to your users.

### Usage with React

If you're using React you can use the `<Shell />` component to wrap your existing component tree.

```jsx
import App from './components/App'
import { Shell } from '@financial-times/anvil-ui-ft-shell'

const document = <Shell {...options}><App /></Shell>
```

_Please note_ that the shell component is designed to be used on the server-side and cannot be rendered on the client-side. For this reason you should always consider `<App />` your application root and client-side mounting point.

### Usage without React

If your application is not using React you can also use the `Shell()` component as a function. The `contents` option is used to provide a prerendered string of HTML.

```js
const app = require('./templates/app.html')
const { Shell } = require('@financial-times/anvil-ui-ft-shell')

const prerenderedHTML = app()
const document = Shell({ contents: prerenderedHTML, ...options })
```

### Rendering to a string

However you are using the shell component you will need to convert the output to a string or stream of HTML to send to your application's users. You should use the `react-dom` package for this:

```js
const ReactDOM = require('react-dom/server')
const outputHTML = ReactDOM.renderToString(document)
```

---

For a full example for how to use this component please refer to the [FT UI example app][example].

[example]: ../../examples/basic-ft-ui/readme.md


## Options

### App bootstrapping

#### `contents` (string)

A optional string of HTML to insert into the document `<body>`. This should be used if you are not using JSX composition and have a prerendered string of HTML.

#### `coreScripts` (string[])

An array of script URLs which will be passed to the [JavaScript bootstrap](../anvil-ui-bootstrap/readme.md) and loaded if the visitor's browser fails the cut the mustard test. _Please note_ that a basic [Polyfill Service](https://polyfill.io/v3/) bundle URL will be automatically prepended to this list.

#### `enhancedScripts` (string[])

An array of script URLs which will be passed to the [JavaScript bootstrap](../anvil-ui-bootstrap/readme.md) and loaded if the visitor's browser succeeds in passing the cut the mustard test. _Please note_ that a complete [Polyfill Service](https://polyfill.io/v3/) bundle URL will be automatically prepended to this list.

#### `stylesheets` (string[])

An array of stylesheet URLs to be loaded using `<link rel="stylesheet" />` tags.

#### `criticalStyles` (string)

An optional string of CSS to embed into the page. Defaults to setting the background colour to FT pink.

#### `flags` (object)

A data object which will be passed to the [feature flags component](../anvil-ui-ft-flags/readme.md).

#### `initialProps` (object)

An optional data object to serialise and embed in the page which can be used to rehydrate your application on the client-side.

#### `htmlAttributes` (object)

An optional data object of attributes to append to the `<html>` element. Any `camelCase` property names will be converted to `kebab-case`, e.g. `{ dataVersion: 123 }` will be rendered as `data-version="123"`.

#### `bodyAttributes` (object)

An optional data object of attributes to append to the `<body>` element. Any `camelCase` property names will be converted to `kebab-case`, e.g. `{ dataVersion: 123 }` will be rendered as `data-version="123"`.


### Metadata and SEO

#### `siteTitle` (string)

The global Website title. Defaults to "Financial Times".

#### `pageTitle` (string)

An optional title for the current page.

#### `description` (string)

An optional meta description for the current page. Defaults to: "News, analysis and comment from the Financial Times, the worldʼs leading global business publication".

#### `canonicalURL` (string)

An optional URL for the current page which will render a [`canonical` meta tag](https://en.wikipedia.org/wiki/Canonical_link_element).

#### `robots` (string)

An optional value for the [`robots` meta tag](https://en.wikipedia.org/wiki/Meta_element#The_robots_attribute). Defaults to "index,follow".

#### `jsonLd` (object[])

An optional array of [linked data](https://json-ld.org/) objects to be serialised and embedded in the page.

#### `googleSiteVerification` (string)

An optional key which can be added to the page to validate access to the [Google Search Console](https://search.google.com/search-console/about).


### Social and Open Graph

#### `facebookPage` (string)

Optional Facebook page ID to associate with the page. Defaults to "8860325749".

#### `twitterSite` (string)

Optional Twitter handle to associate with the page. Defaults to "@FinancialTimes".

#### `openGraph` (object[])

An optional object describing the [Open Graph](http://ogp.me/) metadata to add to the page. The provided objects keys will be collated to create each property name, e.g. `{ og: { title: 'Hello, World' } }` will be rendered as `<meta property="og:title" content="Hello, World" />`.
