/* eslint-disable no-console */
// Call the sync-xhr api
// If the feature policy works the call will be blocked
// Logs will be visible in the browser console
export const syncXhr = async () => {
  if (XMLHttpRequest) {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', './simple-text.txt', false); // sync
      xhr.send();
      console.log('sync-xhr api permission-granted')
    } catch {
      console.log('sync-xhr api permission denied')
    }
  } else {
    console.log('sync-xhr api not found in navigator')
  }
}
