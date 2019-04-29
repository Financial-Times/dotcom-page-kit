import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../../components/Body'

describe('anvil-ui-ft-shell/src/components/Body', () => {
  describe('with stringified contents', () => {
    it('renders the given HTML string without escaping', () => {
      const contents = '<p>Hello, World!</p>'
      const tree = renderer.create(<Subject contents={contents} />).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('with component contents', () => {
    const contents = <p>Hello, World!</p>
    const tree = renderer.create(<Subject contents={contents} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  describe('with custom attributes', () => {
    const attributes = { 'data-foo': 'bar', 'data-baz': 'qux' }
    const tree = renderer.create(<Subject contents="" {...attributes} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
