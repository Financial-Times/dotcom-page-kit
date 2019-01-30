import { Pluggable } from '../Pluggable'

const hook = 'foo'

const objResource = () => ({ foo: 'foo' })
const objOne = () => ({ one: 'one' })
const objTwo = () => ({ two: 'two' })

const arrResource = () => [1]
const arrOne = () => [2, 3]
const arrTwo = () => [4, 5, 6]

const handlerOne = () => {}
const handlerTwo = () => {}

describe('Pluggable', () => {
  describe('default behavior', () => {
    it('should return the resource when there are no handlers', () => {
      const resource = objResource()
      const result = new Pluggable().publish(hook, resource)
      expect(result).toEqual(resource)
    })

    it('should publish the resource to all plugins', () => {
      const resource = objResource()
      const expected = { ...objResource(), ...objOne(), ...objTwo() }
      const pluggable = new Pluggable()

      pluggable.on(hook, ({ resource }) => {
        Object.assign(resource, objOne())
      })

      pluggable.on(hook, ({ resource }) => {
        Object.assign(resource, objTwo())
      })

      const result = pluggable.publish(hook, resource)

      expect(result).toEqual(expected)
      // Let's also confirm that the original resource was amended
      expect(resource).toEqual(expected)
    })
  })

  describe('null and undefined result handling', () => {
    it('should return the resource if the handler result is undefined', () => {
      const plugin = ({ on }) => {
        on(hook, () => {})
      }

      const resource = objResource()
      const pluggable = new Pluggable().with(plugin)
      const result = pluggable.publish(hook, resource)

      expect(result).toBe(resource)
    })

    it('should make the resource be null if the handler returns null', () => {
      const pluggable = new Pluggable()

      pluggable.on(hook, () => null)
      pluggable.on(hook, ({ resource }) => {
        if (resource === null) {
          return 'null'
        }
      })

      const resource = objResource()
      const result = pluggable.publish(hook, resource)

      expect(result).toEqual('null')
    })
  })

  describe('handler result / resource merging', () => {
    it('should merge the handler result into the resource when the resource and the handler result are both objects', () => {
      const resource = objResource()
      const expected = { ...resource, ...objOne(), ...objTwo() }
      const pluggable = new Pluggable()

      pluggable.on(hook, () => objOne())
      pluggable.on(hook, () => objTwo())

      pluggable.publish(hook, resource)
      expect(resource).toEqual(expected)
    })

    it('should merge the handler result into the resource when the resource and the handler result are both arrays', () => {
      const resource = arrResource()
      const expected = resource.concat(arrOne(), arrTwo())
      const pluggable = new Pluggable()

      pluggable.on(hook, () => arrOne())
      pluggable.on(hook, () => arrTwo())

      pluggable.publish(hook, resource)
      expect(resource).toEqual(expected)
    })

    it('should not attempt to merge handler results that are not objects or arrays', () => {
      const resource = objResource()
      const pluggable = new Pluggable()

      pluggable.on('foo', () => 'foo')
      pluggable.on('foo', ({ resource }) => resource + ' ' + 1)
      pluggable.on('foo', ({ resource }) => resource + ' ' + true)

      const result = pluggable.publish(hook, resource)
      expect(result).toEqual('foo 1 true')
    })
  })

  describe('registering plugins', () => {
    it('should supply the Pluggable instance to the plugin when registering the plugin', () => {
      let supplied
      const plugin = (pluggable) => {
        supplied = pluggable
      }
      const pluggable = new Pluggable().with(plugin)
      expect(supplied).toBe(pluggable)
    })

    it('should not attempt to re-register plugins if they have been already registered', () => {
      const pluginOne = ({ on }) => {
        on(hook, handlerOne)
      }
      const pluginTwo = ({ on }) => {
        on(hook, handlerTwo)
      }
      const plugins = [pluginOne, pluginTwo, pluginOne, pluginTwo]
      const pluggable = new Pluggable().registerPlugins(plugins)
      const resourceHandlers = pluggable.getHandlersByHook(hook)

      expect(pluggable.plugins).toEqual([pluginOne, pluginTwo])
      expect(resourceHandlers).toEqual([handlerOne, handlerTwo])
    })
  })

  describe('additional handler args', () => {
    it('should also supply the Pluggable instance to the handler', () => {
      const pluggable = new Pluggable()

      let theSuppliedPluggable

      pluggable.on(hook, ({ pluggable }) => {
        theSuppliedPluggable = pluggable
      })

      pluggable.publish(hook, 'foo')
      expect(theSuppliedPluggable).toBe(pluggable)
    })

    it('should allow for aliasing the `Pluggable` instance on both the handler args and the instance itself', () => {
      const pluggable = new Pluggable()

      let theAliasedPluggable

      pluggable.alias = 'cli'
      pluggable.on(hook, ({ cli }) => {
        theAliasedPluggable = cli
      })

      pluggable.publish(hook, 'foo')

      expect((pluggable as any).cli).toBe(pluggable)
      expect(theAliasedPluggable).toBe(pluggable)
    })

    it('should also supply the `publish` method of the Pluggable instance for convenience', () => {
      const resource = {}
      const expected = { ...resource, ...objOne(), ...objTwo() }
      const pluggable = new Pluggable()

      pluggable.on('bar', () => objTwo())
      pluggable.on(hook, ({ publish }) => {
        const bar = objOne()
        publish('bar', bar)
        return bar
      })

      const result = pluggable.publish(hook, resource)
      expect(result).toEqual(expected)
    })
  })
})
