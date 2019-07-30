# Changelog

## 0.1.0

- Added n-ui to Page Kit v0.1.0 migration guide ✨
- Polyfill Service UI component: refactored exported properties into functions
- Shell UI component: refactored to include the polyfill service component by default
- Shell UI component: removed `enhancedScripts` and `coreScripts` and replaced with single `scripts` prop
- Sass build plugin: added configurable `includePaths` option
- Sass build plugin: changed the default value of the `includePaths` option from `node_modules/@financial-times` to `node_modules`
- Handlebars package: Renames the `HandlebarsRenderer` class to `PageKitHandlebars` 
- React JSX package: Renames the `ReactRenderer` class to `PageKitReactJSX`

## 0.0.x

These initial releases are for testing purposes only.
