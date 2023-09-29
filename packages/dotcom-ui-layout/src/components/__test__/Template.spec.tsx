/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'

import Subject from '../Template'

describe('dotcom-ui-layout/src/components/Template', () => {
  it('can render contents provided as a string', () => {
    const { container } = render(<Subject>{'<p>Hello World</p>'}</Subject>)

    expect(container.outerHTML).toContain('<div><p>Hello World</p></div>')
  })

  it('can render contents provided as children', () => {
    const { container } = render(
      <Subject>
        <p>Hello World</p>
      </Subject>
    )
    expect(container.outerHTML).toContain('<div><p>Hello World</p></div>')
  })
})
