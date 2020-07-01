import { fetchLegislation, buildConsentPageUrl } from '@financial-times/privacy-legislation-client'
import { createCCPALink, changePrivacyLinkText } from './footer-manipulations'

const CONSENT_URL = 'https://www.ft.com/preferences/privacy-ccpa'

export async function addDNSLinkToFooter(): Promise<void> {
  try {
    // Get a list of the applicable legislationIds for the user's region
    const { legislation } = await fetchLegislation()
    const consentPageUrl = buildConsentPageUrl({ url: CONSENT_URL, legislation })

    // If the user is in California update our UI to meet CCPA requirements
    if (legislation.has('ccpa')) {
      createCCPALink(consentPageUrl)
    }
  } catch (err) {
    console.error(err) //eslint-disable-line no-console
  }
}

export async function adaptPrivacyLinkToLegislation(): Promise<void> {
  try {
    // Get a list of the applicable legislationIds for the user's region
    const { legislation } = await fetchLegislation()

    // If the user is in California update our UI to meet CCPA requirements
    if (legislation.has('ccpa')) {
      changePrivacyLinkText('Privacy - CCPA UPDATES')
    }
  } catch (err) {
    console.error(err) //eslint-disable-line no-console
  }
}
