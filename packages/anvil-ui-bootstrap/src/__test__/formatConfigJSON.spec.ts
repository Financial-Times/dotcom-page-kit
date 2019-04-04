import subject from '../formatConfigJSON'

describe('anvil-ui-bootstrap/src/formatConfigJSON', () => {
  it('returns a string', () => {
    const result = subject([], [])
    // NOTE: '' !== String('')
    expect(typeof result === 'string').toBeTruthy()
  })

  it('returns a parseable JSON string', () => {
    const result = JSON.parse(subject([], []))

    expect(result.core).toBeInstanceOf(Array)
    expect(result.enhanced).toBeInstanceOf(Array)
  })
})
