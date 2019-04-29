import React from 'react'
import { Shell } from '../../components/Shell'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('anvil-ui-ft-shell/src/components/Shell', () => {
  it('should define all props as optional except the `pageTitle` prop', () => {
    new ShallowRenderer().render(<Shell pageTitle="Foo" />)
  })
})
