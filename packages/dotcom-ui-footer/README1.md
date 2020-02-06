# @financial-times/dotcom-ui-footer

This package provides components which render variations on the footer component for FT.com.


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```bash
npm install --save @financial-times/dotcom-ui-footer
```

After installing the package you will need to configure your application to fetch data from the [Next Navigation API] required to render these UI components. Page Kit provides two packages for this:

1. [`dotcom-middleware-navigation`] (if you are using Express)
2. [`dotcom-server-navigation`] (if you are not using Express)

[Next Navigation API]: http://github.com/Financial-Times/next-navigation-api
[`dotcom-middleware-navigation`]: ../dotcom-middleware-navigation/readme.md
[`dotcom-server-navigation`]: ../dotcom-server-navigation/readme.md

### Server-side

This package provides two UI components to render different parts and styles of the FT.com footer:

- `<Footer />` the full footer with all navigation links and branding.
- `<LegalFooter />` a simple footer used to brand pages and link to the necessary legal pages.

Example:

```jsx
import { Footer } from '@financial-times/dotcom-ui-footer'

<Footer data={navigationData} />
```

_Please note_ that the footer components are designed to be used on the server-side and should not be rendered on the client-side. Although it is possible to render them on the client-side there is usually no reason to do so and it's not officially supported.

### Client-side

Once you are rendering the footer components in your page you will need to initialise the client-side code to add styles and interactive behaviour.

To initialise the client-side JavaScript import the package and call the `.init()` method:

```js
import * as footer from '@financial-times/dotcom-ui-footer'

footer.init()
```

This component includes styles written in Sass which can be imported into your application's main Sass stylesheet.

```scss
@import '@financial-times/dotcom-ui-footer/styles';
```

_Please note_ that the exact usage of styles will depend on how you configure your Sass compiler.


## Options

All variants require a props object to be passed to the footer component. The component can be configured by setting properties on this object or by passing the desired property directly into the component: `<Footer {...footerData} theme="light"/>`.

|    PROP    |  TYPE   | DEFAULT |                                      DESCRIPTION                                      |
| ---------- | ------- | ------- | ------------------------------------------------------------------------------------- |
| theme      | string  | 'dark'  | Serve the specified variant of the footer - the `light` theme is a valid alternative. |
| legal-only | boolean | false   | Serve the shorter, 'legal-only' variant of the footer                                 |
| data       | object  |         | Navigation data for rendering the footer links fetched from the navigation API        |
