import subject from '../../lib/getResourceType'

describe('dotcom-ui-shell/src/lib/getResourceType', () => {
  it('uses the file extension to match to a resource type', () => {
    expect(subject('style.css')).toEqual('style')
    expect(subject('script.js')).toEqual('script')
    expect(subject('image.png')).toEqual('image')
    expect(
      subject(
        'https://www.ft.com/__origami/service/build/v3/font?font_format=woff2&font_name=MetricWeb-Regular&system_code=origami&version=1.12'
      )
    ).toEqual('font')
  })

  it('throws if the file extension cannot be matched', () => {
    expect(() => subject('style.doc')).toThrow()
  })

  it('supports URLs', () => {
    expect(subject('www.example.com/assets/style.css')).toEqual('style')
    expect(subject('www.example.com/images/graphic.svg#icon')).toEqual('image')
    expect(subject('www.example.com/scripts/index.js')).toEqual('script')
  })

  it('supports file paths', () => {
    expect(subject('/assets/public/style.as83hd99.css')).toEqual('style')
  })
})
