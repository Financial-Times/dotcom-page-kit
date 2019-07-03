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
      canonicalURL: 'https://my.site'
    }

    const tree = renderer.create(<Subject {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
