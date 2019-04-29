import subject from '../../server/getBootstrapJS'

describe('anvil-ui-bootstrap/src/server/formatConfigJSON', () => {
  it('returns the JS snippet', () => {
    const result = subject()

    expect(typeof result === 'string').toBeTruthy()
    expect(result).toMatch(/isEnhancedBrowser/)
  })
})
