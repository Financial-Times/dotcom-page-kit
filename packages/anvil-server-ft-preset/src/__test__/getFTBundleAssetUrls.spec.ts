import { getFTBundleAssetUrls } from '../getFTBundleAssetUrls'
import { AssetLoader, AssetLoaderOptions } from '@financial-times/anvil-server-asset-loader'

const $manifest = {
  'main.js': 'main.bundle.js',
  'vendor.js': 'vendor.bundle.js',
  'runtime.js': 'runtime.bundle.js',
  'o-ads.js': 'o-ads.bundle.js',
  'o-date.js': 'o-date.bundle.js',
  'shared.stable.js': 'shared.stable.bundle.js',
  'shared.volatile.js': 'shared.volatile.bundle.js',
  'anvil-ui-ft-footer.js': 'anvil-ui-ft-footer.bundle.js',
  'anvil-ui-ft-header.js': 'anvil-ui-ft-header.bundle.js'
}

function createAssetLoader({
  manifest = $manifest,
  publicPath = 'public/assets',
  fileSystemPath = '/internal/path/to/assets',
  ...otherOptions
}: AssetLoaderOptions = {}) {
  return new AssetLoader({ manifest, publicPath, fileSystemPath, ...otherOptions })
}

describe('getFTBundleAssetUrls(assetUrl)', () => {
  it('should return the vendor asset urls', () => {
    const assetLoader = createAssetLoader()
    const result = getFTBundleAssetUrls(assetLoader)
    expect(result).toEqual([
      'public/assets/runtime.bundle.js',
      'public/assets/vendor.bundle.js',
      'public/assets/shared.stable.bundle.js',
      'public/assets/shared.volatile.bundle.js',
      'public/assets/o-ads.bundle.js',
      'public/assets/o-date.bundle.js',
      'public/assets/anvil-ui-ft-footer.bundle.js',
      'public/assets/anvil-ui-ft-header.bundle.js'
    ])
  })

  it('should not error if an asset url cannot be found', () => {
    const assetLoader = createAssetLoader({ manifest: {} })
    const result = getFTBundleAssetUrls(assetLoader)
    expect(result).toEqual([])
  })
})
