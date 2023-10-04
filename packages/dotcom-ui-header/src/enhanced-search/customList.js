import BaseRenderer from 'n-topic-search/src/renderers/base-renderer'

const DISPLAY_ITEMS = 5

const headingMapping = {
  concepts: 'Related topics',
  equities: 'Securities'
}

class CustomSuggestionList extends BaseRenderer {
  constructor(container, options, enhancedSearchUrl) {
    super(container, options)
    this.renderSuggestionGroup = this.renderSuggestionGroup.bind(this)
    this.enhancedSearchUrl = enhancedSearchUrl
    this.createHtml()
    this.render()
  }

  renderSuggestionChip = (term) => {
    return `<a
        tabindex="0"
        data-trackable="link"
        data-suggestion-id="${term}"
        href="${this.enhancedSearchUrl}${term}"
        class="n-topic-search__target enhanced-search__chip">
          <span class="enhanced-search__chip-text">${term}</span>
        </a>`
  }

  renderDefaultSuggestionsChips() {
    return `
        <div class="enhanced-search__default-results">
            ${['Western support for Ukraine', 'How will AI be regulated?', 'UK inflation versus world']
              .map(this.renderSuggestionChip)
              .join('')}
        </div>`
  }

  renderSuggestionLink(suggestion, group) {
    return `<li class="n-topic-search__item">
			<a class="n-topic-search__target enhanced-search__target ${group.linkClassName}"
				href="${suggestion.url}"
				tabindex="0"
				data-trackable="link"
				data-suggestion-id="${suggestion.id}"
				data-suggestion-type="${suggestion.type}"
			>${suggestion.html}</a>
		</li>`
  }

  renderSuggestionGroup(group) {
    if (group.suggestions?.length || group.emptyHtml) {
      return `
      <div class="enhanced-search__group ${group.linkClassName}" data-trackable="${group.trackable}">
         <h3 class="enhanced-search__title">${group.heading}</h3>
        <ul class="n-topic-search__item-list">
          ${group.suggestions.map((suggestion) => this.renderSuggestionLink(suggestion, group)).join('')}
        </ul>
      </div>`
    }
    return ''
  }

  renderError() {
    return `
    <div
      class="o-message o-message--alert o-message--error enhanced-search__margin-top"
      data-o-component="o-message">
      <div class="o-message__container">
        <div class="o-message__content">
          <p class="o-message__content-main">Failed to load topics and securities results</p>
        </div>
      </div>
    </div>
  `
  }

  createHtml() {
    const term = this.state?.searchTerm
    const loading = this.state?.loading
    const error = this.state?.error !== undefined
    const hasConcepts = this.state?.suggestions?.concepts && this.state.suggestions.concepts.length
    const hasEquities = this.state?.suggestions?.equities && this.state.suggestions.equities.length
    const hasSuggestions = hasConcepts || hasEquities
    const suggestions = []
    this.items = []
    if (this.options.categories.includes('concepts')) {
      suggestions.push({
        heading: headingMapping['concepts'],
        linkClassName: 'enhanced-search__target--news',
        trackable: 'enhanced-search-news',
        suggestions: this.state.suggestions.concepts?.slice(0, DISPLAY_ITEMS).map((suggestion) => ({
          html: this.highlight(suggestion.prefLabel),
          url: suggestion.url,
          id: suggestion.id,
          type: 'enhanced-search-tag'
        }))
      })
    }

    if (this.options.categories.includes('equities')) {
      suggestions.push({
        heading: headingMapping['equities'],
        trackable: 'enhanced-search-equities',
        linkClassName: 'enhanced-search__target--equities',
        emptyHtml: '<div className="enhanced-search__no-results-message">No equities found</div>',
        suggestions: this.state.suggestions.equities?.slice(0, DISPLAY_ITEMS).map((suggestion) => ({
          html: `<span class="enhanced-search__target__equity-name">${this.highlight(
            suggestion.name
          )}</span><abbr>${this.highlight(suggestion.symbol)}</abbr>`,
          url: suggestion.url,
          id: suggestion.symbol,
          type: 'enhanced-search-equity'
        }))
      })
    }

    this.newHtml = `
        <div aria-live="assertive">
        ${
          hasSuggestions
            ? `
        <div
          class="o-normalise-visually-hidden n-topic-search__suggestions_explanation"
        >
          Search results have been displayed. To jump to the list of suggestions press
          the down arrow key.
        </div>
        `
            : ''
        }
        <div
          class="n-topic-search n-topic-search__suggestions enhanced-search enhanced-search__suggestions"
          data-trackable="typeahead"
        >
          <div class="enhanced-search__wrapper">
            <h3 class="enhanced-search__title">${
              term
                ? 'Get top results for...'
                : 'Search tip: <span class="enhanced-search__title-no-bold">Try using questions or phrases like...</span>'
            }</h3>
            ${term ? this.renderSuggestionChip(term) : this.renderDefaultSuggestionsChips()}
            <div class="o-normalise-visually-hidden">Suggestions include</div>
            ${error ? this.renderError() : ''}
            ${
              loading && !error
                ? `<div class="o-loading o-loading--dark o-loading--small enhanced-search__margin-top"></div>`
                : ''
            }
            ${
              hasSuggestions && term && !loading && !error
                ? `<div class="enhanced-search__suggestions-items">${suggestions
                    .map(this.renderSuggestionGroup)
                    .join('')}</div>
            `
                : ''
            }
          </div>
        </div>
      </div>`
  }

  handleSelection(el, ev) {
    ev.stopPropagation()
    // we don't prevent default as the link's url is a link to the relevant stream page
    return
  }
}

export default CustomSuggestionList