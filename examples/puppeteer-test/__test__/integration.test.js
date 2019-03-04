describe('examples/puppeteer-test', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3456', { waitUntil: 'load' })
  })

  it('inserts a title element', async () => {
    await expect(page).toMatch('Hello World!')
  })
})
