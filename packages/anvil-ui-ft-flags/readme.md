# @financial-times/anvil-ui-ft-flags

This module provides a library for formatting flags data on the server and safely retrieving it in the browser.


## Getting started

This module is compatible with Node 10+ and is distributed on npm.

```sh
npm install --save @financial-times/anvil-ui-ft-flags
```

After installing the module you must you embed the flags data into your pages. This must be JSON formatted string inserted into a `<script>` element with an ID of `flags-data`. You may optionally use the `.formatFlagsData()` method to help with this.

```js
const { formatFlagsData } = require('@financial-times/anvil-ui-ft-flags')

function page() {
  return `<!DOCTYPE html>
    <html class="no-js core">
    <head>
      <meta charSet="utf-8">
      <title>My Amazing Website</title>
      <script type="application/json" id="flags-data">
        ${formatFlagsData(flags)}
      </script>
    </head>
    <body>
      ...
    </body>
  </html>`
}
```

Once you are delivering the flags data with your page you can add the flags module to your client-side code which will find the data, parse it, and provide a method for checking

```js
import { createFlagsClient } from '@financial-times/anvil-ui-ft-flags'

const flags = createFlagsClient()

if (flags.get('myAmazingFeature')) {
  ...
}
```


## API

### `.formatFlagsData(flags)`

Returns a JSON formatted string representing the given data. This will filter out any properties with a falsey value to reduce the amount of data to send and parse.

### `.createFlagsClient()`

Finds and parses the flags data and returns . This data must be inserted into a `<script>` element with an ID of `flags-data`.

_Please note_ that this method can only be used on the client-side (in the browser.)
