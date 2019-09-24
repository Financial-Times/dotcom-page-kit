import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../../components/Description'

describe('dotcom-ui-shell/src/components/Title', () => {
  it('renders the document description when description prop is passed', () => {
    const tree = renderer.create(<Subject description="test description" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders an empty description when description prop is not passed', () => {
    const tree = renderer.create(<Subject />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
