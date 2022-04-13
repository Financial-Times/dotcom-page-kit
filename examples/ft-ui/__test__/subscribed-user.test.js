describe('examples/ft-ui', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('http://localhost:3456?userIsLoggedIn=true&userIsSubscribed=true', { waitUntil: 'load' })
  })

  describe('Header link elements', () => {
    it('renders the expected loggin-in user Header link elements', async () => {
      await expect(page).toMatchElement('.o-header__top-column--right a[href="/myft"]', { text: 'myFT' })
      await expect(page).toMatchElement('.o-header__nav-list--right a[href="https://www.ft.com/myaccount"]', {
        text: 'Settings & Account'
      })

      await expect(page).toMatchElement(
        '.o-header__nav-list--right a[href="https://markets.ft.com/data/portfolio/dashboard"]',
        { text: 'Portfolio' }
      )
    })

    it('does not render the anonymous user Header link elements', async () => {
      await expect(page).not.toMatchElement('.o-header__top-column--right a[href="/login?location=/"]', {
        text: 'Sign In'
      })
      await expect(page).not.toMatchElement('.o-header__top-column--right a[href^="/products?"]', {
        text: 'Subscribe'
      })
    })
  })
})
