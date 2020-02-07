describe('examples/combined-hbs-jsx', () => {
  describe('Handlebars output passed to a JSX component', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:3456/hbs-to-jsx', { waitUntil: 'load' })
    })

    it('renders the JSX component (imported from local path) as a parent of the Handlebars partial', async () => {
      // Cannot use direct child selector `>` because React dangerouslySetInnerHTML
      // creates containing element tags which create an intermediary between the parent and child elements.
      const instancesOfHbsPartialWithinJsxComponent = await page.evaluate(
        () => document.querySelectorAll('.jsx-component-with-hbs-output .hbs-output').length
      )

      expect(instancesOfHbsPartialWithinJsxComponent).toBe(1)
    })

    it('renders the JSX component imported from Page Kit as an external dependency', async () => {
      const siteNavigationElement = await page.evaluate(() => document.getElementById('site-navigation'))

      expect(siteNavigationElement).not.toBe(null)
    })
  })

  describe('JSX output passed to a Handlebars partial', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:3456/jsx-to-hbs', { waitUntil: 'load' })
    })

    it('renders the Handlebars partial as a parent of the JSX component', async () => {
      const instancesOfJsxComponentWithinHbsPartial = await page.evaluate(
        () => document.querySelectorAll('.hbs-partial-template-with-jsx-output > .jsx-output').length
      )

      expect(instancesOfJsxComponentWithinHbsPartial).toBe(1)
    })
  })
})
