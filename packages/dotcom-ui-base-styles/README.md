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

The package exports a `documentStyles` object, which should be rendered as the `style` attribute on the `<html>` tag. For example, if using React:

```jsx
import {
  documentStyles
} from '@financial-times/dotcom-ui-base-styles'

export default (props) => (
  <html style={documentStyles}>
    ...
  </html>
)
```

### Components

> [!WARNING]
> `n-ui-foundations`, the predecessor of `dotcom-ui-base-styles`, provided common Origami dependencies for apps and components. `dotcom-ui-base-styles` only supports apps. For components, you should directly depend on and use the Origami components you require.
