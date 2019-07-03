import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../../components/OpenGraph'

describe('dotcom-ui-shell/src/components/OpenGraph', () => {
  it('renders the given Open Graph data to meta tags', () => {
    const fixture = {
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
    }

    const tree = renderer.create(<Subject openGraph={fixture} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
