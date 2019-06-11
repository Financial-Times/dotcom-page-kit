# @financial-times/anvil-ft-app-context <!-- omit in toc -->

This package provides methods for integrating app context data into your server-side rendered pages and safely retrieving it again in the browser.

## Contents <!-- omit in toc -->

- [Installation](#installation)
- [General Usage](#general-usage)
  - [Server-side integration](#server-side-integration)
    - [Registering the middleware](#registering-the-middleware)
    - [Embedding the app context data within a html string](#embedding-the-app-context-data-within-a-html-string)
    - [Embedding app context data as data attributes of the html tag](#embedding-app-context-data-as-data-attributes-of-the-html-tag)
    - [Embedding app context within a react component](#embedding-app-context-within-a-react-component)
  - [Client-side integration](#client-side-integration)
    - [Accessing the app context data](#accessing-the-app-context-data)
- [Server-side API](#server-side-api)
  - [middleware()](#middleware)
  - [AppContextEmbed](#appcontextembed)
    - [Props](#props)
      - [context](#context)
  - [AppContextClient](#appcontextclient)
    - [Constructor args](#constructor-args)
    - [Properties](#properties)
      - [.data](#data)
    - [Methods](#methods)
      - [.add(additionalAppContext: Partial\<TAppContext\>)](#addadditionalappcontext-partialtappcontext)
      - [.get(item: string)](#getitem-string)
      - [.toEmbedString()](#toembedstring)
      - [.toLegacyDataAttributesString()](#tolegacydataattributesstring)
      - [.toLegacyDataAttributesObject()](#tolegacydataattributesobject)
- [Client-side API](#client-side-api)
  - [init()](#init)
  - [AppContextClient](#appcontextclient-1)
    - [Constructor args](#constructor-args-1)
    - [Properties](#properties-1)
      - [.data](#data-1)
    - [Methods](#methods-1)
      - [.get(item: string)](#getitem-string-1)
- [About the legacy data attributes support](#about-the-legacy-data-attributes-support)
- [Types](#types)
  - [TAppContext](#tappcontext)

## Installation

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ft-app-context
```

## General Usage

### Server-side integration

#### Registering the middleware

In order to make the app context data available to your express routes, you will first need to register the app context middleware with your application:

```js
const express = require('express')
const appContextMiddleware = require('@financial-times/anvil-middleware-app-context')

app.use(appContextMiddleware.init())
```

Once registered, you will be able to access the [app context client] at `response.locals.appContext`. The [app context client] instance contains methods that can be used to retrieve the app context data in various formats.

For more information on the options that the app context middleware accepts, see the the [anvil-middleware-app-context] package

[anvil-middleware-app-context]: ../anvil-middleware-app-context/readme.md

#### Embedding the app context data within a html string
To embed the app context data within a string of html, use the [`toEmbedString()`](#toembedstring) method of the [app context client] as follows:

```js
const express = require('express')
const appContextMiddleware = require('@financial-times/anvil-middleware-app-context')

app.use(appContextMiddleware.init())

app.get('/', (req, res) => {
  const appContext = response.locals.appContext

  const contents = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>My Amazing Website</title>
        ${appContext.toEmbedString()}
      </head>
      <body>
        ...
      </body>
    </html>
  `

  res.send(contents)
})
```

#### Embedding app context data as data attributes of the html tag

To embed the app context as data attributes of the `<html>` tag, use the [`toLegacyDataAttributesString()`](#tolegacydataattributesstring) method of the app context client:

```js
const express = require('express')
const appContextMiddleware = require('@financial-times/anvil-middleware-app-context')

app.use(appContextMiddleware.init())

app.get('/', (req, res) => {
  const { appContext } = response.locals

  const contents = `
    <!DOCTYPE html>
    <html ${appContext.toLegacyDataAttributesString()}>
      ...
    </html>
  `

  res.send(contents)
})
```

#### Embedding app context within a react component

When rendering with React, use the `AppContext` component and / or the `toLegacyDataAttributesObject()` method to embed the app context data into the rendered html string:

```jsx
// NOTE: This example assumes a JSX supported environment

import express from 'express'
import appContextMiddleware from '@financial-times/anvil-middleware-app-context'
import { AppContextEmbed } from '@financial-times/anvil-app-context'
import { renderToString } from 'react-dom/server'

app.use(appContextMiddleware.init())

app.get('/', (req, res) => {
  const { appContext } = response.locals
  const htmlDataAttributes = appContext.toLegacyDataAttributesObject()

  const Page = (
    <html {...htmlDataAttributes}>
      <head>
        <meta charSet="utf-8" />
        <title>My Amazing Website</title>
        <AppContextEmbed context={appContext.data}/>
      </head>
      <body>
        ...
      </body>
    </html>
  )
```

### Client-side integration

#### Accessing the app context data

Once the html is being delivered to the client with the app context data embedded within it, the app context client can then be used client-side to retrieve the app context data as follows.

```js
import * as appContext from '@financial-times/anvil-ft-app-context'

const appContextClient = appContext.init()
const abTestState = appContextClient.get('abTestState')
const appContextData = appContextClient.data
```

## Server-side API

### middleware()

An [express] compatible middleware function that makes the [app context client] available at `response.locals.appContext` within an express app route.

---

### AppContextEmbed

A react component that can be used to embed the app context data within a html page

```jsx
import { AppContextEmbed } from '@financial-times/anvil-ft-app-context'

const Page = ({ appContext }) => (
  <html>
    <head>
      <title>Some Page</title>
      <AppContextEmbed context={appContext} />
    </head>
    <body>
      ...
    </body>
  </html>
)
```

#### Props

##### context

The [app context data object] that should be embedded within the html page

---

### AppContextClient

A class that contains methods and properties that allow for amending the app context data and retrieving it in various formats.

```js
import { AppContextClient } from '@financial-times/anvil-ft-app-context'

const appContext = new AppContextClient({ context })
```

#### Constructor args

An object with the following properties

| Property | Type        | Required | Description                        |
| -------- | ----------- | -------- | ---------------------------------- |
| context  | TAppContext | optional | An initial app context data object |


#### Properties

##### .data

The [app context data object]

#### Methods

##### .add(additionalAppContext: Partial\<TAppContext\>)

Adds additional properties to the [app context data object]

```js
const appContext = new AppContextClient({ context: initialAppContext })
const additionalContext = { contentId: '123' }

appContext.add(additionalContext)

expect(appContext.data).toEqual({ ...initialAppContext, ...additionalContext  })
```

##### .get(item: string)

Returns the value of the equivalent app context data property

```js
const context = { appVersion: '123' }
const appContext = new AppContextClient({ context })
const result = appContext.get('appVersion')

expect(result).toBe(context.appVersion)
```

##### .toEmbedString()

Returns the app context embed string. This string is meant to be outputted within the html head as follows:

```js
const Page = `
  <html>
    <head>
      <title>Some Page</title>
      ${appContext.toEmbedString()}
    </head>
    <body>...</body>
  </html>
`
```


##### .toLegacyDataAttributesString()

Returns the app context formatted as a data attributes string whose attribute names are in the legacy format for backwards compatibility. It is meant to be used as follows:


```js
const Page = `
  <html ${appContext.toLegacyDataAttributesString()}>
    ...
  </html>
`
```


##### .toLegacyDataAttributesObject()

Returns the app context data as an object whose keys represent are camel cased data attribute names. This object is meant to be supplied as props to the `<html>` tag of a [react] / [JSX] component.

```jsx
const Page = () => (
  const appContextDataAttributes = appContext.toLegacyDataAttributesObject()

  <html {...appContextDataAttributes}>
    ...
  </html>
)
```

---

## Client-side API

### init()

A function that returns an `AppContext` client instance which contains properties and methods for interacting with the embedded app context data.

```js
import { init } from '@financial-times/anvil-ft-app-context'

const appContextClient = init()
const abTestState = appContextClient.get('abTestState)
```

---

### AppContextClient

A class that contains methods and properties that allow for amending the app context data and retrieving it in various formats.

```js
import { AppContextClient } from '@financial-times/anvil-ft-app-context'

const appContext = new AppContextClient({ context })
```

#### Constructor args

An object with the following properties

| Property | Type        | Required | Description                        |
| -------- | ----------- | -------- | ---------------------------------- |
| context  | TAppContext | optional | An initial app context data object |


#### Properties

##### .data

The [app context data object]

#### Methods

##### .get(item: string)

Returns the value of the equivalent app context data property

```js
const context = { appVersion: '123' }
const appContext = new AppContextClient({ context })
const result = appContext.get('appVersion')

expect(result).toBe(context.appVersion)
```

---

## About the legacy data attributes support

The `toLegacyDataAttributesString()` and `toLegacyDataAttributesObject()` methods exists for the sake of backwards compatibility. As such, when used, they will result in attributes names that do not match that of the app context data properties. Instead the attribute names will be the legacy names. So in other words, instead of ending up with this:

```html
<html 
  data-app="article"
  data-edition="uk"
  data-is-production
  data-ab-state="subscriberCohort:on,premiumCohort:on,nonUSACohort:on..."
  data-version="882797258625531f20d604f6441ef8cfcb2d772b"
  data-content-id="c5935758-7730-11e9-bbad-7c18c0ea0201"
  data-publish-reference="tid_17wmwszvk3"
  data-content-type="article">
  ...
</html>
```

You will end up with this:

```html
<html 
  data-next-app="article"
  data-next-edition="uk"
  data-next-is-production
  data-ab-state="subscriberCohort:on,premiumCohort:on,nonUSACohort:on..."
  data-next-version="882797258625531f20d604f6441ef8cfcb2d772b"
  data-content-id="c5935758-7730-11e9-bbad-7c18c0ea0201"
  data-publish-reference="tid_17wmwszvk3"
  data-content-type="article">
  ...
</html>
```

## Types

### TAppContext

An object with the following properties

| Property         | Type    | Required | Description                                                                                      |
| ---------------- | ------- | -------- | ------------------------------------------------------------------------------------------------ |
| appName          | string  | required | The app name                                                                                     |
| appVersion       | string  | required | The version of the app (usually a Git commit hash)                                               |
| product          | string  | required | The product name                                                                                 |
| abTestState      | string  | required | The AB test flags data as a comma delimited string (e.g., subscriberCohort:on,premiumCohort:off) |
| edition          | string  | required | The site edition                                                                                 |
| contentId        | string  | optional | The UUID of the content                                                                          |
| contentType      | string  | optional | The type of the content being featured                                                           |
| conceptId        | string  | optional | The concept UUID                                                                                 |
| conceptType      | string  | optional | A URL that represents the concept type                                                           |
| isProduction     | boolean | required | Whether or not the app is being run in the production environment                                |
| publishReference | string  | optional | The publish reference for the content                                                            |
| contentType      | string  | optional | The type of the content being featured                                                           |

[jsx]: https://reactjs.org/docs/introducing-jsx.html
[react]: https://reactjs.org/
[express]: https://expressjs.com/
[app context client]: #app-context-client-api
[app context data object]: #tappcontext
