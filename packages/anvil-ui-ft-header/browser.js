import Header from 'o-header'
import TopicSearch from 'n-topic-search'

/**
 * @typedef HeaderOptions
 * @property { HTMLElement } [rootElement] - the root element passed to o-header
 * @property { string } [hostName]
 */

/**
 * Initialise the header
 * @param { HeaderOptions } headerOptions
 */
export const init = (headerOptions = {}) => {
  const topicSearchElements = document.querySelectorAll(
    '.o-header [data-n-topic-search], .o-header__drawer [data-n-topic-search]'
  )
  topicSearchElements.forEach((element) => {
    // Passing a cors-anywhere hostname to n-topic-search
    // An 'origin' request header will be set on the subsequent fetch request to next-search-api
    // This satisfies the api's cors rules allowing a response to be sent and rendered on localhost
    new TopicSearch(element, headerOptions)
  })

  Header.init(headerOptions.rootElement)
}

export { Header as OrigamiHeader }
