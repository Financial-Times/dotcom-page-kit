import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../../components/Favicon'

describe('dotcom-ui-shell/src/components/Favicon', () => {
  it('renders the document favicon', () => {
    const tree = renderer.create(<Subject />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
