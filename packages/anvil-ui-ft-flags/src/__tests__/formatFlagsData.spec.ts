import { formatFlagsJSON as subject } from '..'

const fixture = Object.freeze({ foo: 1, bar: false, baz: 'qux' })

describe('anvil-ui-ft-flags/src/formatFlagsJSON', () => {
  it('returns a stringified object', () => {
    const result = subject(fixture)
    // NOTE: '' !== String('')
    expect(typeof result === 'string').toBe(true)
  })

  it('filters out properties with falsey values', () => {
    const result = subject(fixture)
    expect(result).toBe('{"foo":1,"baz":"qux"}')
  })
})
