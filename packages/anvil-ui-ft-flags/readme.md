# @financial-times/anvil-ui-ft-flags

This module provides methods for formatting flags data on the server and safely retrieving it again in the browser.


## Getting started

This module is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ui-ft-flags
```

After installing the module you can use it to embed flags data into your pages on the server-side. This data can then be retrieved and used in your client-side code using the included flags client.

### Server-side

If you are using React to render your app you can use the `Flags` component:

```jsx
import { Flags } from '@financial-times/anvil-ui-ft-flags/component'

export default (props) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>My Amazing Website</title>
      <Flags data={props.flags} />
    </head>
    <body>
      ...
    </body>
  </html>
)
```

Otherwise you can insert a JSON formatted string into a `<script>` element with an ID of `anvil-flags-data`. You can use the `.formatFlagsJSON()` method to help with this.

```js
const { formatFlagsJSON } = require('@financial-times/anvil-ui-ft-flags')

function page() {
  return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>My Amazing Website</title>
      <script type="application/json" id="anvil-flags-data">
        ${formatFlagsJSON(flags)}
      </script>
    </head>
    <body>
      ...
    </body>
  </html>`
}
```

### Client-side

Once you are delivering the flags data with your pages you can use the flags client in your client-side code. This client will find the embedded data, parse it, and provide a method for retrieving the status of a flag.

```js
import { createFlagsClient } from '@financial-times/anvil-ui-ft-flags'

const flags = createFlagsClient()

if (flags.get('myAmazingFeature')) {
  ...
}
```


## API

### `.formatFlagsJSON(flags)`

Returns a JSON formatted string representing the given data. This will filter out any properties with a falsey value to reduce the amount of data to send and parse. The data returned by this method must be inserted into a `<script>` element with an ID of `anvil-flags-data`.

### `.createFlagsClient()`

Finds and parses the formatted flags data embedded in the page and returns a client which can access the status of individual flags. The formatted flags data must be present in a `<script>` element with an ID of `anvil-flags-data`.

_Please note_ that this method can only be used on the client-side (in the browser.)
