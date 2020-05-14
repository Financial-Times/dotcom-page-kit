import subject from '../../server/formatFlagsJSON'

const fixture = Object.freeze({ foo: 1, bar: false, baz: 'qux' })

describe('dotcom-ui-flags/src/server/formatFlagsJSON', () => {
  it('filters out properties with falsey values', () => {
    const result = subject(fixture)
    expect(result).toStrictEqual({ foo: 1, baz: 'qux' })
  })
})
