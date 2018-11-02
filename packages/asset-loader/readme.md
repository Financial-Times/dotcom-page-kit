# Asset Loader

Asset Loader allows running instances of apps to load and execute their assets from wherever those assets are stored.

It creates associations between individual applications and their bundled JS and CSS code by consuming a manifest file which should be output alongside the .js and .css code bundles.

### What do manifests have to do with loading assets?

A manifest is a JSON object which provides a map of file names to file paths, e.g.:

```
{
  "main.js": {
    "development": "/public/main.js",
    "production": "https://s3.aws.com/path-to-asset/main-1793bd7a.js"
  }
}
```

When `getAssetPath('asset.js')` is called on an instance of the AssetLoader the loader will check the `manifest.json` to find out where the code for 'asset.js' is stored for the current environment. For local development, the built assets will usually be in a `public`, or similar, directory. For production environments, the assets will be hosted somewhere. In the example manifest above the production code for `main.js` has been given a hashed filename and saved to an S3 location.


### Usage

Create an instance of the AssetLoader and pass in a manifest.json file.

```
const loader = new AssetLoader('path/to/manifest')
```

The loader has some built-in functions which create HTML elements useful for asset management: `createStylesheetLink`, `createJavascriptLink`, `getStylesheetInline` and `getJavascriptInline`.

// TODO: Expand on usage once we have more of the implementation worked out.

