/* ABOUT THE DEVELOPMENT DOCS BELOW ====================================================================================

See the development docs below for a general overview on what this code is about, as well as answers to potential
questions that may arise when perusing it. The development docs have been placed at the bottom of the file in order to
keep the code free from the clutter of lengthy comments.

======================================================================================================================== */

import { State } from './State'
import { Plugin } from '../types/Plugin'
import { Handler } from '../types/Handler'
import { publishResource } from '../helpers/publishResource'

interface ConstructorArgs {
  alias?: string
  plugins?: Plugin[]
}

export class Pluggable {
  pluggable = this // See (Q:03) below

  constructor({ alias = 'instance', plugins = [] }: ConstructorArgs = {}) {
    this.alias = alias
    this.registerPlugins(plugins)
  }

  // See (Q:01) below
  private get state() {
    return State.of(this)
  }

  get plugins() {
    return this.state.plugins
  }

  set plugins(plugins: Plugin[]) {
    this.registerPlugins(plugins)
  }

  with(plugin: Plugin) {
    this.registerPlugins([plugin])
    return this
  }

  // See (Q:02) below
  on = (hook: string, handler: Handler) => {
    this.registerHandler(hook, handler)
  }

  // See (Q:02) below
  publish = (hook: string, resource: any) => {
    return publishResource({ pluggable: this, hook, resource }) // See (Q:05) below
  }

  registerHandler(hook: string, handler: Handler) {
    this.state.handlers.register(hook, handler)
  }

  registerPlugins(plugins: Plugin[]) {
    for (let plugin of plugins) {
      if (!this.state.plugins.includes(plugin)) {
        this.state.plugins.push(plugin)
        plugin(this)
      }
    }
    return this
  }

  getHandlersByHook(hook: string) {
    return this.state.handlers.getHandlersByHook(hook)
  }

  // See (Q:04) below
  set alias(alias: string) {
    this[alias] = this
    this.state.alias = alias
  }

  get alias() {
    return this.state.alias
  }
}

/* THE PURPOSE OF THIS CLASS ========================================================================================== *\

This is the class that provides the actual plugin related functionality. While it can be instantiated by itself and
used directly, it is also meant to be extended via class inheritance (a point which has influenced some of the design
decisions, as will be seen in the next section). In terms of architecture, it implements the publish - subscribe
pattern, where pieces of app state are published to handlers supplied by plugins, for possible amendment. It is
expected that these piece of app state would be used by the app to determine how to proceed. As such, altering them
in some way, is also expected to alter the behavior of the app. This is essentially the mechanism by which pluggability
is achieved. The app uses an instance of the `Pluggable` class to publish a value that the app uses to determine how to
proceed, and plugins subscribe to be notified of such values so that they can amend it in some way. An example is as
follows:

```

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

------------------------------------------------------------------------------------------------------------------------
## (Q:01) What is the point of the `state` property
------------------------------------------------------------------------------------------------------------------------

The `state` returns what can be considered as the private scope of the instance. It is expected that the `Pluggable`
class will be extended via class inheritance, and that derived classes will supply their own public properties. In
such cases, delegating to the `State` class for property handling helps to achieve the following:

  * It removes the need to be concerned about property naming collision in classes that extend the the `Pluggable` class
  * It minimises the noise that would otherwise result when a derived class instance is logged to the console
  * It helps to hide the private details of the `Pluggable`class so that they are not depended upon

------------------------------------------------------------------------------------------------------------------------
## (Q:02) Why are certain methods such as `on` and `publish` defined as properties
------------------------------------------------------------------------------------------------------------------------

It is to allow for them to be accessible when the `Pluggable` instance is destructured. It is expected that the
predominant way that these methods will be accessed is via destructuring. For instance, it is expected that plugins
will be defined as follows:

const plugin = ({on}) => {
  on('hook', ({ cli }) => {
    cli.publish('foo', {})
  })
}

What may not be obvious is the fact that the plugin is actually accepting an `Pluggable` instance

------------------------------------------------------------------------------------------------------------------------
## (Q:03) Why is the `Pluggable` instance being assigned to the `pluggable` property
------------------------------------------------------------------------------------------------------------------------

Again, it is there to facilitate the destructuring use case. It is expected that a `Pluggable` instance will be passed
around the system. So to allow for more flexibility certain methods have been exposed as properties. Doing this ensures
that the `this` scope will be automatically bound to these methods when accessed via destructuring as follows.

function doSomething({ publish }: Pluggable) {
  const foo = {}
  publish('foo', foo)
}

Now in a destructuring context, one might come across the need to supply `Pluggable` instance itself to another function
as follows:

function doSomething({ publish, pluggable }: Pluggable) {
  const foo = {}
  publish('foo', foo)
  doSomethingElse(pluggable)
}

It is for this reason that the `pluggable` property exists


------------------------------------------------------------------------------------------------------------------------
## (Q:04) What is the purpose of the `alias`
------------------------------------------------------------------------------------------------------------------------

The alias is there to allow for accessing the `Pluggable` instance via a more appropriate name than `pluggable` when the
instance is destructured as follows:

class CliContext extends Pluggable {
  constructor() {
    super()
    this.setAliasTo('cli)
  }
}

function doSomething({ publish, cli }: CliContext) {
  publish('foo', {})
  doSomeOtherThing(cli)
}

It is also used to alias the `Pluggable` instance on the `args` that are supplied to resource handlers, as follows

const plugin = ({on}) => {
  on('hook', ({ cli }) => {
    cli.publish('foo', {})
  })
}

------------------------------------------------------------------------------------------------------------------------
## (Q:05) Why is the `publish(...)` method delegating to a separate `publishResource(...)` function?
------------------------------------------------------------------------------------------------------------------------

It is because its implementation is more involved. The best practice being followed is that class methods should be no
more than a few lines long in order to keep the class easily scannable / digestible. If the method needs more than a few
lines of code, then it should delegate to a dedicated helper for its functionality.

\* ===================================================================================================================== */
