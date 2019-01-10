import subject from '../parseTestValue'

describe('anvil-middleware-ft-ab-test/src/parseTestValue', () => {
  it('parses booleans and numbers', () => {
    expect(subject('true')).toEqual(true)
    expect(subject('false')).toEqual(false)
    expect(subject('123')).toEqual(123)
  })

  it('parses "on" and "off"', () => {
    expect(subject('on')).toEqual(true)
    expect(subject('off')).toEqual(false)
  })

  it('returns a string for anything else', () => {
    expect(subject('control')).toEqual('control')
    expect(subject('variant1')).toEqual('variant1')
    expect(subject('100px')).toEqual('100px')
  })
})
