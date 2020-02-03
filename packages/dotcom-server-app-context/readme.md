# @financial-times/dotcom-server-app-context

This package provides tools to define FT app context data and a [JSON schema] definition to validate it with.

To learn more about why this feature exists please review the [design document]. To find out which properties can be defined please refer to the [app context schema].

[JSON schema]: https://json-schema.org/
[design document]: ../../docs/design-decisions/app-context.md
[app context schema]: schema.md


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

The app context instance provides methods to get and set app context data:

```js
appContext.set('appName', 'my-application')
const property = appContext.get('appName') // "my-application"
const contextData = appContext.getAll() // { appName: "my-application" }
```


## API

### `get(property: string): any`

Returns the value of the requested property.

### `set(property: string, value: any)`

Sets the value of the specified property. The provided value will be validated against the [app context schema]. If the value is invalid this method will throw an error.

### `getAll(): object`

Returns an immutable copy of the app context data.


## Options

The `AppContext` class accepts the following parameters. All parameters are optional:

### `appContext`

An app context data object, see the [app context schema] for more information. Defaults to `{}`.
