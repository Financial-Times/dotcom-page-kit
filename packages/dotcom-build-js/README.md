# @financial-times/dotcom-build-js

This package exports a Webpack plugin to configure it with the ability to build JavaScript that makes use of features that are specific to [ft.com].

[ft.com]: https://www.ft.com/

## Getting started

This module is compatible with Node 12+ and is distributed on npm.

```
npm install --save-dev @financial-times/dotcom-build-js
```

After installing the module you must add it to the list of plugins in your project's `webpack.config.js` configuration file:

```diff
+ const { PageKitJsPlugin } = require('@financial-times/dotcom-build-js')

module.exports = {
  plugins: [
+    new PageKitJsPlugin(options)
  ]
}
```

## Babel

This plugin configures [Babel](https://babeljs.io/) to compile JavaScript syntax and features that aren't supported by every browser into JavaScript that is. The browsers we target are:

* the last 2 versions of Chrome
* the last 2 versions of Edge
* Safari 9.1
* Firefox Extended Support Release (currently v68)
* Internet Explorer 11

As well as features in current JavaScript standards, we also compile these non-standard features:

* [JSX](https://reactjs.org/docs/introducing-jsx.html)
* [Typescript](https://www.typescriptlang.org/)
* [Class properties](https://github.com/tc39/proposal-class-public-fields)
* [Dynamic import syntax](https://developers.google.com/web/updates/2017/11/dynamic-import)

`dotcom-build-js` can be configured with [options](#options). Other methods of configuring Babel are not supported by Page Kit, because it's possible to produce output that doesn't work in the browsers we support, or to hurt performance by producing inconsistent output between apps, reducing caching effectiveness.

## Options

| Option                 | Type    | Default      | Description                                                          |
|------------------------|---------|--------------|----------------------------------------------------------------------|
| `jsxPragma`            | String  | `"h"`        | See https://babeljs.io/docs/en/babel-preset-react#pragma             |
| `jsxPragmaFrag`        | String  | `"Fragment"` | See https://babeljs.io/docs/en/babel-preset-react#pragmafrag         |

[1]: https://www.npmjs.com/package/babel-plugin-transform-require-default
