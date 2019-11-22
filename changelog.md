# Changelog

## 0.4.0

- Page Kit CLI: added compression plugins to enable generation of compressed assets using the gzip and Brotli algorithms.
- Asset loader: (_breaking change_) removed `match*` methods
- Shell UI component: added `asyncStylesheets` prop to enable non-blocking stylesheet loading.
- Shell UI component: added `manifestFile` prop to add a meta element linking to a web app manifest
- Layout UI component: (_breaking change_) refactored the `header` prop into separate `headerVariant` and `headerComponent` props.
- Layout UI component: (_breaking change_) refactored the `footer` prop into separate `footerVariant` and `footerComponent` props.
- Layout UI component: we have updated our integration guide to encourage the styles for this component to be compiled separately.
- Header UI component: (_breaking change_) renamed `disableSticky` prop to `showStickyHeader` for consistency
- Header UI component: added `showMegaNav` prop to enable the mega nav to be disabled
- Header UI component: refactored the logo as an inline SVG
- Footer UI component: updated legal text to match `o-footer` demo
- (_breaking change_) removed the unused CSS build package
- (_breaking change_) removed the unused esnext build package

Please refer to the [0.3.x to 0.4.x migration guide](https://github.com/Financial-Times/dotcom-page-kit/wiki/Upgrading-from-0.3.x-to-0.4.x) for more details.

## 0.3.5

- Handlebars package: Add `'views'` folder name to default partial view glob

## 0.3.4

- Sass build plugin: Updates `cssLoaderOptions` to enable `@import` to include CSS files

## 0.3.3 ❌

Please do not use this version, we accidentally included some breaking changes intended for the v0.4.0 release. Upgrade from v0.3.2 directly to v0.3.4.

## 0.3.2

- Layout UI component: fixed output of header drawer component when an incompatible header is used

## 0.3.1

- Asset loader: fixed URL path concatenation to avoid double slashes
- Layout UI component: fixed accidental usage of ES6 syntax in font loading snippet

## 0.3.0

- Sass plugin: Upgraded to use `sass-loader` v8
- Handlebars package: added a new `{{#capture}}` helper to aid JSX and Handlebars interoperability
- Navigation middleware: refactored to fail silently when fetching sub-navigation data
- Navigation middleware: refactored to normalize URLs before fetching sub-navigation data
- App context package: added `isUserLoggedIn` property to schema
- App context middleware: added `isUserLoggedIn` property based on header data
- App context middleware: (_breaking change_) renamed `context` option to `appContext` to disambiguate
- App context UI component: (_breaking change_) renamed `context` prop to `appContext` to disambiguate
- Shell UI component: (_breaking change_) renamed `context` prop to `appContext` to disambiguate
- Shell UI component: updated the default `robots` prop to include new preview settings
- Shell UI component: added Google Tag Manager initialisation scripts (behind the `enableGTM` flag)

Please refer to the [0.2.x to 0.3.x migration guide](https://github.com/Financial-Times/dotcom-page-kit/wiki/Upgrading-from-0.2.x-to-0.3.x) for more details.


## 0.2.3

- Code splitting plugin: fixed configuration for `superstore` dependencies so they create one chunk
- Handlebars package: unpinned Handlebars dependency as upstream errors have now been fixed

## 0.2.2

- Code splitting plugin: removed Babel helper bundle and updated bundle configuration to improve consistency of content hashes.
- Code splitting plugin: added `next-` prefixed packages to code splitting configuration
- Navigation middleware: added support for vanity URL headers appended by the CDN or `next-router`
- React JSX package: fixed incorrect output format for distributable JS
- Handlebars package: pinned Handlebars dependency to v4.2.x to avoid type errors in latest release

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

- Page Kit CLI: fixed path-based chunk hashes resulting in files with the same contents having different names

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
