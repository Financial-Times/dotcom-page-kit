import TopicSearch from 'n-topic-search'
import CustomSuggestionList from './customList'

class EnhancedSearch extends TopicSearch {
  constructor(containerEl, options) {
    super(containerEl, {
      ...options,
      listComponent: (...args) => new CustomSuggestionList(...args.concat(options?.enhancedSearchUrl)),
      errorCallback: (error) => {
        this.suggestionsView.setState({
          error,
          searchTerm: this.searchEl.value,
          suggestions: {}
        })
      }
    })

    this.updateEnhancedSearchAttributes(options)
  }

  updateEnhancedSearchAttributes(options) {
    const inputs = [
      document.querySelector('#o-header-search-term-primary'),
      document.querySelector('#o-header-search-term-sticky'),
      document.querySelector('#o-header-drawer-search-term')
    ]

    inputs.forEach((input, index) => {
      input.setAttribute('placeholder', 'Search for stories, topics or securities')
      input.parentElement.setAttribute('action', options?.enhancedSearchUrl ?? '/search')

      if (index === 0) input.parentElement.setAttribute('data-attribute-enhanced-search', 'true')
    })

    this.hide()
  }

  onFocus(ev) {
    super.onFocus(ev)
    this.show()
    this.suggestionTargets = Array.from(
      this.suggestionListContainer.querySelectorAll('.n-topic-search__target')
    )
  }

  onType(ev) {
    // This is to update the suggestion chip on keyup
    this.suggestionsView.setState({
      searchTerm: this.searchEl.value,
      loading: this.searchEl.value && this.searchEl.value.length >= this.minLength,
      suggestions: {}
    })
    super.onType(ev)
    // this is show the flyout for less than minimum length
    this.show()
  }
}

export default EnhancedSearch
