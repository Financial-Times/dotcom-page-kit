# @financial-times/dotcom-ui-layout

This package provides and an abstraction over the header and footer navigation UI components for FT.com.

## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/dotcom-ui-layout
```

After installing the package you can use it to wrap your application views and pages. The layout includes the global UI elements so you can focus on the contents of your pages.

### Usage with JSX

If you're using React and JSX you can use the `<Layout />` component to wrap your existing component tree.

```jsx
import React from 'react'
import Home from './pages/Home'
import { Layout } from '@financial-times/dotcom-ui-layout'

const page = <Layout {...options}><App /></Layout>
```

_Please note_ that the layout component is designed to be used on the server-side. It can be rendered on the client-side but there is not usually a good reason to do so. If possible you should consider `<App />` as your application root and client-side mounting point.

### Usage without JSX

If your application is not using React or JSX then you can still use the `Layout` component via React's `createElement()` function to wrap your existing HTML. In this case the `contents` option is used to pass in a pre-rendered string of HTML.

```js
const React = require('react')
const renderApp = require('./lib/render-app')
const { Layout } = require('@financial-times/dotcom-ui-layout')

const html = renderApp()
const page = React.createElement(Layout, { contents: html, ...options })
```

### Rendering to a string

However you are integrating the layout component with your application you will need to convert the output from a [React element] to a string or stream of HTML to send to your application's users. You need to use the [`react-dom`] package for this:

```js
const ReactDOM = require('react-dom/server')
const outputHTML = ReactDOM.renderToStaticMarkup(document)
```

[React element]: https://reactjs.org/docs/rendering-elements.html
[`react-dom`]: https://reactjs.org/docs/react-dom.html

---

For a full example for how to use this component please refer to the [FT UI example app][example].

[example]: ../../examples/ft-ui/README.md

### Styles

This component includes styles written in Sass which includes the styles for [`n-ui-foundations`][n-ui-foundations] and the [header] and [footer] components. It can be imported into your application's main Sass stylesheet:

```scss
@import '@financial-times/dotcom-ui-layout/styles';
```

It is also possible to build the layout styles individually, for example to improve long-term caching. If you integrate the layout styles this way then you may need to add a dependency on `n-ui-foundations` and import its mixins into your app's main Sass stylesheet:

```scss
@import 'n-ui-foundations/mixins';
```

_Please note_ that the exact usage will depend on how you configure your Sass compiler and whether or not you are using Bower to install dependencies.

[n-ui-foundations]: https://github.com/Financial-Times/n-ui-foundations/
[header]: ../dotcom-ui-header/README.md
[footer]: ../dotcom-ui-footer/README.md


## Options

### Props

| PROP            | TYPE                                            | OPTIONAL | DEFAULT     | DESCRIPTION                                                                                  |
|-----------------|-------------------------------------------------|----------|-------------|----------------------------------------------------------------------------------------------|
| navigationData  | [TNavigationData]                               | true*    | `undefined` | Required if using the built in header and/or footer components. See note below.              |
| headerVariant   | 'simple' \| 'large-logo' \| 'logo-only'\| false | true     | `"simple"`  | The type of built in [header] to display                                                     |
| headerBefore    | string \| ReactElement                          | true     | `undefined` | A slot for content to appear before Header                                                   |
| headerAfter     | string \| ReactElement                          | true     | `undefined` | A slot for content to appear after Header                                                    |
| headerOptions   | THeaderProps                                    | true     | `undefined` | Pass options to the header component                                                         |
| headerComponent | ReactElement                                    | true     | `undefined` | Pass a custom header                                                                         |
| footerVariant   | 'simple' \| 'legal' \| false                    | true     | `"simple"`  | The type of built in [footer] to display                                                     |
| footerBefore    | string \| ReactElement                          | true     | `undefined` | A slot for content to appear before Footer                                                   |
| footerAfter     | string \| ReactElement                          | true     | `undefined` | A slot for content to appear after Footer                                                    |
| footerOptions   | TFooterProps                                    | true     | `undefined` | Pass options to the footer component                                                         |
| footerComponent | ReactElement                                    | true     | `undefined` | Pass a custom footer                                                                         |
| contents        | string                                          | true     | `undefined` | A prerendered string of HTML used to insert the page contents when not using JSX composition |

\* Navigation data is required to render all [header] variants except for `"logo-only"`. Navigation data is required to render all built in [footer] components. It is recommended to integrate the [navigation package] with your application to get navigation data.

[header]: ../dotcom-ui-header/README.md
[footer]: ../dotcom-ui-footer/README.md
[TNavigationData]: ../dotcom-types-navigation/README.md
[navigation package]: ../dotcom-server-navigation/README.md

### Custom components

All slots accept both custom React components or a string of HTML.

```jsx
import { Layout } from '@financial-times/dotcom-ui-layout'

const adBannerHTML = getAdBanner(id) // => <iframe>...<iframe>

<Layout
  headerBefore={adBannerHTML}
  headerComponent={<CustomHeader />}
  headerAfter={adBannerHTML}
  footerComponent={<CustomFooter />}
/>
```
