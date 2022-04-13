describe('examples/ft-ui', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('http://localhost:3456?', { waitUntil: 'load' })
  })

  describe('Header link elements', () => {
    it('renders the expected anonymous user Header link elements', async () => {
      await expect(page).toMatchElement('a[href="/myft"]', { text: 'myFT' })
      await expect(page).toMatchElement('.o-header__top-column--right a[href="/login?location=/"]', {
        text: 'Sign In'
      })
      await expect(page).toMatchElement('.o-header__top-column--right a[href^="/products?"]', {
        text: 'Subscribe'
      })
    })

    it('does not render the logged-in user Header link elements', async () => {
      await expect(page).not.toMatchElement(
        '.o-header__top-column--right a[href="https://www.ft.com/myaccount"]',
        {
          text: 'Settings & Account'
        }
      )
      await expect(page).not.toMatchElement(
        `.o-header__top-column--right a[href="https://markets.ft.com/data/portfolio/dashboard"]`,
        { text: 'Portfolio' }
      )
    })
  })
})
