const baseUrl = 'http://localhost:3456'

describe('examples/ft-ui/gtm', () => {
  let response

  it('By default it loads GTM from googletagmanager.com', async () => {
    await page.goto(baseUrl, { waitUntil: 'load' })
    await expect(page).toMatchElement('script[src="https://www.googletagmanager.com/gtm.js?id=GTM-NWQJW68"]')
  })

  // Remove this once "ads-first-party-gtm" Toggler flag is removed
  if (!process.env.CI) {
    it('Behind a flag it loads GTM from first-party proxy', async () => {
      await page.goto(`${baseUrl}?ads-first-party-gtm=true`, { waitUntil: 'load' })

      // Since the query sets the appName to "home-page", the PG load is triggered
      // This acts as a proxy for verifying GTM's behaviour
      await page.waitForSelector('script[src^="https://www.ft.com/__assets/hashed/pg-ads/adapters"]')

      await expect(page).toMatchElement('script[src="https://www.ft.com/page-resources/"]')
    })
  }
})
