# @financial-times/anvil-ui-ft-footer

This package provides components which return variations on the footer component for ft.com; the standard ft.com `Footer` and a compressed `LegalFooter`.


## Getting started

This module is compatible with Node 10+ and is distributed on npm.

The footer component expects data from the [navigation API]. The [anvil-server-ft-navigation] package or its middleware, [anvil-middleware-ft-navigation], can be used to make data from this API available on `response.locals.navigation`.

Install the footer package.

```bash
npm install --save @financial-times/anvil-ui-ft-footer
```

Create an [Express] server using the [anvil-middleware-ft-navigation] middleware.

```js
const express = require('express')
const navigationMiddleware = require('@financial-times/anvil-middleware-ft-navigation')

const app = express()

app.use(navigationMiddleware.init())

module.exports = app
```

Include a footer component in your html template and pass in a data object.

```jsx
import { Footer } from 'anvil-ui-ft-footer'
let footerProps

footerProps.data = response.locals.navigation.footer
<Footer {...footerProps} />
```


## Props

To serve an alternative variant of the footer set valid properties at the top level of the footerData or pass the property directly into the component: `<Footer {...footerData} theme="light"/>`.

| PROP | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| theme | string | 'dark' | Serve the specified variant of the footer - the `light` theme is a valid alternative. |
| legal-only | boolean | false | Serve the shorter, 'legal-only' variant of the footer |
| data | object |  | Props from the navigation service |


## Storybook

[Storybook] has been configured for all UI packages in Anvil. From the root of the anvil directory, run:

```bash
npm run storybook
```

The storybook will launch on port: 9001. The footer stories will be available under 'FT > Footer'.

[Express]: https://expressjs.com/
[Storybook]: https://storybook.js.org/
[navigation API]: https://github.com/Financial-Times/next-navigation-api
[anvil-server-ft-navigation]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil-server-ft-navigation
[anvil-middleware-ft-navigation]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil-middleware-ft-navigation
