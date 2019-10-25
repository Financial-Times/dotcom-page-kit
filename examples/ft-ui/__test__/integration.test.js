describe('examples/ft-ui', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('http://localhost:3456', { waitUntil: 'load' })
  })

  describe('JavaScript bootstrap', () => {
    it('flags that JavaScript is enabled', async () => {
      await expect(page).toMatchElement('html.js')
    })

    it('flags that the browser passes the cut the mustard test', async () => {
      await expect(page).toMatchElement('html.enhanced')
    })

    it('loads the configured scripts', async () => {
      await expect(page).toMatchElement('script[src^="https://polyfill.io"]')
      await expect(page).toMatchElement('script[src="public/scripts.bundle.js"]')
    })
  })

  describe('UI components', () => {
    it('renders a11y skip links', async () => {
      await expect(page).toMatchElement('a[href="#site-navigation"]', { text: 'Skip to navigation' })
      await expect(page).toMatchElement('a[href="#site-content"]', { text: 'Skip to content' })
      await expect(page).toMatchElement('a[href="#site-footer"]', { text: 'Skip to footer' })
    })

    it('renders the site footer', async () => {
      await expect(page).toMatchElement('#site-footer')
      await expect(page).toMatchElement(
        '.o-footer__matrix',
        { text: 'Support' },
        { text: 'Legal & Privacy' },
        { text: 'Services' }
      )
      await expect(page).toMatchElement('#site-footer .o-footer__copyright')
    })

    it('renders the drawer menu', async () => {
      await expect(page).toMatchElement('#o-header-drawer', { text: 'Switch to International Edition' })
      await expect(page).toMatchElement(
        '#o-header-drawer',
        { text: 'Top sections' },
        { text: 'FT recommends' }
      )
    })
  })
})
