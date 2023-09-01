import Header from '@financial-times/o-header'
import TopicSearch from 'n-topic-search'
import EnhancedSearch from './src/enhanced-search/enhancedSearch'
/**
 * @typedef HeaderOptions
 * @property { HTMLElement } [rootElement] - the root element passed to o-header
 * @property { string } [hostName]
 * @property { string } [enhancedSearchUrl]
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
    headerOptions.enhancedSearchUrl
      ? new EnhancedSearch(element, headerOptions)
      : new TopicSearch(element, headerOptions)
  })

  Header.init(headerOptions.rootElement)
}

export { Header as OrigamiHeader }
