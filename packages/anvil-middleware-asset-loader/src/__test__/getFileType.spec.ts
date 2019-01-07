import subject from '../getFileType'

describe('anvil-middleware-asset-loader/src/getFileType', () => {
  it('uses the file extension to match a resource directive', () => {
    expect(subject('style.css')).toEqual('style')
    expect(subject('script.js')).toEqual('script')
    expect(subject('image.png')).toEqual('image')
    expect(subject('font.woff')).toEqual('font')
  })

  it('returns null if the file extension cannot be matched', () => {
    expect(subject('style.doc')).toBeNull()
  })
})
