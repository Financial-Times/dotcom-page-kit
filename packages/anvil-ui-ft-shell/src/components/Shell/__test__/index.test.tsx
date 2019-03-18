import React from 'react'
import { Shell } from '..'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('<Shell />', () => {
  it('should define all props as optional except the `pageTitle` prop', () => {
    new ShallowRenderer().render(<Shell pageTitle="Foo" />)
  })
})
