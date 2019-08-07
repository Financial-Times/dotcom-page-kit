# @financial-times/dotcom-server-app-context

This package provides tools to define FT app context data and a [JSON schema] definition to validate it with.

[JSON schema]: https://json-schema.org/


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```bash
npm install -S @financial-times/dotcom-server-app-context
```

This package provides a single class which can be configured using [options](#options):

```js
import { AppContext } from '@financial-times/dotcom-server-app-context'
const appContext = new AppContext()
```

The app context instance provides methods to get, set, and validate context data:

```js
appContext.set('appName', 'my-application')
const property = appContext.get('appName') // "my-application"

try {
  appContext.validate()
} catch (error) {
  console.error('Application context data is invalid:', error)
}

const contextData = appContext.getAll()
```


## API

### `get(property: string): any`

Returns the value of the requested property.

### `set(property: string, value: any)`

Sets the value of the specified property.

### `validate(): boolean`

Validates the current data against the schema definition. If the data is invalid this method will throw an error with details of the first error encountered.

### `getAll(): object`

Returns an immutable copy of the app context data.


## Options

The `AppContext` class accepts the following parameters. All parameters are optional:

### `context`

An app context data object, see [app context data](#app-context-data) for more information. Defaults to `{}`.


## App Context Data

Please refer to the [JSON schema definition](schema.md) for more information.
