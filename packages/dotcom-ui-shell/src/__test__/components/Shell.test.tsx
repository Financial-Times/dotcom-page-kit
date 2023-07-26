import React from 'react'
import renderer from 'react-test-renderer'
import ShallowRenderer from 'react-test-renderer/shallow'
import { Shell } from '../../components/Shell'

describe('dotcom-ui-shell/src/components/Shell', () => {
  it('should define all props as optional except the `pageTitle` prop', () => {
    new ShallowRenderer().render(<Shell pageTitle="Foo" />)
  })

  it('renders boolean boolean html data attributes correctly', () => {
    const htmlAttributes = { dataIsProduction: '', dataIsDevelopment: false }
    const htmlTag = renderer.create(<Shell pageTitle="Foo" htmlAttributes={htmlAttributes} />).toJSON()

    // where react is concerned, a `true` boolean data attribute
    // is one where the attribute value is an empty string (because
    // it is not possible to render the attribute without a value),
    // and a `false` boolean data attribute is one where the attribute
    // has not been specified altogether
    expect(htmlTag.props).toHaveProperty('data-is-production', '')
    expect(htmlTag.props).not.toHaveProperty('data-is-development')
  })

  it('renders the GTM script when the enableGTM flag is on', () => {
    const tree = renderer.create(<Shell pageTitle="Foo" flags={{ enableGTM: true }} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  describe('when the variableFonts flag is on', () => {
    it('should render with variable fonts included in the DOM', () => {
      const tree = renderer.create(<Shell pageTitle="Foo" flags={{ variableFonts: true }} />)
      const testInstance = tree.root;
      const variableFontsList = testInstance.findAllByType('link').filter((link) => link.props.href.includes('-VF'))

      expect(variableFontsList.length).toBe(2)
    })
  })

  describe('when the variableFonts flag is off', () => {
    it('should not render with variable fonts included in the DOM', () => {
      const tree = renderer.create(<Shell pageTitle="Foo" flags={{ variableFonts: false }} />)
      const testInstance = tree.root;
      const variableFontsList = testInstance.findAllByType('link').filter((link) => link.props.href.includes('-VF'))

      expect(variableFontsList.length).toBe(0)
    })
  })

  describe('when flags are not defined', () => {
    it('should not render with variable fonts included in the DOM', () => {
      const tree = renderer.create(<Shell pageTitle="Foo" />)
      const testInstance = tree.root;
      const variableFontsList = testInstance.findAllByType('link').filter((link) => link.props.href.includes('-VF'))

      expect(variableFontsList.length).toBe(0)
    })
  })
})
