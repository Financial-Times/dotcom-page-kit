# @financial-times/anvil-ui-ft-shell

This package provides a skeleton HTML document structure for the user-facing applications which comprise FT.com. It includes all of the things you can't see as well as setting up our [core branding](#core-branding). The shell can render metadata, output dehydrated data, load stylesheets and bootstrap client-side JavaScript.


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ui-ft-shell
```

After installing the package you can use it to wrap your application output. The shell provides a [HTML skeleton](#HTML-skeleton) so you only need to worry about what's visible to your users.

### Usage with React

If you're using React you can use the `<Shell />` component to wrap your existing component tree.

```jsx
import App from './components/App'
import { Shell } from '@financial-times/anvil-ui-ft-shell'

const document = <Shell {...options}><App /></Shell>
```

_Please note_ that the shell component is designed to be used on the server-side and cannot be rendered on the client-side. For this reason you should always consider `<App />` your application root and client-side mounting point.

### Usage without React

If your application is not using React then you can use the `Shell()` component as a regular JavaScript function, without using JSX. In this case the `contents` option is used to pass in a prerendered string of HTML.

```js
const renderApp = require('./lib/render-app')
const { Shell } = require('@financial-times/anvil-ui-ft-shell')

const prerenderedHTML = renderApp()
const document = Shell({ contents: prerenderedHTML, ...options })
```

### Rendering to a string

However you are integrating the shell component with your applicaton you will need to convert the output from a [React element] to a string or stream of HTML to send to your application's users. You should use the [`react-dom`] package for this:

```js
const ReactDOM = require('react-dom/server')
const outputHTML = ReactDOM.renderToString(document)
```

[React element]: https://reactjs.org/docs/rendering-elements.html
[`react-dom`]: https://reactjs.org/docs/react-dom.html

---

For a full example for how to use this component please refer to the [FT UI example app][example].

[example]: ../../examples/basic-ft-ui/readme.md


## Scope

The anvil-ui-ft-shell can be loosely defined as encompassing the parts of the webpage that you cannot see, including any elements which are embedded in the document `<head>`, and some core branding decisions.

### Core branding
Core branding encompases the shared elements which together generate the look and feel of an ft.com page, they are both intrinsic to our brand and required by every page. Core branding includes favicons, fonts, and background colour.

FT favicons, the background colour, and the fallback fonts have been defined in this package. Our custom fonts are defined in the [anvil-ft-ui-layout](https://github.com/Financial-Times/anvil/tree/master/packages/anvil-ui-ft-layout) package; font files must be downloaded via a blocking script and cannot be included in the shell for that reason.

### HTML skeleton

The shell contains a HTML document structure which wraps application HTML. It includes the `<html>`, `<head>`, and `<body>` elements and is shared across all user-facing applications.

### Metadata

The shell adds a collection of `<meta>` tags to the document `<head>` including SEO and social media properties and page context in Open Graph format.

### Stylesheets

Background colour, font colour and fallback fonts are included in the shell as critical styles. Additional stylesheet URLs which are passed to the application shell will be inserted as `<link>` tags in the document `<head>`.

### JavaScript bootstrap

Each page is served a bootstrap script including a "cuts the mustard" test via the [anvil-ui-bootstrap](https://github.com/Financial-Times/anvil/tree/master/packages/anvil-ui-bootstrap) package. Additional scripts for core and enhanced browsers which are passed to the shell  will be inserted as `<script>` tags in the document `<head>`.


## Options

### App bootstrapping

#### `contents` (string)

A optional string of HTML to insert into the document `<body>`. This should be used if you are not using JSX composition and have a prerendered string of HTML.

#### `coreScripts` (string[])

An array of script URLs which will be passed to the [JavaScript bootstrap](../anvil-ui-bootstrap/readme.md) and loaded if the visitor's browser fails the cut the mustard test.

#### `enhancedScripts` (string[])

An array of script URLs which will be passed to the [JavaScript bootstrap](../anvil-ui-bootstrap/readme.md) and loaded if the visitor's browser succeeds in passing the cut the mustard test.

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
