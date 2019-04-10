import subject from '../getBootstrapJS'

describe('anvil-ui-bootstrap/src/formatConfigJSON', () => {
  it('returns the JS snippet', () => {
    const result = subject()

    expect(typeof result === 'string').toBeTruthy()
    expect(result).toMatch(/isEnhancedBrowser/)
  })
})
