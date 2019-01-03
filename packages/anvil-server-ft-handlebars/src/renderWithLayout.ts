export type RenderContext = { [key: string]: any; layout?: string; blocks?: string[] }

export default (handlebars, filePath: string, context: RenderContext): Promise<string> => {
  return new Promise((resolve, reject) => {
    handlebars.renderView(filePath, context, (error, html) => {
      if (error) {
        reject(error)
      } else {
        resolve(html)
      }
    })
  })
}
