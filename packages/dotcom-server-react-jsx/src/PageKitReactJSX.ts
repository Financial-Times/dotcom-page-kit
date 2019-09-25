import { createElement } from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import interopRequire from './interopRequire'
import { Renderable, RenderCallback } from './types'

export interface TPageKitReactJSXOptions {
  useStaticRendering?: boolean
}

const defaultOptions: TPageKitReactJSXOptions = {
  useStaticRendering: false
}

export class PageKitReactJSX {
  public options: TPageKitReactJSXOptions
  public engine: Function

  constructor(userOptions: TPageKitReactJSXOptions = {}) {
    this.options = { ...defaultOptions, ...userOptions }
    this.engine = this.renderView.bind(this)
  }

  async render(component: Renderable, context: any, includeDoctype?: boolean): Promise<string> {
    if (typeof component.getInitialProps === 'function') {
      context = await component.getInitialProps(context)
    }

    const outputPrefix = includeDoctype ? '<!DOCTYPE html>' : ''
    const renderMethod = this.options.useStaticRendering ? renderToStaticMarkup : renderToString
    const outputHTML = renderMethod(createElement(component, context))

    return outputPrefix + outputHTML
  }

  async renderView(viewPath: string, context: any, callback: RenderCallback): Promise<void> {
    try {
      const element = interopRequire(viewPath) as Renderable

      if (typeof element !== 'function') {
        throw Error(`The module ${viewPath} requires a default export.`)
      }

      const output = await this.render(element, context, true)

      callback(null, output)
    } catch (error) {
      callback(error)
    }
  }
}
