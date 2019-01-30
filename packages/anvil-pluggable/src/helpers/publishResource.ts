/* ABOUT THE DEVELOPMENT DOCS BELOW ====================================================================================

See the development docs below for a general overview on what this code is about, as well as answers to potential
questions that may arise when perusing it. The development docs have been placed at the bottom of the file in order to
keep the code free from the clutter of lengthy comments.

======================================================================================================================== */

import merge from 'lodash.mergewith' // See (Q:01) below
import { Pluggable } from '../entities/Pluggable'
import { Handler } from '../types/Handler'

interface Args {
  resource: any
  hook: string
  pluggable: Pluggable
}

export function publishResource({ hook, pluggable, resource }: Args) {
  const handlers = pluggable.getHandlersByHook(hook)

  // Let's be explicit about the array merge strategy so that not only is it
  // clear, but also so that we can easily swap it out if we need to in the future
  const mergeArraysInPlace = arrayPushMerge

  for (let handler of handlers) {
    const result = invokeHandler(handler, resource, pluggable)

    // See (R:04) below
    if (result === undefined) continue

    // See (R:02) below
    if (itemsAreArrays(resource, result)) {
      mergeArraysInPlace(resource, result)
      continue
    }

    // See (R:02) below
    if (itemsAreObjectsWithProps(resource, result)) {
      mergeObjectsInPlace(resource, result, mergeArraysInPlace)
      continue
    }

    // If we get to here, then it means that the result cannot be merged back
    // into the resource, so lets make the result the new resource
    // See (R:03) below
    resource = result
  }

  // See (R:09) below
  return resource
}

function itemsAreArrays(itemOne: any, itemTwo: any) {
  return Array.isArray(itemOne) && Array.isArray(itemTwo)
}

export function itemsAreObjectsWithProps(itemOne: any, itemTwo: any) {
  return isObjectWithProps(itemOne) && isObjectWithProps(itemTwo)
}

function isObjectWithProps(item: any) {
  return typeof item === 'object' && !Array.isArray(item) && item !== null
}

function arrayPushMerge(dest: any[], src: any[]) {
  return dest.push(...src)
}

function invokeHandler(handler: Handler, resource: any, pluggable: Pluggable) {
  const { alias, publish } = pluggable
  // See (R:06), (R:07) and (R:08) below
  return handler({ publish, resource, pluggable, [alias]: pluggable })
}

function mergeObjectsInPlace(dest: any, src: any, arrayMerger: Function) {
  const mergeStrategy = (dest, src) => {
    if (itemsAreArrays(dest, src)) {
      return arrayMerger(dest, src)
    }
  }
  return merge(dest, src, mergeStrategy)
}

/* ABOUT THIS FUNCTION =================================================================================================

This is the function that handles the actual publishing of resources to handlers. A resource is just a value that will
be used by the app to determine how to proceed. It is expected that altering this value would somehow also alter how
the app behaves. A handler is the function that the resource will be supplied to on publish. It is expected that the
handler will amend the resource in some way.

The requirements for resource publishing are as follows:

  * (R:01) Handlers should be able to amend a resource in place. In other words, if the resource is an array an the
    handler pushes more items into the array, the original resource that was published must now also have those new
    items.

  * (R:02) Handlers should be able to alternatively return the changes the changes that will then be merged back to the array.
    In other words, if the resource is the object `{ foo: 'foo' }`, instead of directly adding a property the property
    `bar` to that object, the handler should be able to return `{ bar: 'bar' }`, and expect that it will be merged
    back into the original object, so that the original object now becomes { foo: 'foo', bar: 'bar' }

  * (R:03) Handlers should be able to return non mergeable things like strings and numbers etc, and have those values
    overwrite the resource in the sense that they become the new resource that is passed on to other handlers. Note that
    it is not expected that the original resource will be changed when a non mergeable value is returned by handlers, but
    the non mergeable value must be the value that is returned from the `publishResource`function, if it is the last
    value of the resource (i.e., if the last handler for instance, returned a non mergeable value).

  * (R:04) If a handler returns `undefined`, then nothing should happen and the original resource should be passed on to
    the the next handler

  * (R:05) If an handler returns `null`, then it means that the handler want to intentionally set the resource to `null`. So
    `null` should then become the value that is supplied to the next handler in the chain. Note that it is not expected
    that the original resource will now become null, but null must be the value that is returned from the `publishResource`
    function, if it is the last value of the resource (i.e., if the last handler for instance, returned null).

  * (R:06) Handlers should receive not just the resource, but also the `Pluggable` instance that it was published with, as it
    may be a derived class that contains contextual information that the handler can use to know how to proceed.

  * (R:07) Handlers must also receive a `publish(..)` function that it can use to also publish it's own resources for amendment.
    It is for convenience sake that want this function to be supplied to the handler even though it is also available on
    the `Pluggable` instance that is supplied, as it will allow for the following to be done

    const plugin = ({on}) => {
      on('foo', ({ publish }) => {
        const bar = { bar: 'bar' }
        publish(bar)
        return bar
      })
    }

    ...instead of needing to do

    const plugin = ({on}) => {
      on('foo', ({ pluggable }) => {
        const bar = { bar: 'bar' }
        pluggable.publish(bar)
        return bar
      })
    }

    The former is more concise

  * (R:08) If the `Pluggable` instance has a `alias`, the `Pluggable` instance should also be added to the handler args under
    a key that is equivalent to the alias. This is to allow for the `Pluggable` instance to be available under a more
    appropriate name that `pluggable`.

    class CliContext extends Plugin {
      alias = 'cli'
    }

    const plugin = ({on}) => {
      on('foo', ({ cli }) => {
        return getBar(cli)
      })
    }

  * (R:09) The `publishResource` method should return the final state of the resource

/* POTENTIAL QUESTIONS REGARDING THE CODE ==============================================================================

------------------------------------------------------------------------------------------------------------------------
## (Q:01) Why is `lodash.mergewith` used
------------------------------------------------------------------------------------------------------------------------

It was chosen for the following reasons:

  * It can perform a deep merge
  * The merging strategy can be configured
  * It behaves like `Object.assign()` in that it will actually merge into the destination object (the resource in this
    case), which is what we want to happen

======================================================================================================================== */
