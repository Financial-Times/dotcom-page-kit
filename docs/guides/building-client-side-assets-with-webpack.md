# Building client-side assets with Webpack

Page Kit apps use [Webpack] to build client-side assets. We provide a handful of Webpack plugins to configure it to our conventions. For consistency with other apps, you should use these plugins.

[webpack]: https://webpack.js.org/

## Setting up Webpack

Install the Webpack CLI, and the base Page Kit Webpack config plugin:

```
npm install --save-dev \
   webpack \
   webpack-cli \
   @financial-times/dotcom-build-base
```

Create a `webpack.config.js` file in the root of your app. This is the default [Webpack configuration file]. You should add an `entry` option pointing at your client-side entry point (usually `client/main.js`), and `plugins` array initialising the Page Kit config plugin:

```js
const { PageKitBasePlugin } = require('@financial-times/dotcom-build-base')

module.exports = {
  entry: {
    scripts: 'client/main.js',
  },
  plugins: [new PageKitBasePlugin()],
}
```

Run `webpack --mode=development`. It should output the file `public/scripts.bundle.js`, containing the bundled output.

All Webpack configuration is allowed, but some options may conflict with Page Kit plugins, and it's better to have more things standard between Page Kit apps for developer familiarity and to improve performance and caching across all apps. So, try to avoid custom configuration, preferring the Page Kit plugins instead.

[webpack configuration file]: https://webpack.js.org/configuration/

## Using Javascript features

If your app uses features like ECMAScript modules, JSX, or other things not supported in (all) browsers, you should use the [`@financial-times/dotcom-build-js`](../../packages/dotcom-build-js/README.md) plugin:

```diff
const { PageKitBasePlugin } = require('@financial-times/dotcom-build-base')
+ const { PageKitJsPlugin } = require('@financial-times/dotcom-build-js')

module.exports = {
	entry: {
		scripts: 'client/main.js'
	},
	plugins: [
		new PageKitBasePlugin(),
+		new PageKitJsPlugin()
	]
}
```

## Building styles

Apps that use [Sass] should install the [`@financial-times/dotcom-build-sass`](../../packages/dotcom-build-sass/README.md) plugin, which allows you to specify a Sass file as a separate entry point:

```diff
const { PageKitBasePlugin } = require('@financial-times/dotcom-build-base')
+ const { PageKitSassPlugin } = require('@financial-times/dotcom-build-sass')

module.exports = {
	entry: {
		scripts: 'client/main.js',
+		styles: 'client/main.scss',
	},
	plugins: [
		new PageKitBasePlugin(),
+		new PageKitSassPlugin()
	]
}
```

Running `webpack --mode=development` again should output the file `public/styles.bundle.css`.

[sass]: https://sass-lang.com/

## Using Bower packages

Apps that need packages from [Bower] should install the [`@financial-times/dotcom-build-bower-resolve`](../../packages/dotcom-build-bower-resolve/README.md) plugin:

```diff
const { PageKitBasePlugin } = require('@financial-times/dotcom-build-base')
+ const { PageKitBowerResolvePlugin } = require('@financial-times/dotcom-build-bower-resolve')

module.exports = {
	entry: {
		scripts: 'client/main.js',
	},
	plugins: [
		new PageKitBasePlugin(),
+		new PageKitBowerResolvePlugin()
	]
}
```

[bower]: https://bower.io/

## Code splitting

FT.com apps should use the [`@financial-times/dotcom-build-code-splitting`](../../packages/dotcom-build-code-splitting/README.md) plugin to take advantage of shared cached dependencies between apps.

```diff
const { PageKitBasePlugin } = require('@financial-times/dotcom-build-base')
+ const { PageKitCodeSplittingPlugin } = require('@financial-times/dotcom-build-code-splitting')

module.exports = {
	entry: {
		scripts: 'client/main.js',
	},
	plugins: [
		new PageKitBasePlugin(),
+		new PageKitCodeSplittingPlugin()
	]
}
```

When including lots of dependencies, output bundles tend to stay mostly the same when your client code changes, but the shared parts can't be cached. Code splitting allows the dependencies that stay the same to be cached while your code changes.

To maximise cache hit ratios (and so page load speeds) for our users across apps, we need to share the code-splitting configuration between apps, so dependencies shared between apps are bundled into shared, cacheable assets.

## Integration with FT.com build tools

Apps using [`n-gage`](https://github.com/financial-times/n-gage) should add `build` and `build-production` targets to their `Makefile`:

```makefile
build:
	webpack --mode=development

build-production:
	webpack # defaults to production mode
```

These targets are standard for FT.com apps and are expected by developers and our CI & deployment tooling. For convenience, some apps also add a `watch` target:

```makefile
watch:
	webpack --mode=development --watch
```
