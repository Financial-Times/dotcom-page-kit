# @financial-times/anvil-ui-ft-shell

This module provides a skeleton HTML document structure for FT.com user-facing applications. It includes all the things you can't see and can render metadata, output dehydrated data, load stylesheets, and bootstrap JavaScript.


## Getting started

This module is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ui-ft-shell
```

After installing the package you can use it to wrap your application output. The shell includes the `<html>`, `<head>`, and `<body>` elements so you only need to worry about what's visible to your users.

### Usage with React

If you're using React already in your application you can use the `<Shell />` component wrap your existing components. Using JSX this might look like this:

```jsx
import App from './components/App'
import { Shell } from '@financial-times/anvil-ui-ft-shell'

const document = <Shell {...options}><App /></Shell>
```

### Usage without React

If your application is not using React you can also use the `Shell()` component as a function. The `contents` option is used to provide a prerendered string of HTML.

```js
const app = require('./templates/app.html')
const { Shell } = require('@financial-times/anvil-ui-ft-shell')

const prerenderedHTML = app()
const document = Shell({ contents: prerenderedHTML, ...options })
```

### Rendering to a string

However you are using the shell component you will need to convert the output to a string or stream of HTML to send to your application's users. You can use the `react-dom` package for this:

```js
const ReactDOM = require('react-dom/server')

const outputHTML = ReactDOM.renderToString(document)
```

---

For a full example for how to use this component please refer to the [FT UI example app][example].

[example]: ../../examples/basic-ft-ui


## Usage

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
