import path from 'path'
import { loadFile } from './loadFile'
import { loadManifest } from './loadManifest'

interface AssetLoaderOptions {
  /** A fully resolved path to manifest file */
  manifestPath: string
  /** The base URL or path to assets */
  publicPath: string
  /** The absolute path to assets on disk */
  internalPath: string
}

class AssetLoader {
  private manifest: object
  private publicPath: string
  private internalPath: string

  constructor(options: AssetLoaderOptions) {
    this.manifest = loadManifest(options.manifestPath)
    this.publicPath = options.publicPath
    this.internalPath = options.internalPath
  }

  getHashedAsset(asset: string): string {
    if (this.manifest.hasOwnProperty(asset)) {
      return this.manifest[asset]
    } else {
      throw Error(`Couldn't find asset "${asset}" in manifest`)
    }
  }

  getFileContents(asset: string): string {
    return loadFile(this.getInternalPath(asset))
  }

  getInternalPath(asset: string): string {
    const hashedAsset = this.getHashedAsset(asset)
    return path.join(this.internalPath, hashedAsset)
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
