import React from 'react'
import renderer from 'react-test-renderer'
import GTMBody from '../../components/GTMBody'

describe('dotcom-ui-shell/src/components/GTMBody', () => {
  it('renders the gtm body script when the enableGTM flag is on', () => {
    const props = {
      flags: {
        enableGTM: true
      }
    }

    const tree = renderer.create(<GTMBody {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders null when the enableGTM flag is off', () => {
    const props = {
      flags: {
        enableGTM: false
      }
    }

    const tree = renderer.create(<GTMBody {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders null when there is no enableGTM', () => {
    const props = {
      flags: {}
    }

    const tree = renderer.create(<GTMBody {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
