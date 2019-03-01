import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../'

describe('anvil-ui-ft-shell/src/components/DocumentHead', () => {
  // TODO: better tests
  it('renders the document head', () => {
    const props = {
      description: 'Website description.',
      facebookPage: 'facebook-page-id',
      jsonLd: [{ '@type': 'article', headline: 'JSON+LD headline' }],
      openGraph: {
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
      },
      pageTitle: 'Page title',
      siteTitle: 'Website title',
      stylesheets: [],
      twitterSite: '@twitter_page',
      url: 'https://my.site'
    }

    const tree = renderer.create(<Subject {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
