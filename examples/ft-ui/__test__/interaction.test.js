describe('examples/ft-ui', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('http://localhost:3456', { waitUntil: 'load' })
  })

  describe('basic UI interactivity', () => {
    it('enables the drawer menu to be toggled', async () => {
      await expect(page).toMatchElement('#o-header-drawer[aria-hidden="true"]')
      await page.click('a[aria-controls="o-header-drawer"]')
      await expect(page).toMatchElement('#o-header-drawer[aria-hidden="false"]')
    })

    it('enables the search bar to be toggled', async () => {
      await expect(page).toMatchElement('#o-header-search-primary', { visible: false })
      await page.click('a[aria-controls="o-header-search-primary"]')
      await expect(page).toMatchElement('#o-header-search-primary', { visible: true })
      await page.click('a[aria-controls="o-header-search-primary"]')
      await expect(page).toMatchElement('#o-header-search-primary', { visible: false })
    })
  })
})
