const element = {
  nav: {
    homepageLink: '#homepageNavLink',
    dogsPageLink: '#dogsPageNavLink',
    termsPageLink: '#termsPageNavLink'
  },
  homepage: {
    button: '#btn'
  },
  dogsPage: {
    bulldogLink: '#bulldogLink'
  },
  dogImagesPage: {
    dogImage: '#dogImage'
  }
}

async function assertButtonOpensAlertBox() {
  return new Promise((resolve) => {
    page.on('dialog', async (dialog) => {
      await dialog.dismiss()
      resolve()
    })
    page.click(element.homepage.button)
  })
}

async function getTotalDogImages() {
  return page.evaluate(async (element) => {
    return document.querySelectorAll(element.dogImagesPage.dogImage).length
  }, element)
}

function pageDescription() {
  return page.$eval("head > meta[name='description']", (element) => element.content)
}

describe('examples/ssr-with-hydration', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000', { waitUntil: 'load' })
  })

  it('should work as expected', async () => {
    expect(await page.title()).toBe('Home | Anvil')
    expect(await pageDescription()).toBe('The homepage')

    await assertButtonOpensAlertBox()

    await page.click(element.nav.dogsPageLink)

    expect(await page.title()).toBe('Dogs | Anvil')
    expect(await pageDescription()).toBe('The dogs list page')

    await page.click(element.dogsPage.bulldogLink)

    expect(await page.title()).toBe('Dog | Anvil')
    expect(await pageDescription()).toBe('The dog page')

    const totalImages = await getTotalDogImages()

    expect(totalImages).toBeGreaterThan(0)
  })
})
