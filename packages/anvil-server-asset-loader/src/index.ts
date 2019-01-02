import path from 'path'
import { loadFile } from './helpers/loadFile'
import { loadManifest } from './helpers/loadManifest'

interface AssetLoaderOptions {
  /** A fully resolved path to the manifest file */
  manifestFile: string
  /** The base URL for assets (as seen by users) */
  publicPath: string
  /** An absolute path to the assets folder on disk */
  fileSystemPath?: string
  /** Store file contents in memory when accessed */
  cacheFileContents?: boolean
}

class AssetLoader {
  public manifest: object
  public options: AssetLoaderOptions

  constructor(options: AssetLoaderOptions) {
    this.manifest = loadManifest(options.manifestFile)
    this.options = options
  }

  getHashedAsset(asset: string): string {
    if (this.manifest.hasOwnProperty(asset)) {
      return this.manifest[asset]
    } else {
      throw Error(`Couldn't find asset "${asset}" in manifest`)
    }
  }

  findHashedAssets(pattern: string | RegExp): string[] {
    return Object.keys(this.manifest).reduce((matches: string[], key: string) => {
      const item = this.manifest[key]

      if (typeof pattern === 'string' && key.includes(pattern)) {
        matches.push(item)
      }
      if (pattern instanceof RegExp && pattern.test(key)) {
        matches.push(item)
      }

      return matches
    }, [])
  }

  getFileContents(asset: string): string {
    return loadFile(this.getFileSystemPath(asset), this.options.cacheFileContents)
  }

  getFileSystemPath(asset: string): string {
    const hashedAsset = this.getHashedAsset(asset)
    return path.join(this.options.fileSystemPath, hashedAsset)
  }

  getPublicPath(asset: string): string {
    const hashedAsset = this.getHashedAsset(asset)
    // Do not use path.join() as separator is platform specific
    return `${this.options.publicPath}/${hashedAsset}`
  }

  getStylesheetInline(stylesheet: string): string {
    return `<style>${this.getFileContents(stylesheet)}</style>`
  }

  getJavascriptInline(javascript: string): string {
    return `<script>${this.getFileContents(javascript)}</script>`
  }

  createStylesheetLink(stylesheet: string): string {
    return `<link rel="stylesheet" href="${this.getPublicPath(stylesheet)}">`
  }

  createJavascriptLink(javascript: string): string {
    return `<script src="${this.getPublicPath(javascript)}"></script>`
  }
}

export default AssetLoader
