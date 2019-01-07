import getFileType from './getFileType'
import createHint from './createHint'
import AssetLoader from '@financial-times/anvil-server-asset-loader'

export default class AssetLoaderWithHints extends AssetLoader {
  public hints: Set<string> = new Set()

  use(filename: string): string {
    const isAbsolute = /^\/|https?:\/\//

    if (isAbsolute.test(filename) === false) {
      filename = this.getPublicPath(filename)
    }

    this.hints.add(filename)

    return filename
  }

  toString(): string {
    const hints = []

    for (const filename of this.hints) {
      const url = this.getPublicPath(filename)
      const type = getFileType(filename)

      hints.push(createHint(url, { as: type }))
    }

    return hints.join(', ')
  }
}
