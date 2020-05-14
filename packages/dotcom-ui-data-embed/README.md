# @financial-times/dotcom-ui-data-embed

This package provides methods for putting data into your server-side rendered pages and safely retrieving it again in the browser.

## Getting started

This package is compatible with Node 12+ and is distributed on npm.

```sh
npm install --save @financial-times/dotcom-ui-data-embed
```

After installing the package you can use it to embed data into your pages on the server-side. This data can then be retrieved and used in your client-side code.

### Server-side integration

If you are using React to render your app you can use the `DataEmbed` component to integrate the data embed data with your pages:

```jsx
import { DataEmbed } from '@financial-times/dotcom-ui-data-embed'
const DATA_EMBED_ID = 'data-embed'
const data = { property: 'value', secondProperty: 'second-value' }

export default (props) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>My Amazing Website</title>
      <DataEmbed id={DATA_EMBED_ID} data={data} />
    </head>
    <body>
      ...
    </body>
  </html>
)
```

Otherwise you can insert a JSON formatted string into a `<script>` element with an ID of `data-embed`.

```html
<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>My Amazing Website</title>
        <script type="application/json" id="data-embed">
        {"property":"value","secondProperty":"second-value"}
        </script>
    </head>
    <body>
        ...
    </body>
</html>
```

### Client-side integration

Once you have data embedded in your page you can use the [data embed client](#client-side-api) in your client-side code. The client provides methods for safely retrieving data.

```js
import * as dataEmbed from '@financial-times/dotcom-ui-data-embed'

const dataEmbedClient = dataEmbed.init({ id: 'data-embed' })

if (dataEmbedClient.get('property')) {
  ...
}
```

## Client-side API

### `init({ id }:{ id: string })`

Initialises and returns a new [data embed client](#data-embed-client-api) which can be used to safely access the data.

This method requires an `id` parameter within an options object.
This `id` should match the `id` attribute on the embed element within the page.

## Data Embed Client API

### `get(property: string)`

Returns the value of the requested property. If the property is not found this will return `undefined`.

### `getAll()`

Returns all data embed data.

_Please note_ that the data returned is frozen so it cannot be modified.
