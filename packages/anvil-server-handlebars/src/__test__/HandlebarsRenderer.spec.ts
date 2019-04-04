import path from 'path'
import Subject from '../HandlebarsRenderer'

// NOTE: Tests are run from the repository root directory
const root = path.join(__dirname, '__fixtures__')

describe('anvil-server-handlebars/src/HandlebarsRenderer', () => {
  let instance

  beforeEach(() => {
    instance = new Subject({
      rootDirectory: root,
      fileExtension: '.hbs',
      partialDirGlobs: { [root]: '*' }
    })
  })

  it('can render a simple template', () => {
    const viewPath = path.join(root, 'content.hbs')
    const context = { title: 'Hello World' }
    const result = instance.render(viewPath, context).trim()

    expect(result).toEqual('<h1>Hello World</h1>')
  })

  it('can render templates with partials', () => {
    const viewPath = path.join(root, 'view.hbs')
    const context = {
      title: 'Hello World',
      aside: 'Lorem ipsum'
    }
    const result = instance.render(viewPath, context).trim()

    expect(result).toContain('<h1>Hello World</h1>')
    expect(result).toContain('<aside>Lorem ipsum</aside>')
  })
})
