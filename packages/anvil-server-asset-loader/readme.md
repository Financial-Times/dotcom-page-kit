# anvil-server-asset-loader

This package enables apps to locate their static hashed assets from wherever they are stored.

It creates associations between applications and their bundled JS and CSS code by consuming a manifest file.


## Installation

This module is compatible with Node 8+ and is distributed on npm.

```bash
npm install -S @financial-times/anvil-server-asset-loader
```

You will also need to ensure your application is configured to create manifest files for your static assets. See the [creating a manifest](#creating-a-manifest) section for more information.


## Usage

This module provides a single class, `AssetLoader`. When creating a new instance of `AssetLoader` it requires several options to be provided.

```js
const path = require('path')
const AssetLoader = require('@financial-times/anvil-server-asset-loader')

const assetLoader = new AssetLoader({
  manifestFile: path.join(process.cwd(), 'asset-manifest.json')
  publicPath: 'https://cdn.site.com/assets',
  fileSystemPath: path.join(process.cwd(), 'public'),
  cacheFileContents: false
})
```

The options are:

- `manifestFile` - A fully resolved path to the manifest file
- `publicPath` - The base URL for assets (as seen by users)
- `fileSystemPath` - An absolute path to the assets folder on disk
- `cacheFileContents` - Store file contents in memory when accessed (optional)

The asset loader instance provides several methods to retrieve the public and private paths to assets and load their contents.


## Creating a manifest

To begin with you must create a manifest file. If you have implemented a build step you should configure your tools to output this file alongside your other compiled files.

A manifest is a JSON file which provides a map of original file names to their production file names, e.g.:

```
{
  "main.js": {
    "development": "main.1793bd7a.js"
  }
}
```

This is important because many build tools can be configured to write files with different names. Often file names will be appended with a hash based on their contents to ensure the file is redownloaded by users when it changes.

Plugins to create manifest files are available for most build tools:

- [Manifest plugin for Webpack](https://www.npmjs.com/package/webpack-manifest-plugin)
- [Manifest plugin for Parcel](https://www.npmjs.com/package/parcel-plugin-bundle-manifest)
- [Manifest plugin for Rollup](https://www.npmjs.com/package/rollup-plugin-hash-manifest)
