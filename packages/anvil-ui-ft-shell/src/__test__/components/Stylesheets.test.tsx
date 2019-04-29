import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../../components/StyleSheets'

describe('anvil-ui-ft-shell/src/components/StyleSheets', () => {
  it('renders the given stylesheets and critical styles', () => {
    const props = {
      stylesheets: ['path/to/styles.css'],
      criticalStyles: 'html { margin: 0 } body { font-family: "Comic Sans" }'
    }

    const tree = renderer.create(<Subject {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
