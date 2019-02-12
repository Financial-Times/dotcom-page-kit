# @financial-times/anvil-ui-ft-header

This package provides components which return variations on the header component for ft.com.


### Getting started

This module is compatible with Node 10+ and is distributed on npm.

```bash
npm install --save @financial-times/anvil-ui-ft-header
```

Include a header component in your html template and pass in a data object:

```jsx
import { HeaderSimple } from 'anvil-ui-ft-header'
import headerData from './navigation/header'

<HeaderSimple {...headerData} />
```

The header component expects data from the [navigation API](https://github.com/Financial-Times/next-navigation-api). The [anvil-server-ft-navigation](../anvil-server-ft-navigation/readme.md) package or its middleware, [anvil-middleware-navigation](../anvil-middleware-ft-navigation/readme.md), can be used to make data from this API available on `response.locals.navigation`.

## Options

//TODO

## Storybook

[Storybook](https://storybook.js.org/) has been configured for all UI packages in Anvil. From the root of the anvil directory, run:

```bash
npm run storybook
```

The storybook will launch on port: 9001. The header stories will be available under 'FT > Header'.
