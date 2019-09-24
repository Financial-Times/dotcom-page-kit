import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../../components/SocialMedia'

describe('dotcom-ui-shell/src/components/Title', () => {
  it('renders the social media meta when props are passed', () => {
    const tree = renderer.create(<Subject twitterSite="test description" facebookPage="test page" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a default social media meta when social media props are not passed', () => {
    const tree = renderer.create(<Subject />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
