import path from 'path'
import subject from '../getPartialName'

describe('anvil-server-handlebars/src/getPartialName', () => {
  it('removes the file extension', () => {
    const baseDirectory = './views/partials'
    const absolutePath = path.resolve(baseDirectory)
    const filePath = path.join(absolutePath, 'foo/bar.html')

    expect(subject(filePath)).not.toContain('.html')
  })
})
