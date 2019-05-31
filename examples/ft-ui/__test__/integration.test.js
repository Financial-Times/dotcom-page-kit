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
      await expect(page).toMatchElement('a[href="#site-navigation"]')
      await expect(page).toMatchElement('a[href="#site-content"]')
      await expect(page).toMatchElement('a[href="#site-footer"]')
    })

    it('renders the site header', async () => {
      await expect(page).toMatchElement('#site-navigation .o-header__top')
      await expect(page).toMatchElement('#site-navigation .o-header__top-logo')
    })

    it('renders the desktop navigation elements', async () => {
      await expect(page).toMatchElement('.o-header__nav--desktop')
      await expect(page).toMatchElement('.o-header__mega-column--articles')
      await expect(page).toMatchElement('.o-header__mega-column--subsections')
    })

    it('renders the desktop search bar', async () => {
      await expect(page).toMatchElement('#o-header-search-primary')
    })

    it('renders the small screen navigation elements', async () => {
      await expect(page).toMatchElement('#site-navigation .o-header__nav--mobile')
    })

    it('renders the sticky header', async () => {
      await expect(page).toMatchElement('.o-header--sticky')
    })

    it('renders the site footer', async () => {
      await expect(page).toMatchElement('#site-footer')
    })

    it('renders the drawer menu', async () => {
      await expect(page).toMatchElement('#o-header-drawer')
    })
  })

  describe('basic UI interactivity', () => {
    it('enables the drawer menu to be toggled', async () => {
      await expect(page).toMatchElement('#o-header-drawer[aria-hidden="true"]')
      await page.click('a[aria-controls="o-header-drawer"]')
      await expect(page).toMatchElement('#o-header-drawer[aria-hidden="false"]')
    })

    it('enables the search bar to be toggled', async () => {
      await expect(page).toMatchElement('#o-header-search-primary[aria-hidden="true"]')
      await page.click('a[aria-controls="o-header-search-primary"]')
      await expect(page).toMatchElement('#o-header-search-primary[aria-hidden="false"]')
    })
  })
})
