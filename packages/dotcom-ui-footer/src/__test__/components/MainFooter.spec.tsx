import React from 'react'
import renderer from 'react-test-renderer'
import fixture from '../../__stories__/story-data'
import { Footer as Subject } from '../../index'

const propsAnonymous = { ...fixture }

describe('dotcom-ui-footer/src/components, Footer', () => {
  it('renders a standard footer component', () => {
    const tree = renderer.create(<Subject {...propsAnonymous} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
