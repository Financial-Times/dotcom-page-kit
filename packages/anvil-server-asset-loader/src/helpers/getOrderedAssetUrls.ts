import AssetLoader from '..'

export function getOrderedAssetUrls(loader: AssetLoader) {
  const order = { first: [], middle: [], last: [] }

  forEachAssetIn(loader, ({ asset, publicAssetPath }) => {
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
  for (let key of Object.keys(loader.manifest)) {
    const asset = loader.getHashedAsset(key)
    const publicAssetPath = loader.getPublicPath(key)
    callback({ asset, publicAssetPath })
  }
}
