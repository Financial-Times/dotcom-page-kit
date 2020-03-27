# @financial-times/dotcom-ui-base-styles

This new package provides the global document styles for FT.com, including normalisation styles, basic typography, focus states, and `o-grid`.

_Please note_ the initial goal of this package is to centralise all of the required pieces for the progressive font loading technique provided by [`o-typography`](https://github.com/Financial-Times/o-typography/#progressive-loading-web-fonts) and create a placeholder for the future inclusion of global styles from `n-ui-foundations`.


## Getting started

This package is compatible with Node 12+ and is distributed on npm.

```bash
npm install --save @financial-times/dotcom-ui-base-styles
```

After installing the package you can use it to embed the progressive font loading hooks and document styles into your pages on the server-side and initialise the font loading on client-side.

### Server-side

If you are using React to render your app you should use the `LoadFontsEmbed` component along with the `loadCustomFontsClassNames` and `documentStyles` variables to integrate font loading and document styles with your pages:

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

Otherwise you can insert the code snippet into a `<script>` element:

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

### Client-side

Once you are rendering the styles, class names, and code snippets in your page you will need to initialise the client-side code.

To initialise the client-side JavaScript import the package and call the `.init()` method:

```js
import * as baseStyles from '@financial-times/dotcom-ui-base-styles'

baseStyles.init()
```

This component also provides styles written in Sass which should be imported into your application's main Sass stylesheet:

```scss
@import '@financial-times/dotcom-ui-base-styles/styles';
```
