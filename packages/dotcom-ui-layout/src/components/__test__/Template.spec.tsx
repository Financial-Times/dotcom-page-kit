/**
 * @jest-environment jsdom
 */
import 'jest-enzyme'
import React from 'react'
import { mount } from 'enzyme'

import Subject from '../Template'

describe('dotcom-ui-layout/src/components/Template', () => {
  it('can render contents provided as a string', () => {
    const result = mount(<Subject>{'<p>Hello World</p>'}</Subject>)
    expect(result.html()).toBe('<div><p>Hello World</p></div>')
  })

  it('can render contents provided as children', () => {
    const result = mount(
      <Subject>
        <p>Hello World</p>
      </Subject>
    )
    expect(result.html()).toBe('<div><p>Hello World</p></div>')
  })
})
