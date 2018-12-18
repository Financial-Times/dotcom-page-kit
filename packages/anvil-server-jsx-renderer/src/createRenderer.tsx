import React from 'react'
import htmlShell from '@financial-times/anvil-server-html-shell'
import AssetLoader from '@financial-times/anvil-server-asset-loader'
import { AnyObject } from '@financial-times/anvil-types-generic'
import { renderToStaticMarkup } from 'react-dom/server'

export interface Options {
  /**
   * The component that is used to
   * render the html document shell
   * @default @financial-times/anvil-ui-server-html-shell
   * */
  shellComponent: Function

  /**
   * The public url to the assets folder
   * @example http://foo.com/asstes
   */
  assetUrlPrefix: string

  /**
   * The file path to the asset manifest json file
   */
  assetManifestPath: string

  /**
   * The function to use to render the component
   * @default react-dom/server#renderToStaticMarkup
   */
  renderFn: Function
}

export interface RenderOptions {
  /**
   * The initial props that should be passed to the component
   */
  props?: AnyObject

  /**
   * The component that is used to
   * render the html document shell
   * */
  shellComponent?: Function
}

/**
 * Creates a renderer that can be used on the server to render JSX components
 *
 * @example
 * const render = createRenderer(options)
 *
 * app.get('/', (req, res) => { res.send(render(<HomePage greeting="hello" />)) })
 *
 * or
 *
 * app.get('/', (req, res) => { res.send(render(HomePage, { props: {greeting: hello} })) })
 */
export function createRenderer(options: Partial<Options> = {}) {
  const {
    assetUrlPrefix,
    assetManifestPath,
    renderFn = renderToStaticMarkup,
    shellComponent = htmlShell
  } = options

  return async (Component: Function | Object, renderOptions: RenderOptions = {}) => {
    const assetLoader = new AssetLoader({
      publicPath: assetUrlPrefix,
      manifestFile: assetManifestPath,
      cacheFileContents: false
    })

    const shell = renderOptions.shellComponent || shellComponent
    const render = renderFn
    const initialProps = renderOptions.props || (await getInitialPropsFrom(Component))
    const scriptsToLoad = [assetLoader.getHashedAsset('runtime.js'), assetLoader.getHashedAsset('client.js')]
    const componentIsObject = typeof Component === 'object'
    const ComponentToRender = Component as Function

    const body = render(componentIsObject ? Component : <ComponentToRender {...initialProps} />)

    return shell({ body, initialProps, scriptsToLoad })
  }
}

function getInitialPropsFrom(Component) {
  if (Component.getInitialProps) {
    return Component.getInitialProps()
  } else return {}
}
