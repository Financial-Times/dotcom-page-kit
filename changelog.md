# Changelog

## 0.2.1

- Page Kit CLI: removed chunk hash plugin from base Webpack configuration as it only included instances of `NormalModule` in its algorithm.
- Code splitting plugin: configured plugin to generate more consistent module IDs between installs and builds
- Shell UI component: removed stylesheet resource hints as `<link rel="stylesheet" />` tags will be found by the browser's parser anyway

## 0.2.0

- Layout UI component: (_breaking change_) added header and footer UI component styles
- Header UI component: refactored o-header integration to reduce number of unused styles
- Header UI component: accessibility fixes
- Footer UI component: accessibility fixes
- Shell UI component: (_breaking change_) removed fallback tracking implementation, please integrate the components provided by the `n-tracking` package instead
- Shell UI component: refactored output to reduce cruft in the document `<head>`
- Shell UI component: added exports for sub-components to enable more flexible integrations
- App context package: (_breaking change_) added a `.getAll()` method to retrieve a copy of the context data, please use this instead of accessing the data property directly
- App context package: (_breaking change_) refactored to validate all `.set()` calls and therefore removed the separate `.validate()` method

## 0.1.4

- Handlebars package: added a default value for the `cache` option which will be `true` except in development
- Shell UI component: removed unnecessary resource hint for the Polyfill Service
- Shell UI component: added resource hints for font files
- App context component: added a `console.log()` of the app context data to increase its visibility

## 0.1.3

- Build: fixed path-based chunk hashes resulting in files with the same contents having different names

## 0.1.2

- Shell UI component: fixed incorrect attributes for `<link />` resource hints

## 0.1.1

- Removed n-ui to Page Kit migration guide (it now lives in the wiki!)
- Shell UI component: added `additionalMetadata` option
- Shell UI component: added resource hint meta tags for the configured scripts and stylesheets
- Shell UI component: fixed DNS preconnect tag for ad libraries
- App context middleware: added support for Circle CI version environment variable
- Polyfill Service: removed all unnecessary polyfills from the `.core()` method
- Code splitting plugin: added more libraries to the list of known packages to create separate bundles for

## 0.1.0

- Added n-ui to Page Kit v0.1.0 migration guide ✨
- Polyfill Service UI component: refactored exported properties into functions
- Shell UI component: refactored to include the polyfill service component by default
- Shell UI component: removed `enhancedScripts` and `coreScripts` and replaced with single `scripts` prop
- Shell UI component: added `metaTags` prop
- Sass build plugin: added configurable `includePaths` option
- Sass build plugin: changed the default value of the `includePaths` option from `node_modules/@financial-times` to `node_modules`
- Handlebars package: Renames the `HandlebarsRenderer` class to `PageKitHandlebars`
- React JSX package: Renames the `ReactRenderer` class to `PageKitReactJSX`

## 0.0.x

These initial releases are for testing purposes only.
