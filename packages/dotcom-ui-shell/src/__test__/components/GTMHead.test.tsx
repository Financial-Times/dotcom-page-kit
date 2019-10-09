import React from 'react'
import renderer from 'react-test-renderer'
import GTMHead from '../../components/GTMHead'

describe('dotcom-ui-shell/src/components/GTMHead', () => {
  it('renders the gtm head script when the enableGTM flag is on', () => {
    const props = {
      flags: {
        enableGTM: true
      }
    }

    const tree = renderer.create(<GTMHead {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders null when the enableGTM flag is off', () => {
    const props = {
      flags: {
        enableGTM: false
      }
    }

    const tree = renderer.create(<GTMHead {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
