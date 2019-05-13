# @financial-times/anvil-plugin-ft-js

This module extends the [Anvil CLI build action][cli] (`anvil build`) with the ability to build JavaScript that makes use of features that are specific to [ft.com]

[cli]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil#build
[ft.com]: https://www.ft.com/

## Getting started

This module is compatible with Node 8+ and is distributed on npm.

```
npm install --save-dev @financial-times/anvil-plugin-ft-js
```

After installing the module you must add it to the list of plugins in your project's `anvil.config.js` configuration file:

```diff
+ const js = require('@financial-times/anvil-plugin-ft-js')

module.exports = {
  plugins: [
+    js.plugin()
  ]
}
```

Once setup, this plugin will enable you to use the following features within your JavaScript code. 

* [JSX](https://reactjs.org/docs/introducing-jsx.html)
* [Typescript](https://www.typescriptlang.org/)
* [Class properties](https://github.com/tc39/proposal-class-public-fields)
* [Dynamic import syntax](https://developers.google.com/web/updates/2017/11/dynamic-import)



## Options

- **jsxPragma**: (Defaults to `h`) See https://babeljs.io/docs/en/babel-preset-react#pragma
- **jsxPragmaFrag**: (Defaults to `Fragment`) See https://babeljs.io/docs/en/babel-preset-react#pragmafrag


## Hooks

This plugin exposes the following hooks as extension points. They are available as constants on the exported `hooks` object, and they have been listed in the order that they will be executed.

### BABEL_PRESET_REACT_OPTIONS

A synchronous hook that exposes the configuration object that will be supplied to the [@babel/preset-react] plugin. You may directly mutate this object.

[@babel/preset-react]: https://babeljs.io/docs/en/babel-preset-react

### BABEL_PRESET_TYPESCRIPT_OPTIONS

A synchronous hook that exposes the configuration object that will be supplied to the [@babel/preset-typescript] plugin. You may directly mutate this object.

[@babel/preset-typescript]: https://babeljs.io/docs/en/babel-preset-typescript

### BABEL_PLUGIN_PROPOSAL_CLASS_PROPERTIES_OPTIONS

A synchronous hook that exposes the configuration object that will be supplied to the [@babel/plugin-proposal-class-properties] plugin. You may directly mutate this object.

[@babel/plugin-proposal-class-properties]: https://babeljs.io/docs/en/babel-plugin-proposal-class-properties

### BABEL_PLUGIN_TRANSFORM_RUNTIME_OPTIONS

A synchronous hook that exposes the configuration object that will be supplied to the [@babel/plugin-transform-runtime] plugin. You may directly mutate this object.

[@babel/plugin-transform-runtime]: https://babeljs.io/docs/en/babel-plugin-transform-runtime

### BABEL_PLUGIN_SYNTAX_DYNAMIC_IMPORT_OPTIONS

A synchronous hook that exposes the configuration object that will be supplied to the [@babel/plugin-syntax-dynamic-import] plugin. You may directly mutate this object.

[@babel/plugin-syntax-dynamic-import]: https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import
