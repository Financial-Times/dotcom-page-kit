# @financial-times/dotcom-build-images

This package exports a Webpack plugin to provide support for static image assets in our asset pipeline.
The plugin will copy all image files contained in the `client/` directory, and any of its subdirectories, into the configured public directory. 


## Requirements

* Node 12.x


## Installation

```sh
npm install --save-dev @financial-times/dotcom-build-images
```

## Usage

After installing the package you must add it to the list of plugins in your project's `webpack.config.js` configuration file:

```diff
+ const { PageKitImagesPlugin } = require('@financial-times/dotcom-build-images')

module.export = {
  plugins: [
+    new PageKitImagesPlugin()
  ]
}
```

## Arguments

- `basePath` - Directory to look in for images. Defaults to `./client/`.


## Notes

The directory path for each image will be retained e.g.

`image.jpg` -> `image.jpg`
`images/image.jpg` -> `images/image.jpg`
`images/subdir/image.jpg` -> `images/subdir/image.jpg`

The public image paths are automatically added to the generated `manifest.json`,
meaning that they're available via the `dotcom-server-asset-loader` e.g.

```
assetLoader.getPublicURL('images/subdir/image.jpg')
```

The image files are hashed in production.

## Caveats

- This works by creating a new "fake" entry point and will output a useless
  JS file - this was necessary because the manifest plugin used by Page Kit
  doesn't recognise the type of dependencies added by Webpack's copy plugin
  (so you wouldn't be able to access images via the asset loader, boo!)

- It is possible to use the copy plugin, but that would mean swapping the
  manifest plugin: https://gist.github.com/i-like-robots/9a460b55bcc34a38866b9cc163787639
