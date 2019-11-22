# @financial-times/dotcom-ui-shell

This package provides a skeleton HTML document structure for the user-facing applications which comprise FT.com. It includes all of the things you can't see as well as setting up our [core branding](#core-branding). The shell can render metadata, output dehydrated data, load stylesheets and bootstrap client-side JavaScript.

## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/dotcom-ui-shell
```

After installing the package you can use it to wrap your application output. The shell provides a [HTML skeleton](#HTML-skeleton) which includes the `<html>`, `<head>`, and `<body>` elements so you only need to think about what's visible to your users.

### Usage with React

If you're using React you can use the `<Shell />` component to wrap your existing component tree.

```jsx
import App from './components/App'
import { Shell } from '@financial-times/dotcom-ui-shell'

const document = <Shell {...options}><App /></Shell>
```

_Please note_: The shell component is designed to be used on the server-side and cannot be rendered on the client-side. For this reason you should always consider using `<App />` for your application root and client-side mounting point.

### Usage without React

If your application is not using React then you can use the `Shell()` component as a regular JavaScript function, without using JSX. In this case the `contents` option is used to pass in a prerendered string of HTML.

```js
const renderApp = require('./lib/render-app')
const { Shell } = require('@financial-times/dotcom-ui-shell')

const prerenderedHTML = renderApp()
const document = Shell({ contents: prerenderedHTML, ...options })
```

### Rendering to a string

However you are integrating the shell component with your application you will need to convert the output from a [React element] to a string or stream of HTML to send to your application's users. You should use the [`react-dom`] package for this:

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

The dotcom-ui-shell can be loosely defined as encompassing the parts of the webpage that you cannot see, including any elements which are embedded in the document `<head>`, and some core branding decisions.

### Core branding
Core branding encompasses the shared elements which together generate the look and feel of an ft.com page, they are both intrinsic to our brand and required by every page. Core branding includes favicons, fonts, and background colour.

### HTML skeleton

The shell contains a HTML document structure which wraps application HTML. It defines the `<html>`, `<head>`, and `<body>` elements and sets some default page attributes which are common across user-facing applications. Metadata, stylesheets, [feature flags] and [JavaScript bootstrap] elements for the page can be found in the `<head>` element.

### Metadata

The shell adds a collection of `<meta>` tags to the document `<head>` element. These include handles which associate the page with our social media accounts, page context in [Open Graph] format and [linked data] in [JSON-LD] format. The available metadata [options](#metadata-and-seo) are expanded below.

### JavaScript bootstrap

Each page is served a bootstrap script including a "cuts the mustard" test via the [JavaScript bootstrap] package. Additional scripts for core and enhanced browsers which are passed to the shell  are inserted as `<script>` tags in the document `<head>`. The available bootstrap [options](#app-bootstrapping) are expanded below.

### CSS Styles & Stylesheets

This component supports critical CSS styles, normal (blocking) stylesheets and asynchronous (non-blocking) stylesheets. For an example for how to use `async` stylesheets please refer to the [Kitchen Sink example app][kitchen-sink-example].

[kitchen-sink-example]: ../../examples/kitchen-sink/readme.md

There are three ways to include your app's CSS styles. Each option affects page-load performance.

#### 1. Critical

CSS styles that load as part of the webpage HTML (inside a `<style>` tag) and which render before all other styles. These are for displaying instant results such as background colour, font colour and fallback (browser-friendly) fonts.

Page Kit is optimised for browser caching; that is, it's preferable to use linked stylesheets (which different web pages can load from cache) rather than inserting CSS directly into the HTML (which _can't_ be used by other web pages).

#### 2. Blocking

These are standard stylesheet `<link rel="stylesheet" />`s. They stop the browser from rendering until they've finished loading.

#### 3. Asynchronous

These stylesheets **do not** block rendering. They're applied as soon as they load.

Further reading for explanation and implementation details:
* [The Simplest Way to Load CSS Asynchronously — Scott Jehl][load-css-simpler]
* [Render Blocking CSS — Ilya Grigorik][render-blocking-css]

[load-css-simpler]: https://www.filamentgroup.com/lab/load-css-simpler/
[render-blocking-css]: https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css

## Options

### App bootstrapping

#### `contents` (string)

An optional string of HTML to insert into the document `<body>`. This should be used if you are not using JSX composition and have a prerendered string of HTML.

#### `scripts` (string[])

An array of script URLs which are passed to the [JavaScript bootstrap] and loaded if the visitor's browser succeeds in passing the cut the mustard test.

#### `criticalStyles` (string)

An optional string of CSS to embed into the page. Defaults to setting the background colour to FT pink. See "CSS Styles & Stylesheets" above.

#### `stylesheets` (string[])

An array of stylesheet URLs to be loaded using `<link rel="stylesheet" />` tags. See "CSS Styles & Stylesheets" above.

#### `asyncStylesheets` (string[])

An array of stylesheet URLs to be loaded asynchronously. See "CSS Styles & Stylesheets" above.

#### `resourceHints` (string[])

An optional array of resource URLs to append [resource hints] for. The values provided for the `stylesheets` and `scripts` options are appended by default.

[resource hints]: https://w3c.github.io/resource-hints

#### `appContext` (object)

A data object which are passed to the [FT app context] component.

#### `flags` (object)

A data object which are passed to the [feature flags] component.

#### `initialProps` (object)

An optional data object to serialise and embed in the page which can be used to rehydrate your application on the client-side.

#### `htmlAttributes` (object)

An optional data object of attributes to append to the `<html>` element. Any `camelCase` property names are converted to `kebab-case`, e.g. `{ dataVersion: 123 }` are rendered as `data-version="123"`.

#### `bodyAttributes` (object)

An optional data object of attributes to append to the `<body>` element. Any `camelCase` property names are converted to `kebab-case`, e.g. `{ dataVersion: 123 }` are rendered as `data-version="123"`.

### Metadata and SEO

#### `siteTitle` (string)

The global Website title. Defaults to "Financial Times".

#### `pageTitle` (string)

An optional title for the current page.

#### `description` (string)

An optional meta description for the current page. Defaults to: "News, analysis and comment from the Financial Times, the worldʼs leading global business publication".

#### `canonicalURL` (string)

An optional URL for the current page which will render a [`canonical` meta tag](https://en.wikipedia.org/wiki/Canonical_link_element).

#### `metaTags` (object[])

An optional array of custom `<meta>` tags to add to the page. Each array item is a map of property name and value pairs.

#### `robots` (string)

An optional value for the [`robots` meta tag](https://en.wikipedia.org/wiki/Meta_element#The_robots_attribute). Defaults to "index,follow,max-snippet:200,max-image-preview:large".

#### `jsonLd` (object[])

An optional array of [JSON-LD] objects to be serialised and embedded in the page.

#### `googleSiteVerification` (string)

An optional key which can be added to the page to validate access to the [Google Search Console](https://search.google.com/search-console/about).

#### `additionalMetadata` (ReactNode)

An optional property to insert additional metadata elements into the document `<head>`. This should only be used as a last-resort when you need to add information to the page which is not covered by any other option.

### Social and Open Graph

#### `facebookPage` (string)

Optional Facebook page ID to associate with the page. Defaults to "8860325749".

#### `twitterSite` (string)

Optional Twitter handle to associate with the page. Defaults to "@FinancialTimes".

#### `openGraph` (object)

An optional object describing the [Open Graph] metadata to add to the page. The provided objects keys are collated to create each property name, e.g. `{ og: { title: 'Hello, World' } }` are rendered as `<meta property="og:title" content="Hello, World" />`.

[JavaScript bootstrap]: ../dotcom-ui-bootstrap/readme.md
[feature flags]: ../dotcom-ui-flags/readme.md
[FT app context]: ../dotcom-ui-app-context/readme.md
[polyfill service]: ../dotcom-ui-polyfill-service/readme.md
[Open Graph]: http://ogp.me/
[linked data]: https://w3.org/standards/semanticweb/data
[JSON-LD]: https://json-ld.org/
