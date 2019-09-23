import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../../components/Title'

describe('dotcom-ui-shell/src/components/Title', () => {
  it('renders the document title when pageTitle is passed', () => {
    const tree = renderer.create(<Subject pageTitle="test title" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders the document title when siteTitle is passed', () => {
    const tree = renderer.create(<Subject pageTitle="test page title" siteTitle="test site title" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
