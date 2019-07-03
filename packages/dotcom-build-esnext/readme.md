# @financial-times/dotcom-build-esnext

This package extends the [Page Kit CLI build action][cli] (`page-kit build`) with the ability to build JavaScript that makes use of features that fall under the [`esnext`] banner

[cli]: https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-page-kit-cli#build
[`esnext`]: https://www.freelancinggig.com/blog/2017/07/04/what-is-esnext-is-it-same-as-ecmascript/


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/dotcom-build-esnext
```

After installing the package you must add it to the list of plugins in your project's `page-kit.config.js` configuration file:

```diff
+ const esnext = require('@financial-times/dotcom-build-esnext')

module.exports = {
  plugins: [
+    esnext.plugin()
  ]
}
```

Once setup, this plugin will enable you to use the following `esnext` features within your JavaScript code.

* [Class properties](https://github.com/tc39/proposal-class-public-fields)
* [Dynamic import syntax](https://developers.google.com/web/updates/2017/11/dynamic-import)


## Options

There are currently no additional options for this plugin.


## Hooks

This plugin exposes the following hooks as extension points. They are available as constants on the exported `hooks` object.

```js
import { hooks } from '@financial-times/dotcom-build-esnext'
```

_Please note: The hooks below are listed in the order they will be executed._

### `BABEL_PLUGIN_CLASS_PROPERTIES_OPTIONS`

Configuration options for the [@babel/plugin-proposal-class-properties] plugin.

[@babel/plugin-proposal-class-properties]: https://babeljs.io/docs/en/babel-plugin-proposal-class-properties

### `BABEL_PLUGIN_SYNTAX_DYNAMIC_IMPORT_OPTIONS`

Configuration options for the [@babel/plugin-syntax-dynamic-import] plugin.

[@babel/plugin-syntax-dynamic-import]: https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import

### `BABEL_PLUGIN_TRANSFORM_RUNTIME_OPTIONS`

Configuration options for the [@babel/plugin-transform-runtime] plugin.

[@babel/plugin-transform-runtime]: https://babeljs.io/docs/en/babel-plugin-transform-runtime
