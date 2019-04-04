import subject from '../formatGlobPattern'

describe('anvil-server-handlebars/src/formatGlobPattern', () => {
  let result

  beforeEach(() => {
    result = subject('**/*', '.html')
  })

  it('prefixes with a separator', () => {
    expect(result).toMatch(/^\//)
  })

  it('appends the file extension', () => {
    expect(result).toMatch(/\.html$/)
  })

  it('puts the pattern in the middle', () => {
    expect(result).toEqual('/**/*.html')
  })
})
