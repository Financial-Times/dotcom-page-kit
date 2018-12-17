# @financial-times/anvil-ui-ft-shell

This module provides a skeleton HTML document structure and client-side JavaScript bootstrap for ft.com apps.


## Installation

```
npm install --save @financial-times/anvil-ui-ft-shell
```


## Usage

TBD

## Options

The Shell returns a string of HTML which can be sent to the browser.

### scriptsToLoad (array)

An array of URLs to bundles of JavaScript which are required by the page.

### initialProps (object)

// TODO

### body (string)

The page <body> contents.

### siteTitle (string)

The main title for the site. The `siteTitle` will be included as a `<title>` of the document and shared across pages.

### pageTitle (string)

The title associated with the page to render.

### htmlAttributes (object)

Properties in `htmlAttributes` are assigned to elements in the `html`.

### bodyAttributes (object)

Properties in `bodyAttributes` are assigned to elements in the `body`.


## How it works

### Client-side bootstrap

Code which is executed immediately by the browser to deliver the JavaScript and styles required by the page.

#### JS/No JS

The shell HTML has the default class `no-js`. If JavaScript is available the class will be replaced with `js`.

#### Enhanced/Core

The shell HTML has the default class `core`. If the browser passes the cuts the mustard test the class will be replaced with `enhanced`.

#### Cuts the mustard

Cuts the mustard is a function which uses feature detection to determine if a browser is capable of supporting the JavaScript-enhanced experience.

#### Script loading

When serving an enhanced experience the configured script bundles will be asyncronously loaded and executed in order.

#### Polyfill service

The [Polyfill service](https://polyfill.io) is included on both core and enhanced experiences.
