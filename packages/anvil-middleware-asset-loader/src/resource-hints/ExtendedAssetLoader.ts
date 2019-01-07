import getFileType from './getFileType'
import createHint from './createHint'
import AssetLoader from '@financial-times/anvil-server-asset-loader'

export default class ExtendedAssetLoader extends AssetLoader {
  public hints: Set<string> = new Set()

  use(filename: string): string {
    const isAbsolute = /^\/|https?:\/\//

    if (!isAbsolute.test(filename)) {
      filename = this.getPublicPath(filename)
    }

    this.hints.add(filename)

    return filename
  }

  toString(): string {
    const hints = []

    for (const filename of this.hints) {
      const type = getFileType(filename)
      hints.push(createHint(filename, { as: type }))
    }

    return hints.join(', ')
  }
}
