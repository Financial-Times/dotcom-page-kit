# @financial-times/anvil-server-html-shell

This module provides a generic HTML document structure and embedded client-side JavaScript bootstrap for your app.


## Installation

```
npm install --save @financial-times/anvil-server-html-shell
```


## Usage

```js
const shell = require('@financial-times/anvil-server-html-shell')

shell({ body: 'Hello World' })
```

## Options

The shell function returns an HTML document ready to send. It supports the following options:

### body (string)

The `<body>` contents to render.

### scriptsToLoad (array)

An optional array of URLs to bundles of JavaScript which are required by the page.

### initialProps (object)

Optional data which can be dehydrated and provided to the client-side.

### htmlAttributes (object)

Optional pairs of attributes and values which can be appended to the document element.

### bodyAttributes (object)

Optional pairs of attributes and values which can be appended to the body element.

### siteTitle (string)

The main title for the site. The `siteTitle` will be included as a `<title>` of the document and shared across pages.

### pageTitle (string)

An optional title associated with the page to render.

## How it works

### Client-side bootstrap

The bootstrap returns JavaScript code which will be executed immediately by the browser when it receives the html for the page. The execution of which delivers the JavaScript and styles required by the page.

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
