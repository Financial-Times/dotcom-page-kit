# @financial-times/anvil-server-asset-loader

This package provides functions to help applications locate their static assets from wherever they are output.


### Getting started

This package is compatible with Node 8+ and is distributed on npm.

```bash
npm install -S @financial-times/anvil-server-asset-loader
```

You will also need to ensure your application is configured to create manifest files for your static assets. See the [creating a manifest file](#creating-a-manifest-file) section for more information.

This module provides a single class which can be configured using [options](#options).

```js
import path from 'path'
import AssetLoader from '@financial-times/anvil-server-asset-loader'

const assetLoader = new AssetLoader({
  publicPath: 'https://cdn.site.com/assets',
  fileSystemPath: path.resolve('./dist'),
})
```

The asset loader provides methods which can be used to locate assets on the file system and create URLs:

```js
// Get the absolute file system path to an asset
const assetPath = assetLoader.getFileSystemPath('main.css')

// Get the public URL to an asset
const assetURL = assetLoader.getPublicURL('main.css')
```

If you have configured your build step to split code into multiple files - such as when using Webpack's code splitting functionality - and are including this information in your manifest file then the asset loader also provides methods to retrieve it:

```js
const scriptURLs = assetLoader.getScriptURLsFor('main')
const stylesheetURLs = assetLoader.getStylesheetURLsFor('main')
```


## API

### `getHashedAsset(filename: string)`

Returns the output file name for the given the source file name.

### `getPublicURL(filename: string)`

Returns the public URL (accessible to a website user) for the given the source file name.

### `getFileSystemPath(filename: string)`

Returns the absolute file system path to an output file for the given the source file name.

### `getFileContents(filename: string)`

Loads the contents of an output file for the given the source file name.

### `getHashedAssetsMatching(pattern: string | RegExp | Function)`

Returns an array of output file names whose source file name matches the supplied pattern.

### `matchAssets(pattern: string | RegExp | Function)`

Match source file names based on a pattern which may be useful when output is split into multiple files.

### `getFilesFor(entrypoint: string)`

If the manifest file supports listing files generated for each entry point (which is the case if you are using the [Anvil CLI](../anvil-cli/readme.md)) this method can be used to return a list of all files organised by type.

### `getScriptFilesFor(entrypoint: string)`

Returns an array of JavaScript output file names generated for an entry point.

### `getStylesheetFilesFor(entrypoint: string)`

Returns an array of Stylesheet output file names generated for an entry point.

### `getScriptPathsFor(entrypoint: string)`

Returns an array of JavaScript file system paths generated for an entry point.

### `getStylesheetPathsFor(entrypoint: string)`

Returns an array of Stylesheet file system paths generated for an entry point.

### `getScriptURLsFor(entrypoint: string)`

Returns an array of JavaScript file URLs generated for an entry point.

### `getStylesheetURLsFor(entrypoint: string)`

Returns an array of Stylesheet file URLs generated for an entry point.


## Options

The `AssetLoader` class accepts the following parameters. All parameters are optional:

### `manifestFileName`

The name of the asset manifest file. This will be resolved relative to the `fileSystemPath`. Defaults to `"manifest.json"`.

### `manifest`

An object mapping file names to hashed file name, to be used as the [manifest](#creating-a-manifest-file). If specified, the manifest will not be looked up using the `fileSystemPath`  and `manifestFileName`.

### `publicPath`

The public-facing URL for the static assets. This is used when formatting publicly accessible URLs to assets for the browser or user to download. This should begin with a slash or protocol (e.g. `https://`) but no trailing slash is necessary.

> NOTE: Beware that this may clash with the [webpack `publicPath`](https://webpack.js.org/guides/public-path/) setting

### `cacheFileContents`

Store files in memory when accessed. The cache is global and is shared between all instances of the asset loader. Defaults to `false`.

### `fileSystemPath`

The absolute path to the directory of static assets. This will be used to locate files in order to read them. Defaults to `path.resolve("./public")`.


## Creating a manifest file

To use the asset loader you must provide a manifest file. If you have implemented a build step you should configure your build tooling to output this file alongside your other compiled files.

A manifest is a JSON file which provides a map of source file names to their corresponding output file names, e.g.:

```json
{
  "main.js": "main.1793bd7a.js"
}
```

This is required because many build tools can be configured to write files with different output names or split code into multiple chunks which can change or are not human readable.

Plugins to create manifest files are available for most build popular tools:

- [Manifest plugin for Webpack](https://github.com/webdeveric/webpack-assets-manifest)
- [Manifest plugin for Parcel](https://www.npmjs.com/package/parcel-plugin-bundle-manifest)
- [Hash plugin with manifest support for Rollup](https://www.npmjs.com/package/rollup-plugin-hash-manifest)

If your build step is configured to split code into multiple files this information should also be included in the manifest so that the associations between files are preserved. For example when using the [webpack-assets-manifest] plugin with Webpack it can be configured to output an `entrypoints` block like this:

```json
{
  "main.js": "main.1793bd7a.js",
  "secondary.js": "secondary.jh340230.js",
  "1.js": "1.jh340230.js",
  "2.js": "2.i1s842n3.js",
  "3.js": "3.as128n19.js",
  "entrypoints": {
    "main": {
      "js": ["main.1793bd7a.js", "1.jh340230.js", "2.i1s842n3.js"]
    },
    "secondary": {
      "js": ["secondary.1793bd7a.js", "1.jh340230.js", "3.as128n19.js"]
    }
  }
}
```

With this information it is possible to retrieve all of the files required for the "main" JavaScript entry point and for the "secondary" entry point.

[webpack-assets-manifest]: https://github.com/webdeveric/webpack-assets-manifest
