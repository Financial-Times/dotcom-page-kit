import { privacyLinkOnFooter } from './selectors'

export function createCCPALink(consentPageUrl: string): void {
  // Get a reference to the node we want to insert our link before
  const termsLink = document.querySelector(privacyLinkOnFooter) as HTMLAnchorElement

  if (!termsLink || !termsLink.parentNode) {
    throw new Error('A DOM node for Privacy link could not be found')
  }

  // Clone the node to keep consistent with structure and style
  const ccpaLink = termsLink.cloneNode(true) as HTMLAnchorElement
  const ccpaLabel = 'Do Not Sell My Info'

  // Customise the attributes
  ccpaLink.href = consentPageUrl
  ccpaLink.dataset.trackable = ccpaLabel
  ccpaLink.textContent = ccpaLabel

  // Prepend our new link
  const parent = termsLink.parentNode
  parent.insertBefore(ccpaLink, termsLink)
}

export function changePrivacyLinkText(newText: string): void {
  // Get a reference to the node we want to insert our link before
  const termsLink = document.querySelector(privacyLinkOnFooter) as HTMLAnchorElement

  if (!termsLink) {
    throw new Error('A Privacy link could not be found in the footer')
  }

  termsLink.innerText = newText
}
