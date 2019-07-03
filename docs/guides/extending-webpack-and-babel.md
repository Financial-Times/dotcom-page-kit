# Extending the Core Webpack and Babel Config

- [Authoring plugins](#authoring-plugins)
- [Loading plugins](#loading-plugins)
- [Amending supplementary resources](#amending-supplementary-resources)
- [Publishing resources from plugins](#publishing-resources-from-plugins)
- [Returning values from handlers](#returning-values-from-handlers)
- [Existing anvil plugins](#existing-anvil-plugins)
- [Best practices for creating plugins](#best-practices-for-creating-plugins)
  - [Don't use `webpack-merge`](#dont-use-webpack-merge)
  - [Array items of note should be published for amendment](#array-items-of-note-should-be-published-for-amendment)

## Authoring plugins

In order to extend the core webpack or babel config, a plugin will have to be authored. Plugins are functions that subscribe to be notified when a resource is published, so that they can have a chance to amend the resource in some way. During the life cycle of invoking the `anvil build` CLI command, multiple resources will be published for possible amendment, and these include the webpack and babel config. The following is an example of a plugin that [enables symlink resolves](https://webpack.js.org/configuration/resolve/#resolve-symlinks) on the webpack config:

```js
function webpackPlugin(publisher) {
  publisher.on('webpackConfig', ({ resource: webpackConfig }) => {
    webpackConfig.resolve.symlinks = true
  })
}
```

The first thing to note is that the plugin accepts a [`Publisher`] instance. The plugin then subscribes on the `Publisher` instance to handle / amend the resource named `webpackConfig`, which is in turn passed to the handler function as the argument property named `resource`. The resource handler function then amends the webpack config object directly to enable symlinks. The pattern is the same when creating any plugin. A plugin that extends the `babelConfig` for example, would look like the following:

```js
function babelPlugin({ on }) {
  on('babelConfig', ({ resource: babelConfig }) => {
    doSomethingToTheBabelConfig(babelConfig)
  })
}
```

## Loading plugins

Once the plugin has been authored, it will have to be loaded. To do so, the plugin should be added to the `page-kit.config.js` file. The `page-kit.config.js` file is the file that plugins and Page Kit CLI settings are declared in. This file is expected to be in the project root. The following is an example of an `page-kit.config.js` file that specifies two plugins:

```js
module.exports = {
  plugins: [
    webpackPlugin,
    babelPlugin
  ]
}

function webpackPlugin ({ on }) {
  on('webpackConfig', ({ resource: webpackConfig }) => {
    ...
  })
}

function babelPlugin ({ on }) => {
  on('babelConfig', ({ resource: babelConfig }) => {
    ...
  })
}
```

See the [`anvil` package readme] for more information on the `page-kit.config.js` file

## Amending supplementary resources

While the `webpackConfig` and the `babelConfig` are the main resources that are published for amendment, they are not the only resources that are published during the life cycle of the `anvil build` CLI command. Other supplementary resources are also published with an aim of making it easy to extend the main resources. Supplementary resources are pieces of data on the main resource that are either hard, [unsafe] or impossible to access from the main resource. Take the options of a webpack plugin like the [clean-webpack-plugin], for example.

```js
const cleanWebpackPluginOptions = {...}

const webpackConfig {
  plugins: [
    new CleanWebpackPlugin(cleanWebpackPluginOptions)
  ]
}
```

Such options are unreachable from the webpack config itself, due to them being encapsulated within class instances, as seen in the above example. As such, there is no other option but to publish them separately, in order to make them available for amendment by plugins. The following is an example of a plugin that subscribes to amend the `cleanWebpackPluginOptions` resource of the previous example:

```js
function plugin({ on }) {
  on('cleanWebpackPluginOptions', ({ resource: options }) => {
    options.dry = false
    options.verbose = true
  })
}
```

Webpack [rules] and [plugin] options are the supplementary resources that are commonly published, and they are published from both [anvil core] and [individual anvil plugins]. So for a list of all the resources that will be published during the life cycle of invoking the `anvil build` CLI command, see the README documentation of both [anvil core] and the [individual anvil plugins] that will be used.

[rules]: https://webpack.js.org/configuration/module/#modulerules
[plugin]: https://webpack.js.org/plugins/
[unsafe]: #array-items-of-note-should-be-published-for-amendment
[anvil core]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil
[clean-webpack-plugin]: https://github.com/johnagan/clean-webpack-plugin
[individual anvil plugins]: #existing-anvil-plugins

## Publishing resources from plugins

When authoring plugins that will be shared publicly, it is recommended that [hard to reach] data that can potentially be of interest to other plugins, be published for possibly amendment. This can be achieved by making use of the `Publisher` instance that is available on the handler argument object, as follows.

```js
function plugin({ on }) {
  on('webpackConfig', ({ resource: webpackConfig, publisher }) => {
    const bannerPluginOptions = { ... }
    publisher.publish('bannerPluginOptions', bannerPluginOptions)
    webpackConfig.plugins.push(new BannerPlugin(bannerPluginOptions))
  })
}
```

For convenience, the `publish` method of the publisher instance is also passed to the handler function directly, thus making it possible to also do the following:

```js
import { BannerPlugin } from 'webpack';

function plugin({ on }) {
  on('webpackConfig', ({ resource: webpackConfig, publish }) => {
    const bannerPluginOptions = { ... }
    publish('bannerPluginOptions', bannerPluginOptions)
    webpackConfig.plugins.push(new BannerPlugin(bannerPluginOptions))
  })
}
```

In both examples, the `publish` method of the `Publisher` instance is being used to publish the `bannerPluginOptions` object before it is supplied to the `BannerPlugin` constructor. This allows other plugins to be able to amend it by doing something like the following:

```js
function anotherPlugin({ on }) {
  on('bannerPluginOptions', ({ resource: bannerPluginOptions }) => {
    bannerPluginOptions.raw = true
  })
}
```

**The `publish` method result**

As can be seen in the previous examples, the `publish` method of the `Publisher` instance accepts the name of the resource as the first argument and the resource being published, as the second argument. What is not being shown, however, is that the `publish` method will also return the final version of the resource after it has been amended by all the handlers in the queue. This is useful when the resource is not an object or an array. When it is an object or an array, it will be mutated in place This means that the result of the `publish` method can then be ignored (like in the previous examples). If the resource is not an object or array, however, or if the resource gets transformed into a value that is not an object or array, then it will be necessary to capture the result of the `publish` method, as at that point, it will now be a value that is different from the original resource in terms of memory location. The following is an example of publishing a resource which cannot be mutated in place.

```js
function plugin({ on }) {
  on('foo', ({ resource: foo, publish }) => {
    foo.bar = publish('bar', 'bar...')
  })
}
```

Because strings are immutable in JavaScript, it's not possible to mutate the string `bar...` in place, hence why the result of the `publish` function is being captured.

> See the [Page Kit pluggable] package documentation for more information on the `publish` method as well as the `Publisher`

[hard to reach]: #amending-supplementary-resources
[Page Kit pluggable]: https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-page-kit-pluggable

## Returning values from handlers

There is a problem with the following example:

```js
export default ({ on }) => {
  on('webpackConfig', ({ resource: webpackConfig }) => {
    webpackConfig.resolve.symlinks = true
  })
}
```

The problem is that it is possible that the `resolve` property does not actually exist on the webpack config that is supplied to the handler function. To accommodate for this, the plugin could be declared as follow:

```js
export default ({ on }) => {
  on('webpackConfig', ({ resource: webpackConfig }) => {
    if (!webpackConfig.resolve) {
      webpackConfig.resolve = {}
    }
    webpackConfig.resolve.symlinks = true
  })
}
```

Or we could look at the code that declares the core webpack config to ensure that the `resolve` property has actually been declared on the core webpack config. None of these options are ideal. The former is not ideal because all the `if` blocks will eventually result in the code becoming difficult to follow. The latter is not ideal because it involves binding to private implementation details, which means that if the core webpack config is refactored and in the process the `resolve` property is removed, then the plugin would break. For this reason, the plugin system allows for values to be returned from handlers, that will be merged back into the original resource. This allows for the plugin to be declared as follows:

```js
export default ({ on }) => {
  on('webpackConfig', () => {
    return {
      resolve: {
        symlinks: true
      }
    }
  })
}
```

With this code, a webpack config is being returned from the handler. The system will take the webpack config that has been returned from the handler function, and merge it back into the original webpack config. The benefit here is that the code remains easy to reason about, and there is no longer the need to bind to private implementation details. This is the recommended way of extending not just the webpack and babel configs, but any resource.

There are a few things to note, however, when making use of this functionality. Firstly, it should be noted that it is only objects and arrays that are merged back into the original resource, and only if both the original resource and the handler result are of the same type. In other words, if the original resource is an array and the handler result is an array, then the handler result will be merged back into the original resource because they are compatible. If the handler result and the original resource are not compatible (where merging is concerned), then the original resource will be replaced with the handler result, so that the handler result becomes the resource that is passed to the next handler in the chain.

The second thing to note is that where arrays are concerned, only push merge is supported. In other words, when merging a source array into a destination array, the source array will be pushed into the destination array by doing the following:

```js
destArray.push(...srcArray)
```

This is intentional as we don't want plugins to be dependent on private details such as where exactly an item is located within the array. This way, if the position of the item is changed, plugins don't break. In situations where there is a need to amend something that is in an array (like a webpack rule for instance), the plugin should instead subscribe to amend that particular item (instead of subscribing to amend the entire webpack config for instance).

The third thing to note is that if `undefined` is returned from the handler, then nothing happens. The system treats an `undefined` handler result as meaning that nothing was returned from the handler, which means that the original resource should then be passed to the next handler in the list. Note, however, that the behavior is different when `null` is returned from a handler. The system treats a `null` handler result as being an intention request to overwrite the resource with `null`, so that null becomes the resource that is passed to subsequent handlers in the chain.

## Existing anvil plugins

Below is a list of the existing anvil plugins that are available for use

- [@financial-time/dotcom-build-bower-resolve](https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-build-bower-resolve)
- [@financial-time/dotcom-build-css](https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-build-css)
- [@financial-time/dotcom-build-esnext](https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-build-esnext)
- [@financial-time/dotcom-build-sass](https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-build-sass)
- [@financial-time/dotcom-build-js](https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-build-js)

[`publisher`]: https://github.com/Financial-Times/anvil/tree/master/packages/dotcom-page-kit-pluggable
[`anvil` package readme]: https://github.com/Financial-Times/anvil/tree/master/packages/anvil

## Best practices for creating plugins

### Don't use `webpack-merge`

[`webpack-merge`](https://github.com/survivejs/webpack-merge) is a library that is commonly used for merging webpack configuration objects. Those that are aware of it may feel the need to make use of it when amending the webpack config. It is, however, not necessary. By default, when a webpack configuration object is [returned from a handler function], that configuration function will be merged back into the original webpack config using the same strategy that `webpack-merge` uses by default, which is to merge the objects and concatenate the arrays.

It's only when the intention is to do what is referred to as a [smart merge](https://github.com/survivejs/webpack-merge#mergesmartconfiguration-configuration), that `webpack-merge` becomes necessary. Smart merging, however, is considered an unhealthy practice within a plugin ecosystem such as this, and here's why. A smart merge involves merging matching array items as objects, instead of concatenating the arrays. Merging items in this manner, however, introduces fragility into the system. For illustration purposes let's say that we are dealing with the following webpack configuration objects:

```js
const webpackConfigOne = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        foo: 'foo'
      }
    ]
  }
}

const webpackConfigTwo = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        bar: 'bar'
      }
    ]
  }
}
```

A smart merge would assume that because the first defined rule of both webpack configuration objects have matching `test` values, then it must mean that both rules are referring to the same thing, and so they should both be merged so that we end up with the following webpack config:

```js
const webpackConfigAfterMerge = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        foo: 'foo',
        bar: 'bar'
      }
    ]
  }
}
```

This, however, is not ideal because it involves having to know beforehand, what the value of the `test` property is on the original webpack configuration object, which is a thing that cannot be known beforehand. It is very possible that another plugin may have changed that value. In order for plugins to harmoniously coexist, arrays should only be concatenated (instead of being smartly merged) when merging them. So if the desire is to add a new rule to the original webpack config for instance, then it is fine to simply return from the handler function, a webpack config that contains just that new rule.

```js
const originalWebpackConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        foo: 'foo'
      }
    ]
  }
}

const webpackConfigReturnedByHandler = {
  module: {
    rules: [
      {
        test: /\.(css)$/,
        bar: 'bar'
      }
    ]
  }
}

const originalWebpackConfigAfterMerge = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        foo: 'foo'
      },
      {
        test: /\.(css)$/,
        bar: 'bar'
      }
    ]
  }
}
```

But if the intention is to amend an existing rule, then the plugin should subscribe to receive that particular rule as a resource and amend it directly. As an example, the `webpackConfig::jsRule` resource is published during the life cycle of executing the `anvil build` CLI command. A plugin that amends this rule may look like the following:

```js
export default ({on} => {
  on('webpackConfig::jsRule', ({ resource: jsRule }) => {
    amendTheJsRule(jsRule)
  })
})
```

In summary, it is not at all necessary to use `webpack-merge`. This is because its default behavior has already been accommodated for in `anvil`, and where its smart merging capabilities are concerned, it is considered an unhealthy practice within a plugin ecosystem such as this.

[returned from a handler function]: #returning-values-from-handlers

### Array items of note should be published for amendment

> _RULE: In order to ensure that the system as a whole remains resilient to change, array items that other plugins may be interested in amending, should be published for amendment, as this prevents private details (such as the exact location of the item within the array, for example,) from leaking into the public interface._

When creating plugins (especially plugins that will be publicly shared), there are situations when it is necessary to make available a particular piece of data to be amended. Array items like [webpack rules], for example, are items that should always be published for amendment. This is because if they are not published, other plugins that need to amend a rule will have to know exactly where that rule resides within the `module.rules` array, and this is not ideal. Take the example of adding an option to the webpack scripts rule. It's not ideal for plugins to have to do the following in order to add the option:

```js
function somePlugin({ on }) {
  on('webpackConfig', ({ resource: webpackConfig }) => {
    webpackConfig.module.rules[3].use.options.cacheDirectory = false
  })
}
```

It's not ideal because there are no guarantees that the scripts rule will always be the third rule of the `webpackConfig.module.rules` array. A future refactor could result in the scripts rule becoming the first rule in the array, at which point all plugins that are banking on the scripts rule being in the third position, will now no longer work. Details like where an item is in a particular array, are the sort of details that should be considered private in order to ensure that plugins remain loosely coupled to both the core system and each other, so that the system overall remains resilient to change. So rather than explicitly binding to the position of the rule in order to amend the rule, it is instead better / healthier to bind to the rule directly, by do the following:

```js
function somePlugin({ on }) {
  on('webpackScriptsRule', ({ resource: scriptsRule }) => {
    scriptsRule.use.options.cacheDirectory = false
  })
}
```

Or even better,...

```js
function somePlugin({ on }) {
  on('webpackScriptsRule', () => {
    return {
      use: {
        options: {
          cacheDirectory: false
        }
      }
    }
  })
}
```

> See the section on [Returning values from handlers] for why this is better

This way, the plugin no longer needs to know where exactly in the `module.rules` array that the scripts rule is located, in order to amend it. Now it's possible to search the array for the scripts rule as follows:

```js
function somePlugin({ on }) {
  on('webpackConfig', ({ resource: webpackConfig }) => {
    const scriptsRule = webpackConfig.module.rules.find((rule) => rule.test.test('.js'))
    scriptsRule.use.options.cacheDirectory = false
  })
}
```

This, however, is still not ideal for the same reasons (and also because it is much harder to grok at first glance). It is not guaranteed that the `test` property of the scripts rule will contain a regex that has been configured to match the `.js` string. Another plugin, for example, could have amended it to only match typescript files. For this reason, the safest and cleanest option is for array items to be published for amendment so that plugins can subscribe to amend them directly.

> See the section on [Publishing resources from plugins] for information on how to publish resources from plugins

So in summary, as a best practice, array items that other plugins may be interested in amending should always be published for amendment in order to prevent private details such as the the exact location of the item within the array, for example, from leaking into the public interface. Not only does doing this ensure that the system as a whole remains resilient to change, but it also helps to ensure that the code remains easy to reason about.

[webpack rules]: https://webpack.js.org/configuration/module/#modulerules
[returning values from handlers]: #returning-values-from-handlers
[publishing resources from plugins]: #publishing-resources-from-plugins
