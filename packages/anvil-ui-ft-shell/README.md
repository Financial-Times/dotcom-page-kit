# @financial-times/anvil-ui-ft-shell

This module provides a basic HTML document structure and client-side JavaScript bootstrap for ft.com apps.


## Installation

```
npm install --save @financial-times/anvil-ui-ft-shell
```


## Usage

TBD


## Client-side bootstrap

Code which is executed immediately by the browser to deliver the JavaScript and styles required by the page.

### JS/No JS

The shell HTML has the default class `no-js`. If JavaScript is available the class will be replaced with `js`.

### Enhanced/Core

The shell HTML has the default class `core`. If the browser passes the cuts the mustard test the class will be replaced with `enhanced`.

#### Cuts the mustard

Cuts the mustard is a function which uses feature detection to determine if a browser is capable of supporting the JavaScript-enhanced experience.

#### Script loading

When serving an enhanced experience the configured script bundles will be asyncronously loaded and executed in order.

#### Polyfill service

The [Polyfill service](https://polyfill.io) is included on both core and enhanced experiences.
