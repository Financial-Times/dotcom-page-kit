import subject from '../createHint'

describe('anvil-middleware-asset-loader/src/createHint', () => {
  it('formats a given resource as a link header', () => {
    const result = subject('main.css', { as: 'style', rel: 'prefetch' })
    expect(result).toEqual('<main.css>; as="style"; rel="prefetch"; nopush')
  })

  it('sets a default hint when one is not provided', () => {
    const result = subject('app.js', { as: 'script', rel: null })
    expect(result).toEqual('<app.js>; as="script"; rel="preload"; nopush')
  })
})
