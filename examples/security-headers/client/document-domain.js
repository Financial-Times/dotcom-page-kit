/* eslint-disable no-console */
// Call the document-domain api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const documentDomain = async () => {
  if (document.domain) {
    try {
      document.domain = document.domain;
      console.log('document-domain api permission-granted')
    } catch {
      console.log('document-domain api permission denied')
    }
  } else {
    console.log('document-domain api not found in navigator')
  }
}
