import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../'

describe('anvil-ui-ft-shell/src/components/DocumentHead', () => {
  // TODO: better tests
  it('renders the document head', () => {
    const props = {
      description: 'Website description.',
      enableJsonLD: true,
      enableOpenGraph: true,
      facebookDescription: 'Facebook description.',
      facebookHeadline: 'Facebook headline',
      facebookImage: 'facebook.jpg',
      facebookPage: 'facebook-page-id',
      mainImage: 'main-image.jpg',
      metadata: { '@type': 'article', headline: 'JSON+LD headline' },
      pageTitle: 'Page title',
      siteTitle: 'Website title!',
      stylesheets: [],
      twitterDescription: 'Twitter description.',
      twitterHeadline: 'Twitter headline',
      twitterImage: 'twitter.jpg',
      twitterSite: '@twitter_page',
      url: 'https://my.site'
    }

    const tree = renderer.create(<Subject {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
