# @financial-times/dotcom-ui-flags

This package provides methods for integrating flags data into your server-side rendered pages and safely retrieving it again in the browser.


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/dotcom-ui-flags
```

After installing the package you can use it to embed flags data into your pages on the server-side. This data can then be retrieved and used in your client-side code using the included flags client.

### Server-side integration

If you are using React to render your app you should use the `FlagsEmbed` component to integrate the flags data with your pages:

```jsx
import { FlagsEmbed } from '@financial-times/dotcom-ui-flags'

export default (props) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>My Amazing Website</title>
      <FlagsEmbed flags={props.flagsData} />
    </head>
    <body>
      ...
    </body>
  </html>
)
```

Otherwise you can insert a JSON formatted string into a `<script>` element with an ID of `page-kit-flags-embed`. You can use the `.formatFlagsJSON()` method to help with this.

```js
const { formatFlagsJSON } = require('@financial-times/dotcom-ui-flags/server')

function page() {
  return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>My Amazing Website</title>
      <script type="application/json" id="page-kit-flags-embed">
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

Once you are delivering the flags data with your pages you can use the flags client in your client-side code. The flags client provides methods for safely retrieving the status of individual flags.

```js
import * as flags from '@financial-times/dotcom-ui-flags'

const flagsClient = flags.init()

if (flagsClient.get('myAmazingFeature')) {
  ...
}
```


## Client-side API

### `init()`

Initialises and returns a new [flags client](#flags-client-api) which can be used to safely access the status of individual flags.

### `loadFlags()`

Finds and parses the formatted flags data embedded in the page and returns the flags data object if successful.

_Please note_ the formatted flags data must be present in a `<script>` element with an ID of `page-kit-flags-embed`.


## Server-side API

### `formatFlagsJSON(flagsData: object)`

Returns a serialised JSON string representing the given data. This will filter out any properties with a falsey value to reduce the amount of data to send to and parse on the client-side.

_Please note_ The data returned by this method should be inserted into a `<script>` element with an ID of `page-kit-flags-embed`.


## Flags client API

### `get(flag: string)`

Returns the status for the requested flag. If the flag is not found or has been filtered out this will return `undefined`

### `getAll()`

Returns all flags data.

_Please note_ that the flags data object is frozen so it cannot be modified.
