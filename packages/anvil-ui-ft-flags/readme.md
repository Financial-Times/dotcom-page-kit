# @financial-times/anvil-ui-ft-flags

This module provides methods for formatting flags data on the server and safely retrieving it again in the browser.


## Getting started

This module is compatible with Node 8+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ui-ft-flags
```

After installing the module you must you embed the flags data into your pages.

If you are building a React or you can use the `Flags` component:

```jsx
import { Flags } from '@financial-times/anvil-ui-ft-flags/component'

export default (props) => {
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
}
```

Otherwise you must can insert a JSON formatted string into a `<script>` element with an ID of `flags-data`. You can use add the `.formatFlagsJSON()` method to help with this.

```js
const { formatFlagsJSON } = require('@financial-times/anvil-ui-ft-flags')

function page() {
  return `<!DOCTYPE html>
    <html>
    <head>
      <meta charSet="utf-8">
      <title>My Amazing Website</title>
      <script type="application/json" id="flags-data">
        ${formatFlagsJSON(flags)}
      </script>
    </head>
    <body>
      ...
    </body>
  </html>`
}
```

Once you are delivering the flags data with your page you can add the flags module to your client-side code which will find the data, parse it, and provide a method for retrieving the status of a flag.

```js
import { createFlagsClient } from '@financial-times/anvil-ui-ft-flags'

const flags = createFlagsClient()

if (flags.get('myAmazingFeature')) {
  ...
}
```


## API

### `.formatFlagsJSON(flags)`

Returns a JSON formatted string representing the given data. This will filter out any properties with a falsey value to reduce the amount of data to send and parse. The flags data must be inserted into a `<script>` element with an ID of `flags-data`.

### `.createFlagsClient()`

Finds and parses the formatted flags data embedded in the page and returns a client which can access the status of individual flags. The formatted flags data must be present in a `<script>` element with an ID of `flags-data`.

_Please note_ that this method can only be used on the client-side (in the browser.)
