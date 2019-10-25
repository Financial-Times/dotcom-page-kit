describe('examples/ft-ui', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('http://localhost:3456?', { waitUntil: 'load' })
  })

  describe('Header link elements', () => {
    it('renders the expected anonymous user Header link elements', async () => {
      await expect(page).toMatchElement('.o-header__top-column--right a[href="/myft"]', { text: 'myFT' })
      await expect(page).toMatchElement('.o-header__nav-list--right a[href="/login?location=/"]', {
        text: 'Sign In'
      })
      await expect(page).toMatchElement('.o-header__nav-list--right a[href^="/products?"]', {
        text: 'Subscribe'
      })
    })

    it('does not render the logged-in user Header link elements', async () => {
      await expect(page).not.toMatchElement(
        '.o-header__nav-list--right a[href="https://myaccount.ft.com/details/core/view"]',
        { text: 'Account Settings' }
      )
      await expect(page).not.toMatchElement(
        `.o-header__nav-list--right a[href="https://markets.ft.com/data/portfolio/dashboard"]`,
        { text: 'Portfolio' }
      )
    })
  })

  describe('Header UI components', () => {
    it('renders the FT logo component', async () => {
      await expect(page).toMatchElement('#site-navigation .o-header__top a[href="/"]')
      await expect(page).toMatchElement('#site-navigation .o-header__top-logo', { text: 'Financial Times' })
    })

    it('renders the desktop navigation elements', async () => {
      await expect(page).toMatchElement('.o-header__nav--desktop')
      await expect(page).toMatchElement('.o-header__mega-column--articles')
      await expect(page).toMatchElement('.o-header__mega-column--subsections')
    })

    it('renders the desktop search bar', async () => {
      await expect(page).toMatchElement('#o-header-search-primary')
      await expect(page).toMatchElement('.o-header__search-submit', { text: 'Search' })
    })

    it('renders the small screen navigation elements', async () => {
      await expect(page).toMatchElement('#site-navigation .o-header__nav--mobile')
    })

    it('renders the sticky header', async () => {
      await expect(page).toMatchElement('.o-header--sticky')
    })
  })
})
