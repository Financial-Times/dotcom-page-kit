import path from 'path'
import Subject from '../HandlebarsRenderer'

// NOTE: Tests are run from the repository root directory so we need to set the CWD
const root = path.join(__dirname, '__fixtures__')

describe('anvil-server-handlebars/src/HandlebarsRenderer', () => {
  let instance

  beforeEach(() => {
    instance = new Subject({
      rootDirectory: root,
      fileExtension: '.hbs'
    })
  })

  it('can render a template with partials', () => {
    const context = { title: 'Hello World', aside: 'Lorem ipsum' }
    const result = instance.render('view.hbs', context)

    expect(result).toContain('<h1>Hello World</h1>')
    expect(result).toContain('<aside>Lorem ipsum</aside>')
  })
})
