# @financial-times/dotcom-ui-footer

This package provides components which return variations on the footer component for ft.com; the standard ft.com `Footer` and a compressed `LegalFooter`.


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```bash
npm install --save @financial-times/dotcom-ui-footer
```

Create an [Express] server using the [dotcom-middleware-navigation] middleware.

```js
const express = require('express')
const navigationMiddleware = require('@financial-times/dotcom-middleware-navigation')

const app = express()

app.use(navigationMiddleware.init())

module.exports = app
```

Include a footer component in your html template and pass in a data object.

```jsx
import { Footer } from 'dotcom-ui-footer'
let footerProps

footerProps.data = response.locals.navigation.footer

<Footer {...footerProps} />
```


## Props

All variants require a props object to be passed to the footer component. The component can be configured by setting properties on this object or by passing the desired property directly into the component: `<Footer {...footerData} theme="light"/>`.

|    PROP    |  TYPE   | DEFAULT |                                      DESCRIPTION                                      |
| ---------- | ------- | ------- | ------------------------------------------------------------------------------------- |
| theme      | string  | 'dark'  | Serve the specified variant of the footer - the `light` theme is a valid alternative. |
| legal-only | boolean | false   | Serve the shorter, 'legal-only' variant of the footer                                 |
| data       | object  |         | Props from the navigation service                                                     |

## Navigation data

The props object passed to the footer component must have a `data` property. The [dotcom-server-navigation] package or its middleware, [dotcom-middleware-navigation], can be used to make data from the [navigation API] available on `response.locals.navigation`.


## Storybook

[Storybook] has been configured for all UI packages in Anvil. From the root of the anvil directory, run:

```bash
npm run storybook
```

The storybook will launch on port: 9001. The footer stories will be available under 'FT > Footer'.

[Express]: https://expressjs.com/
[Storybook]: https://storybook.js.org/
[navigation API]: https://github.com/Financial-Times/next-navigation-api
[dotcom-server-navigation]: https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-server-navigation
[dotcom-middleware-navigation]: https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-middleware-navigation
