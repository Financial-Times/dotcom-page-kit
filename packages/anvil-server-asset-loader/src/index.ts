import path from 'path'
import { loadFile } from './loadFile'
import { loadManifest } from './loadManifest'

interface AssetLoaderOptions {
  /** A fully resolved path to the manifest file */
  manifestPath: string
  /** An absolute path to the assets folder on disk */
  fileSystemPath: string
  /** The base URL for assets (as seen by users) */
  publicPath: string
}

class AssetLoader {
  private manifest: object
  private publicPath: string
  private fileSystemPath: string

  constructor(options: AssetLoaderOptions) {
    this.manifest = loadManifest(options.manifestPath)
    this.publicPath = options.publicPath
    this.fileSystemPath = options.fileSystemPath
  }

  getHashedAsset(asset: string): string {
    if (this.manifest.hasOwnProperty(asset)) {
      return this.manifest[asset]
    } else {
      throw Error(`Couldn't find asset "${asset}" in manifest`)
    }
  }

  getFileContents(asset: string): string {
    return loadFile(this.getFileSystemPath(asset))
  }

  getFileSystemPath(asset: string): string {
    const hashedAsset = this.getHashedAsset(asset)
    return path.join(this.fileSystemPath, hashedAsset)
  }

  getPublicPath(asset: string): string {
    const hashedAsset = this.getHashedAsset(asset)
    // Do not use path.join() as separator is platform specific
    return `${this.publicPath}/${hashedAsset}`
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
