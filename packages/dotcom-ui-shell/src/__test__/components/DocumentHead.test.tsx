import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../../components/DocumentHead'

describe('dotcom-ui-shell/src/components/DocumentHead', () => {
  it('renders the document head', () => {
    const props = {
      description: 'Website description.',
      facebookPage: 'facebook-page-id',
      pageTitle: 'Page title',
      siteTitle: 'Website title',
      twitterSite: '@twitter_page',
      canonicalURL: 'https://my.site',
      metaTags: [{ rel: 'alternate', type: 'application/rss+xml', href: 'path/to/rss' }]
    }

    const tree = renderer.create(<Subject {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should not render smart banner meta tag when showSmartBanner false', () => {
    const props = {
      description: 'Website description.',
      facebookPage: 'facebook-page-id',
      pageTitle: 'Page title',
      siteTitle: 'Website title',
      twitterSite: '@twitter_page',
      canonicalURL: 'https://my.site',
      metaTags: [{ rel: 'alternate', type: 'application/rss+xml', href: 'path/to/rss' }],
      showSmartBanner: false
    }

    const tree = renderer.create(<Subject {...props} />).root
    expect(() => {
      tree.findByProps({name: 'apple-itunes-app'})
    }).toThrow()
  })
})
