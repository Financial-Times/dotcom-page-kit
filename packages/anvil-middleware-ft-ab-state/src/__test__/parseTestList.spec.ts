import subject from '../parseTestList'

describe('anvil-middleware-ft-ab-test/src/parseTestList', () => {
  it('transforms a list of A/B tests into a map', () => {
    expect(subject('')).toBeInstanceOf(Map)
  })

  it('adds each test to the map', () => {
    const result = subject('foo:bar,baz:qux')

    expect(result.get('foo')).toEqual('bar')
    expect(result.get('baz')).toEqual('qux')
  })

  it('ignores invalid tests', () => {
    const result = subject('foo:bar,baz')

    expect(result.has('foo')).toEqual(true)
    expect(result.has('baz')).toEqual(false)
  })
})
