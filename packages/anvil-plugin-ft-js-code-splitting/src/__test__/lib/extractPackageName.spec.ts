import subject from '../../lib/extractPackageName'

describe('anvil-plugin-ft-js-code-splitting/src/lib/extractPackageName', () => {
  it('ignores non-package paths', () => {
    const tests = ['/absolute/path/to/file.js', './relative/path/to/file.js']

    tests.forEach((test) => {
      expect(subject(test)).toBeUndefined()
    })
  })

  it('handles shallow nested package names', () => {
    const tests = ['/path/to/node_modules/n-foo-bar', '/path/to/node_modules/n-foo-bar/folder/file.js']

    tests.forEach((test) => {
      expect(subject(test)).toBe('n-foo-bar')
    })
  })

  it('handles deeply nested package names', () => {
    const tests = [
      '/path/to/node_modules/n-baz-qux/node_modules/n-foo-bar',
      '/path/to/node_modules/n-baz-qux/node_modules/n-foo-bar/folder/file.js'
    ]

    tests.forEach((test) => {
      expect(subject(test)).toBe('n-foo-bar')
    })
  })

  it('handles namespaced package names', () => {
    const tests = [
      '/path/to/node_modules/@financial-times/n-foo-bar',
      '/path/to/node_modules/@financial-times/n-foo-bar/folder/file.js'
    ]

    tests.forEach((test) => {
      expect(subject(test)).toBe('@financial-times/n-foo-bar')
    })
  })

  it('handles packages installed with Bower', () => {
    const tests = [
      '/path/to/bower_components/n-foo-bar',
      '/path/to/bower_components/n-foo-bar/folder/file.js'
    ]

    tests.forEach((test) => {
      expect(subject(test)).toBe('n-foo-bar')
    })
  })
})
