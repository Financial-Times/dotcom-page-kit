# anvil-server-resource-hints

This package provides functions to help applications track and send [resource hints] for the assets they use.

[resource hints]: https://www.w3.org/TR/resource-hints/


### Getting started

This module is compatible with Node 8+ and is distributed on npm.

```bash
npm install -S @financial-times/anvil-server-resource-hints
```

This module provides a single class which can be configured using [options](#options).

```js
import ResourceHints from '@financial-times/anvil-server-resource-hints'
const resourceHints = new ResourceHints()
```

The resource hints instance provides methods to track the assets used for the lifecycle of a request and format this list into a string suitable for use as a `Link` header:

```js
resourceHints.add('styles.css')
resourceHints.add('scripts.js')

resourceHints.toString() // <styles.css>; as="style"; rel="preload"; nopush, <scripts.js>; as="script"; rel="preload"; nopush
```

Below is an example demonstrating how this package may be used within an [Express] application to track any assets used during the lifecycle of a request and send a `Link` header along with the response:

```js
import ResourceHints from '@financial-times/anvil-server-resource-hints'

app.use('/', (request, response) => {
  const resourceHints = new ResourceHints()

  resourceHints.add('styles.css')
  resourceHints.add('scripts.js')

  response.header('Link', resourceHints.toString())

  response.send('<p>My awesome page</p>')
})
```

[Express]: https://expressjs.com/


## API

### `add(file: string)`

Add a file (either a complete URL or a path) to the list of resources to create hints for.

### `toString()`

Returns a formatted string of resource hints for use as a `Link` HTTP header.


## Options

The `ResourceHints` class accepts the following parameters. All parameters are optional:

_There are currently no options for this middleware package._
