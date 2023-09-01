import TopicSearch from 'n-topic-search'
import CustomSuggestionList from './customList'

class EnhancedSearch extends TopicSearch {
  constructor(containerEl, options) {
    super(containerEl, {
      ...options,
      listComponent: (...args) => new CustomSuggestionList(...args.concat(options?.enhancedSearchUrl))
    })

    const inputs = [
      document.querySelector('#o-header-search-term-primary'),
      document.querySelector('#o-header-search-term-sticky'),
      document.querySelector('#o-header-drawer-search-term')
    ]
    inputs[0].parentElement.setAttribute('data-attribute-enhanced-search', 'true')
    inputs.forEach((input) =>
      input.setAttribute('placeholder', 'Search the FT using questions, topics or article titles')
    )
  }

  onFocus(ev) {
    super.onFocus(ev)
    this.show()
    this.suggestionTargets = Array.from(
      this.suggestionListContainer.querySelectorAll('.n-topic-search__target')
    )
  }
}

export default EnhancedSearch
