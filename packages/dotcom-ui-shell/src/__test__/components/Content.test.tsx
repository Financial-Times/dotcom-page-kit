import React from 'react'
import renderer from 'react-test-renderer'
import Subject from '../../components/Content'

describe('dotcom-ui-shell/src/components/Content', () => {
  describe('with stringified contents', () => {
    it('renders the given HTML string without escaping', () => {
      const contents = '<p>Hello, World!</p>'
      const tree = renderer.create(<Subject contents={contents} />).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('with component contents', () => {
    it('renders the components', () => {
      const contents = <p>Hello, World!</p>
      const tree = renderer.create(<Subject contents={contents} />).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
