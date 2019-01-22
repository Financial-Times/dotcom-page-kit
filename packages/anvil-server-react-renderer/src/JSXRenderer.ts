import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { Request, Response, NextFunction } from 'express'
import interopRequire from './interopRequire'

export type RenderElement = Function | any

export type RenderCallback = (error?: Error, output?: string) => any

class JSXRenderer {
  public engine: Function

  constructor() {
    // This method must be bound to this instance
    this.engine = this.viewEngine.bind(this)
  }

  async render(component: RenderElement, context: any, includeDoctype: boolean): Promise<string> {
    if (typeof component.getInitialProps === 'function') {
      context = await component.getInitialProps(context)
    }

    const outputPrefix = includeDoctype ? '<!DOCTYPE html>' : ''
    const outputHTML = renderToString(createElement(component, context))

    return outputPrefix + outputHTML
  }

  async viewEngine(viewPath: string, context: any, callback: RenderCallback): Promise<void> {
    try {
      const element = interopRequire(viewPath) as RenderElement

      if (typeof element !== 'function') {
        throw Error(`The module ${viewPath} requires a default export.`)
      }

      const output = await this.render(element, context, true)

      callback(null, output)
    } catch (error) {
      callback(error)
    }
  }

  async createHandler(element: RenderElement) {
    return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
      try {
        const context = { request, response }
        const output = await this.render(element, context, true)

        response.send(output)
      } catch (error) {
        next(error)
      }
    }
  }
}

export default JSXRenderer
