# @financial-times/anvil-ui-ft-footer

This package provides components which return variations on the footer component for ft.com; the standard ft.com `Footer` and a compressed `LegalFooter`.


### Getting started

This module is compatible with Node 10+ and is distributed on npm.

```bash
npm install --save @financial-times/anvil-ui-ft-footer
```

Include a footer component in your html template and pass in a data object:

```jsx
import { Footer } from 'anvil-ui-ft-footer'
import footerData from './navigation/footer'

<Footer {...footerData} />
```

The footer component expects data from the [navigation API](https://github.com/Financial-Times/next-navigation-api). The [anvil-server-ft-navigation](../anvil-server-ft-navigation/readme.md) package or its middleware, [anvil-middleware-navigation](../anvil-middleware-ft-navigation/readme.md), can be used to make data from this API available on `response.locals.navigation`.

## Options

The `theme` property defaults to `'dark'`. To  use the alternative `light` theme set `theme: light` at the top level of the footerData or pass the property directly into the component: `<Footer {...footerData} theme="light"/>`.

## Storybook

[Storybook](https://storybook.js.org/) has been configured for all UI packages in Anvil. From the root of the anvil directory, run:

```bash
npm run storybook
```

The storybook will launch on port: 9001. The footer stories will be available under 'FT > Footer'.
