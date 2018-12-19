import AssetLoader from '..'

export function getOrderedAssetUrls(loader: AssetLoader): string[] {
  const order = { first: [], middle: [], last: [] }

  forEachAssetIn(loader, ({ asset, publicAssetPath }) => {
    // TODO: make these prefixes configurable?
    if (asset.startsWith('runtime.')) order.first.push(publicAssetPath)
    if (asset.startsWith('npm.')) order.middle.push(publicAssetPath)
    if (asset.startsWith('client')) order.last.push(publicAssetPath)
  })

  return []
    .concat(order.first)
    .concat(order.middle)
    .concat(order.last)
}

function forEachAssetIn(loader: AssetLoader, callback) {
  for (const key of Object.keys(loader.manifest)) {
    if (/\.js$/.test(key)) {
      const asset = loader.getHashedAsset(key)
      const publicAssetPath = loader.getPublicPath(key)

      callback({ asset, publicAssetPath })
    }
  }
}
