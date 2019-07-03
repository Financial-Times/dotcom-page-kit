/* ABOUT THE DEVELOPMENT DOCS BELOW ====================================================================================

See the development docs below for a general overview on what this code is about, as well as answers to potential
questions that may arise when perusing it. The development docs have been placed at the bottom of the file in order to
keep the code free from the clutter of lengthy comments.

======================================================================================================================== */

import { Plugin } from '../types/Plugin'
import { Pluggable } from './Pluggable'
import { HandlerRegistry } from './HandlerRegistry'

const state = new WeakMap()

export class State {
  alias: string
  plugins: Plugin[] = []
  handlers = new HandlerRegistry()

  static setupFor(instance: Pluggable) {
    const stateInstance = new State()
    state.set(instance, stateInstance)
    return stateInstance
  }

  static getStateOfPluggable(instance: Pluggable) {
    if (!state.has(instance)) {
      State.setupFor(instance)
    }
    return state.get(instance)
  }

  static of(instance: Pluggable): State {
    return State.getStateOfPluggable(instance)
  }
}

/* THE PURPOSE OF THIS CLASS ===========================================================================================

This class is meant to be the private scope / state of the the `Pluggable` class. In other words, the things that would
normally be declared as private properties on the `Pluggable` class, will instead be placed here. This is so that we can
accomplish the following:

  * Remove the need to be concerned about property naming collision in classes that extend the the `Pluggable` class
  * Minimise the noise that would otherwise result when a derived class instance is logged to the console
  * Hide the private details of the `Pluggable`class, as JavaScript does not yet currently support private class
    properties and methods

This class is expected to be used as follows:

```
const pluggable = new Pluggable()
const state = State.of(pluggable)
```

======================================================================================================================== */
