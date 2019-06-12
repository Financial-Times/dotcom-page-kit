# @financial-times/anvil-server-ft-app-context

This package provides tools to define FT app context data and a [JSON schema] definition to validate it with.

[JSON schema]: https://json-schema.org/


## Getting started

This package is compatible with Node 8+ and is distributed on npm.

```bash
npm install -S @financial-times/anvil-server-ft-app-context
```

This package provides a single class which can be configured using [options](#options):

```js
import { AppContext } from '@financial-times/anvil-server-ft-app-context'
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
```


## API

### `get(property: string): any`

Returns the value of the requested property.

### `set(property: string, value: any)`

Sets the value of the specified property.

### `validate(): boolean`

Validates the current data against the schema definition. If the data is invalid this method will throw an containing details of the invalid data.


## Options

The `AppContext` class accepts the following parameters. All parameters are optional:

### `context`

An initial app context data object


## Context data

A summary of context data properties is displayed below but for full context please refer to the [JSON schema definition](src/schema.ts).

| Property         | Type    | Description                                                 |
|------------------|---------|-------------------------------------------------------------|
| appName          | string  | The name of the application                                 |
| appVersion       | string  | The running version of the app (usually a Git commit hash)  |
| product          | string  | The product name, defaults to "next"                        |
| abTestState      | string  | The A/B test flags data as a comma delimited string         |
| edition          | string  | The selected FT edition                                     |
| contentId        | string  | The UUID of the content on the current page                 |
| contentType      | string  | The type or sub-type of the content on the current page     |
| conceptId        | string  | The UUID of the concept on the current page                 |
| conceptType      | string  | The type of concept on the current page                     |
| isProduction     | boolean | If the app is currently running in a production environment |
| publishReference | string  | The publish reference of the content on the current page    |
