# @financial-times/dotcom-ui-base-styles

This package provides the global document styles for FT.com, including normalisation styles, basic typography, and grid styles, provided by [Origami](https://github.com/financial-times/origami) components.

## Getting started

```bash
npm install --save @financial-times/dotcom-ui-base-styles
```

After installing the package you can use it to embed the progressive font loading hooks and document styles into your pages on the server-side and initialise the font loading on client-side.

## Usage in apps

### Styles

`dotcom-ui-base-styles` provides styles which should be imported into your application's main stylesheet:

```scss
@import '@financial-times/dotcom-ui-base-styles/styles';
```

### Critical styles and font preloading

`dotcom-ui-base-styles` allows apps to HTTP-preload Origami's fonts, and provides baseline styles to be rendered as a `style` attribute on the `<html>` tag, to reduce [flash of unstyled content (FOUC)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content).

If you are using React to render your app, render the `LoadFontsEmbed` component along with the `loadCustomFontsClassNames` and `documentStyles` variables to integrate font loading and document styles with your pages:

```jsx
import {
  documentStyles
  LoadFontsEmbed,
  loadCustomFontsClassNames
} from '@financial-times/dotcom-ui-base-styles'

export default (props) => (
  <html className={loadCustomFontsClassNames} style={documentStyles}>
    <head>
      <meta charSet="utf-8" />
      <title>My Amazing Website</title>
      <LoadFontsEmbed />
    </head>
    <body>
      ...
    </body>
  </html>
)
```

Otherwise, you can insert the code snippet into a `<script>` element:

```js
const {
  documentStyles
  loadCustomFontsJS,
  loadCustomFontsClassNames
} = require('@financial-times/dotcom-ui-base-styles')

function page() {
  return `<!DOCTYPE html>
    <html className=${loadCustomFontsClassNames} style=${documentStyles}>
    <head>
      <meta charset="utf-8">
      <title>My Amazing Website</title>
      <script>${loadCustomFontsJS}</script>
    </head>
    <body>
      ...
    </body>
  </html>`
}
```

### Client-side Javascript

`dotcom-ui-base-styles`'s font loader requires client-side Javascript to work. Import the package in your client-side entry point, and call the `.init()` method:

```js
import * as baseStyles from '@financial-times/dotcom-ui-base-styles'

baseStyles.init()
```

### Components

> [!WARNING]
> `n-ui-foundations`, the predecessor of `dotcom-ui-base-styles`, provided common Origami dependencies for apps and components. `dotcom-ui-base-styles` only supports apps. For components, you should directly depend on and use the Origami components you require.
