import React from 'react'
import renderer from 'react-test-renderer'
import fixture from '../../__stories__/story-data'
import { LegalFooter as Subject } from '../../index'

const propsAnonymous = { ...fixture }

describe('dotcom-ui-footer/src/components, LegalFooter', () => {
  it('renders a legal footer component', () => {
    const tree = renderer.create(<Subject {...propsAnonymous} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
