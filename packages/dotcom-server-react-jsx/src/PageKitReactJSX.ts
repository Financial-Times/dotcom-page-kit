import { createElement } from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import interopRequire from './interopRequire'
import { Request, Response, NextFunction } from 'express'
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

  async render(component: Renderable, templateContext: any, includeDoctype?: boolean): Promise<string> {
    if (typeof component.getInitialProps === 'function') {
      templateContext = await component.getInitialProps(templateContext)
    }

    const outputPrefix = includeDoctype ? '<!DOCTYPE html>' : ''
    const renderMethod = this.options.useStaticRendering ? renderToStaticMarkup : renderToString
    const outputHTML = renderMethod(createElement(component, templateContext))

    return outputPrefix + outputHTML
  }

  async renderView(viewPath: string, templateContext: any, callback: RenderCallback): Promise<void> {
    try {
      const element = interopRequire(viewPath) as Renderable

      if (typeof element !== 'function') {
        throw Error(`The module ${viewPath} requires a default export.`)
      }

      const output = await this.render(element, templateContext, true)

      callback(null, output)
    } catch (error) {
      callback(error)
    }
  }

  async createHandler(element: Renderable) {
    return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      try {
        const templateContext = { request, response }
        const output = await this.render(element, templateContext, true)

        response.send(output)
      } catch (error) {
        next(error)
      }
    }
  }
}
