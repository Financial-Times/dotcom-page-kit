import subject from '../getResourceType'

describe('anvil-server-resource-hints/src/getFileType', () => {
  it('uses the file extension to match to a resource type', () => {
    expect(subject('style.css')).toEqual('style')
    expect(subject('script.js')).toEqual('script')
    expect(subject('image.png')).toEqual('image')
    expect(subject('font.woff')).toEqual('font')
  })

  it('throws if the file extension cannot be matched', () => {
    expect(() => subject('style.doc')).toThrow()
  })
})
