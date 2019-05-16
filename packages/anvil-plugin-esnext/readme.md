# Anvil Plugin ESNext

This package extends the [Anvil CLI build action][cli] (`anvil build`) with the ability to build JavaScript that makes use of features that fall under the [`esnext`] banner

[cli]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil#build
[`esnext`]: https://www.freelancinggig.com/blog/2017/07/04/what-is-esnext-is-it-same-as-ecmascript/

## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save-dev @financial-times/anvil-plugin-esnext
```

After installing the package you must add it to the list of plugins in your project's `anvil.config.js` configuration file:

```diff
+ const esnext = require('@financial-times/anvil-plugin-esnext')

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

## Extending

This plugin exposes the following hooks as extension points. They are available as constants on the exported `hooks` object, and they have been listed in the order that they will be executed.

### BABEL_CLASS_PROPERTIES_PLUGIN_OPTIONS

A synchronous hook that exposes the configuration object that will be supplied to the [@babel/plugin-proposal-class-properties] plugin. You may directly mutate this object.

[@babel/plugin-proposal-class-properties]: https://babeljs.io/docs/en/babel-plugin-proposal-class-properties

### BABEL_TRANSFORM_RUNTIME_PLUGIN_OPTIONS

A synchronous hook that exposes the configuration object that will be supplied to the [@babel/plugin-transform-runtime] plugin. You may directly mutate this object.

[@babel/plugin-transform-runtime]: https://babeljs.io/docs/en/babel-plugin-transform-runtime

### BABEL_SYNTAX_DYNAMIC_IMPORT_PLUGIN_OPTIONS

A synchronous hook that exposes the configuration object that will be supplied to the [@babel/plugin-syntax-dynamic-import] plugin. You may directly mutate this object.

[@babel/plugin-syntax-dynamic-import]: https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import
