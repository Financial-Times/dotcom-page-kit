import subject from '..'

describe('sample-package', () => {
  it('multiplies the given number by 5', () => {
    expect(subject(1)).toEqual(5)
    expect(subject(2)).toEqual(10)
    expect(subject(3)).toEqual(15)
  })
})
