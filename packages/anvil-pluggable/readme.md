# Anvil Pluggable

A lightweight library for facilitating pluggability within apps and libraries.

## Installation

This package is compatible with Node 8+ and is distributed via npm

```
npm install --save-dev @financial-times/anvil-pluggable
```

## General Usage

At the center of this package, is the `Pluggable` class. It is the class that is meant to either be extended (i.e., via class inheritance) or instantiated directly to provide the functionality required to facilitate pluggability within apps and libraries. An instance of this class can be used to register plugins / resource handlers, as well as to publish resources to the registered plugins / resource handlers for possible amendment, as seen in the following example:

```js
import { Pluggable } from '@financial-times/anvil-pluggable'

const plugin = ({ on }) => {
  on('person', ({ resource: person }) => {
    person.name = 'Jack'
  })
}

function greetPerson({ publish }: Pluggable) {
  const person = { name: 'John' }
  publish('person', person)
  return `Hello ${person.name}`
}

const pluggable = new Pluggable().with(plugin)
const result = greetPerson(pluggable)

expect(result).toBe('Hello Jack')
```

## Concepts

### Resource

A resource is a value that will be used by the app to determine how to proceed. It is expected that altering this value would in some way also alter how the app behaves.

### Resource Handler

A resource handler is a function that will be used to amend the resource.

### Resource Hook

A resource hook is a string value that uniquely represents the resource within the system. So for instance, if the resource is a webpack config, then the hook can be called `webpackConfig`

### Plugin

A plugin is a function that accepts a `Pluggable` instance, and then registers resource handlers on it.

```js
const plugin = (pluggable) => {
  pluggable.on('foo', handlerFn)
}
```

## The `Pluggable` Class

#### Methods

##### `.on(hook: string, handler: Function)`

Registers a resource handler with the `Pluggable` instance.

##### `.publish(hook: string, resource: any)`

Publishes a resource to the registered handlers for potential amendment.

##### `.registerPlugins(plugins: string, resource: any)`

#### Properties

##### `.alias`

Sets the alias of the `Pluggable` instance. The alias is used to allow for accessing the instance via a more appropriate name than `pluggable` when the instance is destructured. It is also used to alias the `Pluggable`
instance on the args that are supplied to resource handlers, as follows:

```ts
class CliContext extends Pluggable {
  alias = 'cli'
  args = {}
  options = {}
}

function getWebpackConfig({ publish, cli }: CliContext) {
  const babelConfig = getBabelConfig(cli)
  const webpackConfig = { babelConfig }
  publish('webpackConfig', webpackConfig)
  return webpackConfig
}

const plugin = ({on} => {
  on('webpackConfig', ({ cli }) => ({
    cssRule: getCssRule(cli)
  }))
})
```




