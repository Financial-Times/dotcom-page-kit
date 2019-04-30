# @financial-times/anvil-ui-ft-flags

This package provides methods for integrating flags data into your server-side rendered pages and safely retrieving it again in the browser.


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ui-ft-flags
```

After installing the package you can use it to embed flags data into your pages on the server-side. This data can then be retrieved and used in your client-side code using the included flags client.

### Server-side integration

If you are using React to render your app you should use the `Flags` component:

```jsx
import { Flags } from '@financial-times/anvil-ui-ft-flags'

export default (props) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>My Amazing Website</title>
      <Flags flags={props.flagsData} />
    </head>
    <body>
      ...
    </body>
  </html>
)
```

Otherwise you can insert a JSON formatted string into a `<script>` element with an ID of `anvil-flags-data`. You can use the `.formatFlagsJSON()` method to help with this.

```js
const { formatFlagsJSON } = require('@financial-times/anvil-ui-ft-flags/server')

function page() {
  return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>My Amazing Website</title>
      <script type="application/json" id="anvil-flags-data">
        ${formatFlagsJSON(flagsData)}
      </script>
    </head>
    <body>
      ...
    </body>
  </html>`
}
```

### Client-side integration

Once you are delivering the flags data with your pages you can use the flags client in your client-side code. A method is provided to find the embedded data and parse it and a this can be used to create a new client which provides methods for safely retrieving the status of individual flags.

```js
import { Flags, loadFlags } from '@financial-times/anvil-ui-ft-flags'

const flagsData = loadFlags()
const flagsClient = new Flags(flagsData)

if (flagsClient.get('myAmazingFeature')) {
  ...
}
```


## Client-side API

### `loadFlags()`

Finds and parses the formatted flags data embedded in the page and returns a data object if successful.

_Please note_ the formatted flags data must be present in a `<script>` element with an ID of `anvil-flags-data`.

### `new Flags(flagsData: object)`

Creates a client which can be used to safely access the status of individual flags.


## Server-side API

### `formatFlagsJSON(flagsData: object)`

Returns a serialised JSON string representing the given data. This will filter out any properties with a falsey value to reduce the amount of data to send to and parse on the client-side.

_Please note_ The data returned by this method should be inserted into a `<script>` element with an ID of `anvil-flags-data`.
