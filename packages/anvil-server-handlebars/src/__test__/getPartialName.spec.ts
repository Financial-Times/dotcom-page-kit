import path from 'path'
import subject from '../getPartialName'

describe('anvil-server-handlebars/src/getPartialName', () => {
  it('returns the path relative to the base directory', () => {
    const baseDirectory = './views/partials'
    const absolutePath = path.resolve(baseDirectory)
    const filePath = path.join(absolutePath, 'foo/bar.html')

    expect(subject(baseDirectory, filePath)).toMatch(/^foo\/bar/)
  })

  it('removes the file extension', () => {
    const baseDirectory = './views/partials'
    const absolutePath = path.resolve(baseDirectory)
    const filePath = path.join(absolutePath, 'foo/bar.html')

    expect(subject(baseDirectory, filePath)).not.toContain('.html')
  })
})
