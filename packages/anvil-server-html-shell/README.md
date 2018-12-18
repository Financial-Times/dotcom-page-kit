# @financial-times/anvil-server-html-shell

This module provides a generic HTML document structure and embedded client-side JavaScript bootstrap for your app.


## Installation

```
npm install --save @financial-times/anvil-server-html-shell
```


## Usage

// TODO
Usage TBD

## Options

The Shell returns a a JSX component. It supports the following options:

### body (string)

The page <body> contents.

### scriptsToLoad (array)

An array of URLs to bundles of JavaScript which are required by the page.

### initialProps (object)

// TODO

### siteTitle (string)

The main title for the site. The `siteTitle` will be included as a `<title>` of the document and shared across pages.

### pageTitle (string)

The title associated with the page to render.


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
