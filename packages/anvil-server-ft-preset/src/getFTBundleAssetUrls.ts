import AssetLoader from '@financial-times/anvil-server-asset-loader'

/**
 * Returns an array of public asset urls that are specific to the FT app bundle splitting strategy
 */
export function getFTBundleAssetUrls(assetLoader: AssetLoader) {
  return []
    .concat(concatablySilent(() => assetLoader.getPublicURL('runtime.js')))
    .concat(concatablySilent(() => assetLoader.getPublicURL('vendor.js')))
    .concat(concatablySilent(() => assetLoader.getPublicURL('shared.stable.js')))
    .concat(concatablySilent(() => assetLoader.getPublicURL('shared.volatile.js')))
    .concat(concatablySilent(() => assetLoader.getPublicURLOfHashedAssetsMatching(/o-(.*)\.js/)))
    .concat(concatablySilent(() => assetLoader.getPublicURLOfHashedAssetsMatching(/anvil-ui-(.*)\.js/)))
}

function concatablySilent(invoke: Function) {
  return asArray(silently(invoke))
}

function asArray(value: any) {
  if (value === undefined) return []
  if (Array.isArray(value)) return value
  return [value]
}

function silently(action: Function) {
  try {
    return action()
  } catch (e) {}
}
