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
+ const js = require('@financial-times/dotcom-build-js')

module.exports = {
  plugins: [
+    js.plugin(options)
  ]
}
```

Once setup, this plugin will enable you to use the following features within your JavaScript code:

* [JSX](https://reactjs.org/docs/introducing-jsx.html)
* [Typescript](https://www.typescriptlang.org/)
* [Class properties](https://github.com/tc39/proposal-class-public-fields)
* [Dynamic import syntax](https://developers.google.com/web/updates/2017/11/dynamic-import)

## Options

| Option                 | Type    | Default      | Description                                                          |
|------------------------|---------|--------------|----------------------------------------------------------------------|
| `jsxPragma`            | String  | `"h"`        | See https://babeljs.io/docs/en/babel-preset-react#pragma             |
| `jsxPragmaFrag`        | String  | `"Fragment"` | See https://babeljs.io/docs/en/babel-preset-react#pragmafrag         |

[1]: https://www.npmjs.com/package/babel-plugin-transform-require-default
