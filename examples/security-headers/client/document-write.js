/* eslint-disable no-console */
// Call the document-write api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const documentWrite = async () => {
  if (document.write) {
    try {
      document.write('<p>New content</p>');
      console.log('document-write api permission-granted')
    } catch {
      console.log('document-write api permission denied')
    }
  } else {
    console.log('document-write api not found in navigator')
  }
}
