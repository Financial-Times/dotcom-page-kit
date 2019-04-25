import subject from '../../lib/flattenOpenGraphData'

const fixture = Object.freeze({
  og: {
    title: 'Open Graph title',
    video: 'https://my.site/video.mp4',
    'video:type': 'video/mp4',
    'video:width': 640,
    'video:height': 360
  },
  article: {
    published_time: '2019-02-27T06:59:35.000Z',
    modified_time: '2019-02-27T16:01:21.000Z',
    author: ['Joe Bloggs', 'Jane Doe']
  }
})

describe('anvil-ui-open-graph/src/lib/flattenOpenGraphData', () => {
  it('returns an array', () => {
    const result = subject(fixture)
    expect(result).toEqual(expect.any(Array))
  })

  it('flattens the given object into property/value pairs', () => {
    const result = subject(fixture)

    expect(result[1]).toEqual(['og:video', fixture.og.video])
    expect(result[5]).toEqual(['article:published_time', fixture.article.published_time])
  })

  it('can handle nested data', () => {
    const result = subject(fixture)

    expect(result[7]).toEqual(['article:author', fixture.article.author[0]])
    expect(result[8]).toEqual(['article:author', fixture.article.author[1]])
  })
})
