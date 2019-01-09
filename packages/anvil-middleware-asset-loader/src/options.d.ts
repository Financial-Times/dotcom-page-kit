import { AssetLoaderOptions } from '@financial-times/anvil-server-asset-loader'

export interface MiddlewareOptions extends AssetLoaderOptions {
  /**
   * Set to true if assets should be served from a local directory
   * @default false
   */
  hostStaticAssets?: boolean
}
