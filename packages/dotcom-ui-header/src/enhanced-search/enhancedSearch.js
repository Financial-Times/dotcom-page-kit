import TopicSearch from 'n-topic-search'
import CustomSuggestionList from './customList'

class EnhancedSearch extends TopicSearch {
  constructor(containerEl, options) {
    super(containerEl, {
      ...options,
      listComponent: (...args) => new CustomSuggestionList(...args.concat(options?.enhancedSearchUrl))
    })

    this.updateEnhancedSearchAttributes(options)
  }

  updateEnhancedSearchAttributes(options) {
    const inputs = [
      document.querySelector('#o-header-search-term-primary'),
      document.querySelector('#o-header-search-term-sticky'),
      document.querySelector('#o-header-drawer-search-term')
    ]

    const form = inputs[0].parentElement

    form.setAttribute('data-attribute-enhanced-search', 'true')
    form.setAttribute('action', options?.enhancedSearchUrl ?? '/search')
    inputs.forEach((input) => input.setAttribute('placeholder', 'Search for stories, topics or securities'))
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
