import getResourceType from './getResourceType'
import formatResourceHint from './formatResourceHint'
import AssetLoader from '@financial-times/anvil-server-asset-loader'

export default class ExtendedAssetLoader extends AssetLoader {
  private hints: Set<string> = new Set()

  addResourceHint(url: string): void {
    this.hints.add(url)
  }

  getPublicPathAndHint(filename: string): string {
    const publicPath = this.getPublicPath(filename)
    this.addResourceHint(publicPath)
    return publicPath
  }

  formatResourceHints(): string {
    const hints = []

    for (const filename of this.hints) {
      const type = getResourceType(filename)
      hints.push(formatResourceHint(filename, { as: type }))
    }

    return hints.join(', ')
  }
}
