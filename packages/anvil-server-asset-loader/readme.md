# anvil-server-asset-loader

This package provides functions to help applications locate their static assets from wherever they are output.


### Getting started

This module is compatible with Node 10+ and is distributed on npm.

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

### `getChunksForEntrypoint(entrypoint: string)`

If the manifest file supports listing chunks generated for each entrypoint (which is the case if you are using the [Anvil CLI](../anvil-cli/readme.md)) this method can be used to return a list of chunks organised by type.

### `getScriptChunksForEntrypoint(entrypoint: string)`

Returns the JavaScript chunks generated for an entrypoint.

### `getStylesheetChunksForEntrypoint(entrypoint: string)`

Returns the CSS chunks generated for an entrypoint.


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

```
{
  "main.js": "main.1793bd7a.js"
}
```

This is required because many build tools can be configured to write files with different output names or split code into multiple chunks which can change or are not human readable.

Plugins to create manifest files are available for most build popular tools:

- [Manifest plugin for Webpack](https://www.npmjs.com/package/webpack-manifest-plugin)
- [Manifest plugin for Parcel](https://www.npmjs.com/package/parcel-plugin-bundle-manifest)
- [Hash plugin with manifest support for Rollup](https://www.npmjs.com/package/rollup-plugin-hash-manifest)
