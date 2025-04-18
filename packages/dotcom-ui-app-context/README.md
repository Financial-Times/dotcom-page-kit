# @financial-times/dotcom-ui-app-context

This package provides methods for embedding [app tracking context data] into your server-side rendered pages and safely retrieving it again in the browser.

[app tracking context data]: ../dotcom-server-app-context/schema.md

This package is _only_ for tracking context data. Any data you embed using it will be sent with clientside Spoor tracking events. If you want to share generic application-specific data with the client, consider using [@financial-times/dotcom-ui-data-embed](../dotcom-ui-data-embed).

## Getting started

This package is compatible with Node 12+ and is distributed on npm.

```sh
npm install --save @financial-times/dotcom-ui-app-context
```

After installing the package you can use it to embed app-context data into your pages on the server-side. This data can then be retrieved and used in your client-side code.


### Server-side integration

If you are using React to render your app you can use the `AppContextEmbed` component to integrate the app context data with your pages:

```jsx
import { AppContextEmbed } from '@financial-times/dotcom-ui-app-context'
const appContext = { appName: 'app-name', contextProperty: 'my-property' }

export default (props) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>My Amazing Website</title>
    </head>
    <body>
      ...
      <AppContextEmbed appContext={appContext} />
    </body>
  </html>
)
```

Otherwise you can insert a JSON formatted string into a `<script>` element with an ID of `page-kit-app-context`.

```js
function page() {
  return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>My Amazing Website</title>
    </head>
    <body>
      ...
      <script type="application/json" id="page-kit-app-context">
        {"appName":"app-name","contextProperty":"my-property"}
      </script>
    </body>
  </html>`
}
```


### Client-side integration

Once you are delivering the [app context data] with your pages you can use the [app context client](#client-side-api) in your client-side code. The client provides methods for safely retrieving the status of individual context properties.

```js
import * as appContext from '@financial-times/dotcom-ui-app-context'

const appContext = appContext.init()

if (appContext.get('my-context-property')) {
  ...
}
```


## Client-side API

### `init()`

Initialises and returns a new [app context client](#app-context-client-api) which can be used to safely access the status of individual contexts.


## App context client API

### `get(property: string)`

Returns the value of the requested property. If the property is not found this will return `undefined`.

### `getAll()`

Returns all app context data.

_Please note_ that the [app context data] object is frozen so it cannot be modified.
